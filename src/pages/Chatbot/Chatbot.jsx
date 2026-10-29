import React, { useState } from "react";
import {
  Activity,
  ArrowUp,
  Bot,
  CheckCircle2,
  FileText,
  HeartPulse,
  Hospital,
  Languages,
  MapPin,
  Mic,
  MoreHorizontal,
  Paperclip,
  Plus,
  ShieldCheck,
  Siren,
  Sparkles,
  Stethoscope,
  UserRound,
  X,
} from "lucide-react";

import styles from "./Chatbot.module.css";

const QUICK_ACTIONS = [
  {
    id: "hospital",
    icon: Hospital,
    title: "Find a hospital",
    description: "Based on my health requirement",
  },
  {
    id: "compare",
    icon: Activity,
    title: "Compare hospitals",
    description: "Compare cost, distance & facilities",
  },
  {
    id: "report",
    icon: FileText,
    title: "Understand my report",
    description: "Get a simple explanation",
  },
  {
    id: "emergency",
    icon: Siren,
    title: "Emergency help",
    description: "Find nearby emergency care",
    emergency: true,
  },
];

const INITIAL_MESSAGES = [
  {
    id: 1,
    type: "assistant",
    time: "Now",
    content:
      "Hello! I'm your healthcare navigation assistant. I can help you find hospitals based on your health requirement, location, budget, insurance and other preferences.",
  },
];

const SAMPLE_MATCHES = [
  {
    id: 1,
    name: "CityCare Multispeciality Hospital",
    specialty: "Multispeciality • Nephrology",
    distance: "4.2 km",
    time: "14 min",
    match: 94,
    cost: "₹1.8L – ₹2.7L",
    insurance: "Insurance accepted",
  },
  {
    id: 2,
    name: "LifePoint Medical Centre",
    specialty: "Nephrology • Kidney Care",
    distance: "7.8 km",
    time: "22 min",
    match: 89,
    cost: "₹1.5L – ₹2.9L",
    insurance: "Scheme verified",
  },
];

function Chatbot() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showMatches, setShowMatches] = useState(false);

  const handleSend = () => {
    const trimmedInput = input.trim();

    if (!trimmedInput) return;

    const userMessage = {
      id: Date.now(),
      type: "user",
      time: "Now",
      content: trimmedInput,
    };

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setIsTyping(true);

    /*
      Temporary demo response.

      Later this will be replaced with:
      AI API → requirement extraction → hospital search
    */

    setTimeout(() => {
      const assistantMessage = {
        id: Date.now() + 1,
        type: "assistant",
        time: "Now",
        content:
          "I can help you narrow this down. To find suitable hospitals, I'll need a few details such as your health requirement, location, approximate budget and insurance or government scheme.",
      };

      setMessages((current) => [...current, assistantMessage]);
      setIsTyping(false);
    }, 900);
  };

  const handleQuickAction = (action) => {
    if (action.id === "emergency") {
      setMessages((current) => [
        ...current,
        {
          id: Date.now(),
          type: "user",
          time: "Now",
          content: "I need emergency medical help.",
        },
        {
          id: Date.now() + 1,
          type: "assistant",
          time: "Now",
          content:
            "If this may be a medical emergency, please contact local emergency services or go to the nearest emergency department. I can also help you locate nearby emergency hospitals.",
        },
      ]);

      return;
    }

    if (action.id === "hospital") {
      setMessages((current) => [
        ...current,
        {
          id: Date.now(),
          type: "user",
          time: "Now",
          content: "Help me find a suitable hospital.",
        },
        {
          id: Date.now() + 1,
          type: "assistant",
          time: "Now",
          content:
            "Absolutely. Tell me what health problem or treatment you need help with and your current location. I'll use those requirements to narrow down suitable hospitals.",
        },
      ]);

      return;
    }

    if (action.id === "compare") {
      setShowMatches(true);

      setMessages((current) => [
        ...current,
        {
          id: Date.now(),
          type: "user",
          time: "Now",
          content: "I want to compare hospitals.",
        },
        {
          id: Date.now() + 1,
          type: "assistant",
          time: "Now",
          content:
            "Sure. Once we identify suitable hospitals, I can compare their match score, cost, distance, facilities, insurance compatibility and other available information.",
        },
      ]);

      return;
    }

    if (action.id === "report") {
      setMessages((current) => [
        ...current,
        {
          id: Date.now(),
          type: "user",
          time: "Now",
          content: "I want help understanding a medical report.",
        },
        {
          id: Date.now() + 1,
          type: "assistant",
          time: "Now",
          content:
            "You can upload your report and I can help explain its contents in simpler language. The explanation is for healthcare navigation and does not replace a doctor's assessment.",
        },
      ]);
    }
  };

  const handleNewChat = () => {
    setMessages(INITIAL_MESSAGES);
    setInput("");
    setShowMatches(false);
  };

  return (
    <main className={styles.page}>
      {/* =========================================
          BACKGROUND ATMOSPHERE
      ========================================== */}

      <div className={styles.ambient} />

      {/* =========================================
          MOBILE SIDEBAR OVERLAY
      ========================================== */}

      {showSidebar && (
        <button
          className={styles.overlay}
          onClick={() => setShowSidebar(false)}
          aria-label="Close sidebar"
        />
      )}

      {/* =========================================
          APP SHELL
      ========================================== */}

      <section className={styles.appShell}>
        {/* =========================================
            SIDEBAR
        ========================================== */}

        <aside
          className={`${styles.sidebar} ${
            showSidebar ? styles.sidebarOpen : ""
          }`}
        >
          <div className={styles.sidebarTop}>
            <div className={styles.brand}>
              <div className={styles.brandMark}>
                <HeartPulse size={20} strokeWidth={2.4} />
              </div>

              <div>
                <span className={styles.brandName}>Vital</span>
                <span className={styles.brandLabel}>Healthcare AI</span>
              </div>
            </div>

            <button
              className={styles.closeSidebar}
              onClick={() => setShowSidebar(false)}
              aria-label="Close menu"
            >
              <X size={19} />
            </button>
          </div>

          <button
            className={styles.newChatButton}
            onClick={handleNewChat}
          >
            <Plus size={18} />
            <span>New conversation</span>
          </button>

          <div className={styles.sidebarSection}>
            <span className={styles.sidebarHeading}>Healthcare tools</span>

            <button className={styles.sidebarItem}>
              <Hospital size={17} />
              <span>Find hospitals</span>
            </button>

            <button className={styles.sidebarItem}>
              <Activity size={17} />
              <span>Compare hospitals</span>
            </button>

            <button className={styles.sidebarItem}>
              <FileText size={17} />
              <span>Medical reports</span>
            </button>

            <button className={styles.sidebarItem}>
              <MapPin size={17} />
              <span>Nearby care</span>
            </button>
          </div>

          <div className={styles.sidebarSection}>
            <span className={styles.sidebarHeading}>Recent</span>

            <button className={styles.historyItem}>
              <span>Finding kidney care</span>
              <span>Today</span>
            </button>

            <button className={styles.historyItem}>
              <span>Hospital comparison</span>
              <span>Yesterday</span>
            </button>
          </div>

          <div className={styles.sidebarBottom}>
            <div className={styles.trustCard}>
              <div className={styles.trustIcon}>
                <ShieldCheck size={17} />
              </div>

              <div>
                <strong>Healthcare guidance</strong>
                <span>
                  Information is designed to help you navigate care.
                </span>
              </div>
            </div>
          </div>
        </aside>

        {/* =========================================
            MAIN CHAT
        ========================================== */}

        <div className={styles.chatArea}>
          {/* =========================================
              HEADER
          ========================================== */}

          <header className={styles.header}>
            <div className={styles.headerLeft}>
              <button
                className={styles.menuButton}
                onClick={() => setShowSidebar(true)}
                aria-label="Open menu"
              >
                <MoreHorizontal size={20} />
              </button>

              <div className={styles.assistantAvatar}>
                <Bot size={21} />
                <span className={styles.onlineDot} />
              </div>

              <div className={styles.assistantInfo}>
                <div className={styles.assistantNameRow}>
                  <h1>Vital Assistant</h1>
                  <span className={styles.verified}>
                    <CheckCircle2 size={13} />
                    Healthcare AI
                  </span>
                </div>

                <span className={styles.status}>
                  <span />
                  Ready to help
                </span>
              </div>
            </div>

            <div className={styles.headerActions}>
              <button className={styles.languageButton}>
                <Languages size={17} />
                <span>English</span>
              </button>

              <button className={styles.headerIconButton}>
                <MoreHorizontal size={19} />
              </button>
            </div>
          </header>

          {/* =========================================
              CONVERSATION
          ========================================== */}

          <div className={styles.conversation}>
            <div className={styles.conversationInner}>
              {/* Welcome */}
              <div className={styles.welcome}>
                <div className={styles.welcomeOrb}>
                  <div className={styles.orbGlow} />
                  <HeartPulse
                    size={30}
                    strokeWidth={2}
                  />
                </div>

                <div className={styles.welcomeContent}>
                  <span className={styles.eyebrow}>
                    YOUR HEALTHCARE NAVIGATOR
                  </span>

                  <h2>
                    How can I help you
                    <span> today?</span>
                  </h2>

                  <p>
                    Tell me about your healthcare requirement. I can
                    help you find suitable hospitals based on your
                    needs, location, budget and preferences.
                  </p>
                </div>
              </div>

              {/* Quick actions */}
              <div className={styles.quickActions}>
                {QUICK_ACTIONS.map((action) => {
                  const Icon = action.icon;

                  return (
                    <button
                      key={action.id}
                      className={`${styles.quickAction} ${
                        action.emergency
                          ? styles.emergencyAction
                          : ""
                      }`}
                      onClick={() =>
                        handleQuickAction(action)
                      }
                    >
                      <div className={styles.quickIcon}>
                        <Icon size={18} />
                      </div>

                      <div className={styles.quickText}>
                        <strong>{action.title}</strong>
                        <span>{action.description}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Conversation messages */}
              <div className={styles.messages}>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={
                      message.type === "user"
                        ? styles.userMessageRow
                        : styles.assistantMessageRow
                    }
                  >
                    {message.type === "assistant" && (
                      <div className={styles.messageAvatar}>
                        <Bot size={17} />
                      </div>
                    )}

                    <div
                      className={
                        message.type === "user"
                          ? styles.userBubble
                          : styles.assistantBubble
                      }
                    >
                      <p>{message.content}</p>

                      <span>{message.time}</span>
                    </div>

                    {message.type === "user" && (
                      <div className={styles.userAvatar}>
                        <UserRound size={16} />
                      </div>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className={styles.assistantMessageRow}>
                    <div className={styles.messageAvatar}>
                      <Bot size={17} />
                    </div>

                    <div className={styles.typingBubble}>
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                )}
              </div>

              {/* =========================================
                  SAMPLE MATCH RESULTS
              ========================================== */}

              {showMatches && (
                <div className={styles.matchesSection}>
                  <div className={styles.matchesHeader}>
                    <div>
                      <span className={styles.sectionEyebrow}>
                        MATCHED FOR YOU
                      </span>

                      <h3>Suitable hospitals</h3>
                    </div>

                    <button>
                      View all
                      <ArrowUp
                        size={14}
                        className={styles.viewArrow}
                      />
                    </button>
                  </div>

                  <div className={styles.matchCards}>
                    {SAMPLE_MATCHES.map((hospital) => (
                      <article
                        key={hospital.id}
                        className={styles.matchCard}
                      >
                        <div className={styles.matchTop}>
                          <div className={styles.hospitalIcon}>
                            <Hospital size={19} />
                          </div>

                          <div className={styles.matchScore}>
                            <strong>
                              {hospital.match}%
                            </strong>
                            <span>match</span>
                          </div>
                        </div>

                        <div className={styles.hospitalInfo}>
                          <h4>{hospital.name}</h4>

                          <p>{hospital.specialty}</p>
                        </div>

                        <div className={styles.hospitalMeta}>
                          <span>
                            <MapPin size={14} />
                            {hospital.distance}
                          </span>

                          <span>
                            <Activity size={14} />
                            {hospital.time}
                          </span>
                        </div>

                        <div className={styles.matchFooter}>
                          <span>{hospital.cost}</span>

                          <span className={styles.insurance}>
                            <CheckCircle2 size={13} />
                            {hospital.insurance}
                          </span>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* =========================================
              COMPOSER
          ========================================== */}

          <div className={styles.composerArea}>
            <div className={styles.composerInner}>
              <div className={styles.composer}>
                <button
                  className={styles.composerIcon}
                  aria-label="Attach file"
                >
                  <Paperclip size={19} />
                </button>

                <input
                  type="text"
                  value={input}
                  onChange={(event) =>
                    setInput(event.target.value)
                  }
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleSend();
                    }
                  }}
                  placeholder="Describe your healthcare requirement..."
                  aria-label="Message Vital Assistant"
                />

                <button
                  className={styles.composerIcon}
                  aria-label="Voice input"
                >
                  <Mic size={19} />
                </button>

                <button
                  className={`${styles.sendButton} ${
                    input.trim()
                      ? styles.sendButtonActive
                      : ""
                  }`}
                  onClick={handleSend}
                  disabled={!input.trim()}
                  aria-label="Send message"
                >
                  <ArrowUp size={19} />
                </button>
              </div>

              <div className={styles.composerFooter}>
                <span>
                  <Sparkles size={12} />
                  Vital can make mistakes. Verify important
                  healthcare information with a qualified
                  professional.
                </span>

                <button>
                  <Stethoscope size={13} />
                  Healthcare guidance
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Chatbot;