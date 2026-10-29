import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  LogOut,
  User,
  UserPen,
} from "lucide-react";

import Button from "../../common/Button/Button";
import IconButton from "../../common/IconButton/IconButton";

import AuthModal from "../AuthModal/AuthModal";
import ProfileModal from "../ProfileModal/ProfileModal";

import { useAuth } from "../../../context/AuthContext";

import styles from "./AuthControls.module.css";

function getInitials(name = "") {
  return (
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase() || "U"
  );
}

function AuthControls() {
  const {
    user,
    profile,
    loading,
    signOut,
  } = useAuth();

  const [authOpen, setAuthOpen] =
    useState(false);

  const [profileOpen, setProfileOpen] =
    useState(false);

  const [menuOpen, setMenuOpen] =
    useState(false);

  const wrapperRef =
    useRef(null);

  useEffect(() => {
    const handleClickOutside = (
      event
    ) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(
          event.target
        )
      ) {
        setMenuOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  if (loading) {
    return (
      <div
        className={
          styles.loadingPlaceholder
        }
      />
    );
  }

  if (!user) {
    return (
      <>
        <div
          className={
            styles.desktopSignIn
          }
        >
          <Button
            variant="outline"
            size="small"
            onClick={() =>
              setAuthOpen(true)
            }
          >
            Sign In
          </Button>
        </div>

        <div
          className={
            styles.mobileSignIn
          }
        >
          <IconButton
            icon={<User />}
            label="Sign in"
            variant="ghost"
            size="small"
            onClick={() =>
              setAuthOpen(true)
            }
          />
        </div>

        <AuthModal
          open={authOpen}
          onClose={() =>
            setAuthOpen(false)
          }
        />
      </>
    );
  }

  const displayName =
    profile?.display_name ||
    user.user_metadata
      ?.display_name ||
    user.email?.split("@")[0] ||
    "User";

  const avatarUrl =
    profile?.avatar_url ||
    user.user_metadata
      ?.avatar_url;

  return (
    <>
      <div
        ref={wrapperRef}
        className={styles.account}
      >
        <button
          type="button"
          className={
            styles.profileTrigger
          }
          onClick={() =>
            setMenuOpen(
              (previous) => !previous
            )
          }
          aria-expanded={menuOpen}
          aria-haspopup="menu"
        >
          <span className={styles.avatar}>
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt=""
              />
            ) : (
              getInitials(displayName)
            )}
          </span>

          <span
            className={styles.profileInfo}
          >
            <strong>
              {displayName}
            </strong>

            <small>
              {user.email}
            </small>
          </span>

          <ChevronDown
            className={
              styles.chevron
            }
            size={15}
          />
        </button>

        {menuOpen && (
          <div
            className={styles.dropdown}
            role="menu"
          >
            <div
              className={
                styles.dropdownHeader
              }
            >
              <span>
                Signed in as
              </span>

              <strong>
                {user.email}
              </strong>
            </div>

            <button
              type="button"
              className={
                styles.dropdownItem
              }
              onClick={() => {
                setMenuOpen(false);
                setProfileOpen(true);
              }}
              role="menuitem"
            >
              <UserPen size={16} />
              Edit profile
            </button>

            <button
              type="button"
              className={`${styles.dropdownItem} ${styles.danger}`}
              onClick={async () => {
                setMenuOpen(false);
                await signOut();
              }}
              role="menuitem"
            >
              <LogOut size={16} />
              Sign out
            </button>
          </div>
        )}
      </div>

      <ProfileModal
        open={profileOpen}
        onClose={() =>
          setProfileOpen(false)
        }
      />
    </>
  );
}

export default AuthControls;