import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { LockKeyhole, Mail, X } from "lucide-react";

import Button from "../../common/Button/Button";
import Input from "../../common/Input/Input";
import IconButton from "../../common/IconButton/IconButton";
import { useAuth } from "../../../context/AuthContext";

import styles from "./AuthModal.module.css";

function AuthModal({
  open,
  onClose,
}) {
  const {
    signIn,
    signUp,
  } = useAuth();

  const [mode, setMode] =
    useState("signin");

  const [form, setForm] = useState({
    displayName: "",
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    if (!open) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener(
      "keydown",
      handleEscape
    );

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );

      document.body.style.overflow =
        previousOverflow;
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;

    setError("");
    setMessage("");
  }, [mode, open]);

  if (!open) {
    return null;
  }

  const handleChange = (event) => {
    const { name, value } =
      event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    setError("");
    setMessage("");
    setLoading(true);

    try {
      if (mode === "signin") {
        const {
          error: signInError,
        } = await signIn({
          email: form.email,
          password: form.password,
        });

        if (signInError) {
          throw signInError;
        }

        onClose();
      } else {
        const {
          data,
          error: signUpError,
        } = await signUp({
          email: form.email,
          password: form.password,
          displayName:
            form.displayName,
          username:
            form.username,
        });

        if (signUpError) {
          throw signUpError;
        }

        if (data.session) {
          onClose();
        } else {
          setMessage(
            "Account created. Check your email to confirm your account."
          );
        }
      }
    } catch (submitError) {
      setError(
        submitError?.message ||
          "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  const modal = (
    <div
      className={styles.overlay}
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          onClose();
        }
      }}
    >
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-title"
      >
        <div className={styles.header}>
          <div>
            <span
              className={styles.eyebrow}
            >
              ACCOUNT
            </span>

            <h2 id="auth-title">
              {mode === "signin"
                ? "Welcome back."
                : "Create your account."}
            </h2>

            <p>
              {mode === "signin"
                ? "Sign in to continue."
                : "Create a profile for your project."}
            </p>
          </div>

          <IconButton
            icon={<X />}
            label="Close authentication"
            variant="ghost"
            onClick={onClose}
          />
        </div>

        <form
          className={styles.form}
          onSubmit={handleSubmit}
        >
          {mode === "signup" && (
            <>
              <Input
                label="Display name"
                name="displayName"
                value={
                  form.displayName
                }
                onChange={handleChange}
                placeholder="Your name"
                required
                autoComplete="name"
              />

              <Input
                label="Username"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="your_username"
                autoComplete="username"
              />
            </>
          )}

          <Input
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            leftIcon={<Mail />}
            required
            autoComplete="email"
          />

          <Input
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
            leftIcon={
              <LockKeyhole />
            }
            required
            minLength={6}
            autoComplete={
              mode === "signin"
                ? "current-password"
                : "new-password"
            }
          />

          {error && (
            <p className={styles.error}>
              {error}
            </p>
          )}

          {message && (
            <p
              className={
                styles.message
              }
            >
              {message}
            </p>
          )}

          <Button
            type="submit"
            size="large"
            fullWidth
            loading={loading}
          >
            {mode === "signin"
              ? "Sign In"
              : "Create Account"}
          </Button>
        </form>

        <div className={styles.switcher}>
          <span>
            {mode === "signin"
              ? "Don't have an account?"
              : "Already have an account?"}
          </span>

          <button
            type="button"
            onClick={() =>
              setMode(
                mode === "signin"
                  ? "signup"
                  : "signin"
              )
            }
          >
            {mode === "signin"
              ? "Create one"
              : "Sign in"}
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(
    modal,
    document.body
  );
}

export default AuthModal;