import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { UserRound, X } from "lucide-react";

import Button from "../../common/Button/Button";
import Input from "../../common/Input/Input";
import IconButton from "../../common/IconButton/IconButton";
import { useAuth } from "../../../context/AuthContext";

import styles from "./ProfileModal.module.css";

function ProfileModal({
  open,
  onClose,
}) {
  const {
    profile,
    user,
    updateProfile,
  } = useAuth();

  const [form, setForm] = useState({
    display_name: "",
    username: "",
    avatar_url: "",
    bio: "",
  });

  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    setForm({
      display_name:
        profile?.display_name ||
        user?.user_metadata?.display_name ||
        "",

      username:
        profile?.username ||
        user?.user_metadata?.username ||
        "",

      avatar_url:
        profile?.avatar_url || "",

      bio:
        profile?.bio || "",
    });

    setError("");
    setSaved(false);

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

    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );

      document.body.style.overflow =
        previousOverflow;
    };
  }, [open, profile, user, onClose]);

  if (!open) {
    return null;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError("");
    setSaved(false);

    const { error: updateError } =
      await updateProfile(form);

    if (updateError) {
      setError(
        updateError.message ||
          "Failed to update profile."
      );
    } else {
      setSaved(true);
    }

    setLoading(false);
  };

  const modal = (
    <div
      className={styles.overlay}
      onMouseDown={(event) => {
        if (
          event.target === event.currentTarget
        ) {
          onClose();
        }
      }}
    >
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="profile-title"
      >
        <div className={styles.header}>
          <div>
            <span className={styles.eyebrow}>
              PROFILE
            </span>

            <h2 id="profile-title">
              Your profile.
            </h2>

            <p>
              Update the information shown on
              your account.
            </p>
          </div>

          <IconButton
            icon={<X />}
            label="Close profile editor"
            variant="ghost"
            onClick={onClose}
          />
        </div>

        <div className={styles.preview}>
          <div className={styles.avatar}>
            {form.avatar_url ? (
              <img
                src={form.avatar_url}
                alt=""
              />
            ) : (
              <UserRound size={24} />
            )}
          </div>

          <div>
            <strong>
              {form.display_name ||
                "Your Name"}
            </strong>

            <span>
              {form.username
                ? `@${form.username}`
                : user?.email || ""}
            </span>
          </div>
        </div>

        <form
          className={styles.form}
          onSubmit={handleSubmit}
        >
          <Input
            label="Display name"
            name="display_name"
            value={form.display_name}
            onChange={handleChange}
            placeholder="Your name"
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

          <Input
            label="Avatar URL"
            name="avatar_url"
            value={form.avatar_url}
            onChange={handleChange}
            placeholder="https://..."
            type="url"
          />

          <div className={styles.textareaField}>
            <label htmlFor="profile-bio">
              Bio
            </label>

            <textarea
              id="profile-bio"
              name="bio"
              value={form.bio}
              onChange={handleChange}
              placeholder="Tell people a little about yourself..."
              rows={4}
            />
          </div>

          {error && (
            <p className={styles.error}>
              {error}
            </p>
          )}

          {saved && (
            <p className={styles.success}>
              Profile updated successfully.
            </p>
          )}

          <div className={styles.actions}>
            <Button
              type="button"
              variant="ghost"
              size="medium"
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              size="medium"
              loading={loading}
            >
              Save Profile
            </Button>
          </div>
        </form>
      </div>
    </div>
  );

  return createPortal(
    modal,
    document.body
  );
}

export default ProfileModal;