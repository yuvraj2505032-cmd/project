import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Mic,
  MicOff,
  ShieldCheck,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";

import PageHeading from "../common/PageHeading";
import { API_BASE_URL } from "../../lib/api";

function Assistant({
  messages,
  onAsk,
  language,
  languages,
  onLanguage,
  onReset,
  onNavigate,
}) {
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [listening, setListening] = useState(false);
  const [transcribing, setTranscribing] = useState(false);
  const [voiceError, setVoiceError] = useState("");
  const mediaRecorderRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const recordingChunksRef = useRef([]);
  const recordingTimerRef = useRef(null);
  const transcriptionControllerRef = useRef(null);
  const cancelRecordingRef = useRef(false);
  const maxRecordingDurationMs = 60_000;

  useEffect(() => {
    return () => {
      cancelRecordingRef.current = true;
      window.clearTimeout(recordingTimerRef.current);
      transcriptionControllerRef.current?.abort();
      if (mediaRecorderRef.current?.state === "recording") {
        mediaRecorderRef.current.stop();
      }
      mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const stopVoiceInput = () => {
    window.clearTimeout(recordingTimerRef.current);
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop();
    }
  };

  const startVoiceInput = async () => {
    if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
      setVoiceError(
        "Voice recording isn't supported in this browser. Try a recent Chrome, Edge, or Safari, or type your message.",
      );
      return;
    }

    setVoiceError("");
    setTranscribing(true);
    cancelRecordingRef.current = false;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (cancelRecordingRef.current) {
        stream.getTracks().forEach((track) => track.stop());
        return;
      }
      mediaStreamRef.current = stream;
      const supportedTypes = [
        "audio/webm;codecs=opus",
        "audio/webm",
        "audio/mp4",
        "audio/ogg;codecs=opus",
      ];
      const mimeType = supportedTypes.find((type) =>
        MediaRecorder.isTypeSupported(type),
      );
      const recorder = mimeType
        ? new MediaRecorder(stream, { mimeType })
        : new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      recordingChunksRef.current = [];
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) recordingChunksRef.current.push(event.data);
      };
      recorder.onerror = () => {
        cancelRecordingRef.current = true;
        window.clearTimeout(recordingTimerRef.current);
        setVoiceError("Voice recording failed. Please try again.");
        setListening(false);
        setTranscribing(false);
        stream.getTracks().forEach((track) => track.stop());
        mediaStreamRef.current = null;
        mediaRecorderRef.current = null;
      };
      recorder.onstop = async () => {
        stream.getTracks().forEach((track) => track.stop());
        mediaStreamRef.current = null;
        mediaRecorderRef.current = null;
        setListening(false);
        if (cancelRecordingRef.current) {
          setTranscribing(false);
          return;
        }

        const audioType = recorder.mimeType || mimeType || "audio/webm";
        const audioBlob = new Blob(recordingChunksRef.current, {
          type: audioType,
        });
        recordingChunksRef.current = [];
        if (!audioBlob.size) {
          setVoiceError("No speech was recorded. Try again.");
          setTranscribing(false);
          return;
        }
        if (audioBlob.size > 25 * 1024 * 1024) {
          setVoiceError("Audio recording exceeds the 25 MB limit.");
          setTranscribing(false);
          return;
        }

        const baseAudioType = audioBlob.type.split(";", 1)[0].toLowerCase();
        const extensionByType = {
          "audio/mp4": "mp4",
          "audio/ogg": "ogg",
          "audio/webm": "webm",
        };
        const extension = extensionByType[baseAudioType];
        if (!extension) {
          setVoiceError(
            "This browser recorded an unsupported audio format. Try another browser.",
          );
          setTranscribing(false);
          return;
        }
        const formData = new FormData();
        formData.append("audio", audioBlob, `recording.${extension}`);
        formData.append("language", language);
        const controller = new AbortController();
        transcriptionControllerRef.current = controller;
        setTranscribing(true);
        try {
          const response = await fetch(
            `${API_BASE_URL}/api/v1/speech/transcribe`,
            { method: "POST", body: formData, signal: controller.signal },
          );
          const data = await response.json().catch(() => ({}));
          if (!response.ok) {
            throw new Error(data.detail || "Speech transcription failed.");
          }
          const transcript =
            typeof data.text === "string" ? data.text.trim() : "";
          if (!transcript) throw new Error("No speech was detected. Try again.");
          setText((current) =>
            [current.trim(), transcript].filter(Boolean).join(" "),
          );
          setVoiceError("");
        } catch (error) {
          if (!cancelRecordingRef.current) {
            setVoiceError(
              error.message || "Speech transcription failed. Try again.",
            );
          }
        } finally {
          transcriptionControllerRef.current = null;
          if (!cancelRecordingRef.current) setTranscribing(false);
        }
      };
      recorder.start();
      setListening(true);
      setTranscribing(false);
      recordingTimerRef.current = window.setTimeout(
        stopVoiceInput,
        maxRecordingDurationMs,
      );
    } catch (error) {
      if (cancelRecordingRef.current) return;
      mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
      setListening(false);
      setTranscribing(false);
      setVoiceError(
        error.name === "NotAllowedError" ||
          error.name === "PermissionDeniedError"
          ? "Microphone access was denied. Allow microphone access in your browser settings and try again."
          : "Could not start voice recording. Check microphone access and try again.",
      );
    }
  };

  const toggleVoiceInput = () => {
    if (listening) {
      stopVoiceInput();
      return;
    }
    if (transcribing) return;
    startVoiceInput();
  };

  const formSubmit = async (event) => {
    event.preventDefault();
    if (!text.trim() || busy || listening || transcribing) return;
    const message = text;
    setText("");
    setVoiceError("");
    setBusy(true);
    await onAsk(message);
    setBusy(false);
  };

  return (
    <>
      <PageHeading
        eyebrow="JANSAHAYAK ASSISTANT"
        title="A little clarity goes a long way."
        description="Get help using JanSahayak to find schemes, understand available records, and verify official sources."
        action={
          <div className="ai-status">
            <span /> Evidence-first assistant
          </div>
        }
      />
      <div className="chat-layout">
        <aside className="chat-aside">
          <div className="assistant-avatar">
            <Sparkles size={24} />
          </div>
          <h3>Your scheme guide</h3>
          <p>
            I can help with this website and its scheme-finding features. I
            can't guarantee eligibility or government approval.
          </p>
          <label>Reply language</label>
          <select
            value={language}
            onChange={(event) => {
              if (listening) stopVoiceInput();
              onLanguage(event.target.value);
            }}
            disabled={listening || transcribing}
          >
            {languages.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <div className="chat-aside-note">
            <ShieldCheck size={16} />
            <span>
              Don't share Aadhaar numbers, OTPs, bank details or other secrets
              in chat.
            </span>
          </div>
          <div className="assistant-steps">
            <h4>Find a scheme in a few steps</h4>
            <ol>
              <li>Open Find schemes.</li>
              <li>Search or filter by type and location.</li>
              <li>Check eligibility and the official source.</li>
              <li>Save schemes you want to revisit.</li>
            </ol>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => onNavigate("/discover")}
            >
              Find schemes <ArrowRight size={14} />
            </button>
          </div>
        </aside>
        <section className="chat-panel">
          <div className="chat-topline">
            <div className="online-indicator" />
            <strong>JanSahayak AI</strong>
            <span>· Scheme information assistant</span>
            <button
              className="icon-btn"
              onClick={onReset}
              aria-label="Reset chat"
              title="Reset chat"
            >
              <X size={16} />
            </button>
          </div>
          <div className="chat-messages" role="log" aria-live="polite">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`chat-message ${message.role === "user" ? "message-user" : "message-assistant"}`}
              >
                <div className="message-avatar">
                  {message.role === "user" ? (
                    <UserRound size={15} />
                  ) : (
                    <Sparkles size={15} />
                  )}
                </div>
                <div className="message-content">
                  <div>{message.content}</div>
                  {message.sources?.length > 0 && (
                    <div className="source-list">
                      <strong>Sources</strong>
                      {message.sources.map((source, sourceIndex) => (
                        <a
                          key={sourceIndex}
                          href={source.url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {source.title || source.url}
                          <ArrowRight size={12} />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {busy && (
              <div className="typing-indicator">
                <span />
                <span />
                <span /> Checking scheme sources…
              </div>
            )}
          </div>
          <div className="prompt-suggestions">
            <span>Try asking</span>
            {[
              "Guide me one step at a time to find schemes.",
              "How do I filter schemes by location?",
              "How do I save a scheme?",
            ].map((suggestion) => (
              <button key={suggestion} onClick={() => setText(suggestion)}>
                {suggestion}
              </button>
            ))}
          </div>
          <form className="chat-composer" onSubmit={formSubmit}>
            <textarea
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder="Ask how to use JanSahayak or find a scheme…"
              rows={2}
              maxLength={1200}
            />
            {voiceError && (
              <span className="voice-input-error" role="status">
                {voiceError}
              </span>
            )}
            <span className="voice-input-note">
              Voice recordings are sent to Groq for transcription.
            </span>
            <div className="composer-bottom">
              <span>
                AI can make mistakes. Confirm details on the official site.
              </span>
              <button
                className={`voice-input-button ${listening ? "is-listening" : ""}`}
                type="button"
                aria-label={
                  listening
                    ? "Stop voice input"
                    : transcribing
                      ? "Transcribing voice input"
                      : "Start voice input"
                }
                aria-pressed={listening}
                title={`Voice input in ${languages.find((item) => item.value === language)?.label || "English"}`}
                onClick={toggleVoiceInput}
                disabled={busy || transcribing}
              >
                {listening ? (
                  <MicOff size={17} />
                ) : transcribing ? (
                  <span className="voice-transcribing-indicator" />
                ) : (
                  <Mic size={17} />
                )}
              </button>
              <button
                className="btn-primary"
                disabled={!text.trim() || busy || listening || transcribing}
              >
                <span>Send</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}

export default Assistant;
