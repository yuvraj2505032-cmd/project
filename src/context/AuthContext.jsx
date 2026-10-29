import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { supabase } from "../lib/supabase";

const AuthContext = createContext(null);

const PROFILE_FIELDS = `
  id,
  display_name,
  username,
  avatar_url,
  bio,
  preferred_theme,
  preferred_mode,
  created_at,
  updated_at
`;

function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);

  const [profile, setProfile] = useState(null);

  const [authLoading, setAuthLoading] = useState(true);

  const [profileLoading, setProfileLoading] = useState(false);

  /* =================================
     LOAD PROFILE
  ================================= */

  const loadProfile = useCallback(async (userId) => {
    if (!userId) {
      setProfile(null);
      return;
    }

    setProfileLoading(true);

    const { data, error } = await supabase
      .from("profiles")
      .select(PROFILE_FIELDS)
      .eq("id", userId)
      .maybeSingle();

    if (error) {
      console.error("Failed to load profile:", error);

      setProfile(null);
    } else {
      setProfile(data);
    }

    setProfileLoading(false);
  }, []);

  /* =================================
     AUTH INITIALIZATION
  ================================= */

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      const {
        data: { session: currentSession },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("Failed to initialize auth:", error);
      }

      if (!mounted) return;

      setSession(currentSession);
      setUser(currentSession?.user ?? null);

      setAuthLoading(false);
    };

    initializeAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!mounted) return;

      setSession(nextSession);
      setUser(nextSession?.user ?? null);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  /* =================================
     LOAD PROFILE WHEN USER CHANGES
  ================================= */

  useEffect(() => {
    if (!user) {
      setProfile(null);
      setProfileLoading(false);
      return;
    }

    loadProfile(user.id);
  }, [user, loadProfile]);

  /* =================================
     SIGN UP
  ================================= */

  const signUp = useCallback(
    async ({ email, password, displayName, username }) => {
      return supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: displayName || null,

            username: username || null,
          },

          emailRedirectTo: window.location.origin,
        },
      });
    },
    [],
  );

  /* =================================
     SIGN IN
  ================================= */

  const signIn = useCallback(async ({ email, password }) => {
    return supabase.auth.signInWithPassword({
      email,
      password,
    });
  }, []);

  /* =================================
     OAUTH
  ================================= */

  const signInWithProvider = useCallback(async (provider) => {
    return supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: window.location.origin,
      },
    });
  }, []);

  /* =================================
     SIGN OUT
  ================================= */

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();

    if (!error) {
      setSession(null);
      setUser(null);
      setProfile(null);
    }

    return { error };
  }, []);

  /* =================================
     UPDATE PROFILE
  ================================= */

  const updateProfile = useCallback(
    async (updates) => {
      if (!user) {
        return {
          data: null,
          error: new Error("No authenticated user."),
        };
      }

      const { data, error } = await supabase
        .from("profiles")
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id)
        .select(PROFILE_FIELDS)
        .single();

      if (error) {
        return {
          data: null,
          error,
        };
      }

      setProfile(data);

      return {
        data,
        error: null,
      };
    },
    [user],
  );

  const value = useMemo(
    () => ({
      session,
      user,
      profile,

      loading: authLoading || profileLoading,

      authLoading,
      profileLoading,

      signUp,
      signIn,
      signInWithProvider,
      signOut,
      updateProfile,
    }),
    [
      session,
      user,
      profile,
      authLoading,
      profileLoading,
      signUp,
      signIn,
      signInWithProvider,
      signOut,
      updateProfile,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }

  return context;
}

export { AuthProvider, useAuth };
