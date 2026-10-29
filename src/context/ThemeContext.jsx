import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useAuth } from "./AuthContext";

const ThemeContext = createContext(null);

/* =================================
   PROJECT DEFAULTS
   ---------------------------------
   This project uses ONE visual
   identity: VITAL Healthcare.
================================= */

const DEFAULT_THEME = "vital";
const DEFAULT_MODE = "light";

/* =================================
   DEVELOPMENT CONFIGURATION
   ---------------------------------
   Keep this enabled while designing
   the hackathon healthcare interface.

   The project currently uses:

   Theme → vital
   Mode  → light
================================= */

const DEV_THEME = "vital";
const DEV_MODE = "light";

/*
  true  → always use DEV_THEME / DEV_MODE
  false → use saved/profile preferences

  Since this project has only one theme,
  DEV_THEME will normally remain "vital".
*/
const USE_DEV_THEME = true;

/* =================================
   VALID VALUES
   ---------------------------------
   IMPORTANT:
   There is intentionally only ONE
   project theme.

   This is no longer a multi-theme
   hackathon boilerplate.
================================= */

const VALID_THEMES = ["vital"];

const VALID_MODES = ["dark", "light"];

/* =================================
   INITIAL THEME
================================= */

function getInitialTheme() {
  /* --------------------------------
     Development override
  -------------------------------- */

  if (USE_DEV_THEME) {
    return VALID_THEMES.includes(DEV_THEME)
      ? DEV_THEME
      : DEFAULT_THEME;
  }

  /* --------------------------------
     SSR safety
  -------------------------------- */

  if (typeof window === "undefined") {
    return DEFAULT_THEME;
  }

  /* --------------------------------
     Saved browser preference
  -------------------------------- */

  const savedTheme = localStorage.getItem("hackathon-theme");

  return VALID_THEMES.includes(savedTheme)
    ? savedTheme
    : DEFAULT_THEME;
}

/* =================================
   INITIAL MODE
================================= */

function getInitialMode() {
  /* --------------------------------
     Development override
  -------------------------------- */

  if (USE_DEV_THEME) {
    return VALID_MODES.includes(DEV_MODE)
      ? DEV_MODE
      : DEFAULT_MODE;
  }

  /* --------------------------------
     SSR safety
  -------------------------------- */

  if (typeof window === "undefined") {
    return DEFAULT_MODE;
  }

  /* --------------------------------
     Saved browser preference
  -------------------------------- */

  const savedMode = localStorage.getItem("hackathon-mode");

  return VALID_MODES.includes(savedMode)
    ? savedMode
    : DEFAULT_MODE;
}

/* =================================
   PROVIDER
================================= */

function ThemeProvider({ children }) {
  const { user, profile, updateProfile } = useAuth();

  const [theme, setTheme] = useState(getInitialTheme);
  const [mode, setMode] = useState(getInitialMode);

  const [profileSynced, setProfileSynced] = useState(false);

  /* =================================
     APPLY THEME + MODE
     ---------------------------------
     The HTML root receives:

       data-theme="vital"
       data-mode="light"

     or

       data-theme="vital"
       data-mode="dark"
  ================================= */

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.mode = mode;

    /*
      Persist preferences only when
      development override is disabled.
    */

    if (!USE_DEV_THEME) {
      localStorage.setItem("hackathon-theme", theme);
      localStorage.setItem("hackathon-mode", mode);
    }
  }, [theme, mode]);

  /* =================================
     LOAD PROFILE PREFERENCES
     ---------------------------------
     Theme:
       Always remains "vital"

     Mode:
       Can still come from the
       authenticated user's profile.

     This keeps the architecture ready
     for user-specific light/dark mode.
  ================================= */

  useEffect(() => {
    /*
      Development mode completely ignores
      authenticated profile preferences.
    */

    if (USE_DEV_THEME || !user || !profile || profileSynced) {
      return;
    }

    /*
      Only "vital" is accepted as a theme.
    */

    const profileTheme =
      profile.preferred_theme === "vital"
        ? "vital"
        : null;

    /*
      Light/dark remains configurable.
    */

    const profileMode = VALID_MODES.includes(
      profile.preferred_mode,
    )
      ? profile.preferred_mode
      : null;

    if (profileTheme) {
      setTheme(profileTheme);
    } else {
      /*
        If an older profile contains one of the
        previous boilerplate themes, migrate it
        automatically to the healthcare theme.
      */

      setTheme("vital");
    }

    if (profileMode) {
      setMode(profileMode);
    }

    setProfileSynced(true);
  }, [user, profile, profileSynced]);

  /* =================================
     RESET PROFILE SYNC ON LOGOUT
================================= */

  useEffect(() => {
    if (!user) {
      setProfileSynced(false);
    }
  }, [user]);

  /* =================================
     CHANGE MODE
================================= */

  const changeMode = useCallback(
    async (nextMode) => {
      if (!VALID_MODES.includes(nextMode)) {
        return;
      }

      setMode(nextMode);

      /*
        Don't write development testing
        values into the user's profile.
      */

      if (!USE_DEV_THEME && user) {
        await updateProfile({
          preferred_mode: nextMode,
        });
      }
    },
    [user, updateProfile],
  );

  /* =================================
     TOGGLE MODE
     ---------------------------------
     Kept internally for architecture
     compatibility.

     The UI does NOT need to expose
     a theme/mode toggle.
  ================================= */

  const toggleMode = useCallback(() => {
    setMode((currentMode) => {
      const nextMode =
        currentMode === "dark"
          ? "light"
          : "dark";

      /*
        Only persist when development
        override is disabled.
      */

      if (!USE_DEV_THEME && user) {
        updateProfile({
          preferred_mode: nextMode,
        });
      }

      return nextMode;
    });
  }, [user, updateProfile]);

  /* =================================
     CHANGE THEME
     ---------------------------------
     Kept for architecture compatibility.

     Since VITAL is the only theme,
     every valid theme resolves to VITAL.
  ================================= */

  const changeTheme = useCallback(
    async (nextTheme) => {
      /*
        Reject anything outside the
        healthcare theme system.
      */

      if (!VALID_THEMES.includes(nextTheme)) {
        return;
      }

      /*
        The only valid theme is VITAL.
      */

      setTheme("vital");

      /*
        Persist only when development
        override is disabled.
      */

      if (!USE_DEV_THEME && user) {
        await updateProfile({
          preferred_theme: "vital",
        });
      }
    },
    [user, updateProfile],
  );

  /* =================================
     CONTEXT VALUE
================================= */

  const value = useMemo(
    () => ({
      /* --------------------------------
         Current values
      -------------------------------- */

      theme,
      mode,

      /* --------------------------------
         Theme controls
      -------------------------------- */

      setTheme: changeTheme,
      setMode: changeMode,
      toggleMode,

      /* --------------------------------
         Available values
      -------------------------------- */

      /*
        Only one visual identity exists
        in the healthcare platform.
      */

      themes: VALID_THEMES,
      modes: VALID_MODES,

      /* --------------------------------
         Developer configuration
      -------------------------------- */

      isDevelopmentOverride: USE_DEV_THEME,
    }),
    [
      theme,
      mode,
      changeTheme,
      changeMode,
      toggleMode,
    ],
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

/* =================================
   HOOK
================================= */

function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useTheme must be used inside ThemeProvider.",
    );
  }

  return context;
}

export {
  ThemeProvider,
  useTheme,
};