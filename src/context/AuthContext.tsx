"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { createClient } from "@/lib/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";

export type UserRole = "visitor" | "user" | "organizer" | "admin";

export interface HeiUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
}

interface AuthContextType {
  user: HeiUser | null;
  loading: boolean;
  login: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; error?: string }>;
  register: (data: {
    name: string;
    email: string;
    password: string;
  }) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateUser: (data: Partial<HeiUser>) => void;
  isAuthenticated: boolean;
  isOrganizer: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

function mapUser(supabaseUser: SupabaseUser | null): HeiUser | null {
  if (!supabaseUser) return null;
  return {
    id: supabaseUser.id,
    name:
      supabaseUser.user_metadata?.name ||
      supabaseUser.email?.split("@")[0] ||
      "",
    email: supabaseUser.email || "",
    role: (supabaseUser.user_metadata?.role as UserRole) || "user",
    avatar: supabaseUser.user_metadata?.avatar_url,
    createdAt: supabaseUser.created_at,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<HeiUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Try to create Supabase client; if not configured, use no-op auth
  let supabase: ReturnType<typeof createClient> | null = null;
  let supabaseEnabled = true;
  try {
    supabase = createClient();
  } catch {
    supabaseEnabled = false;
  }

  useEffect(() => {
    if (!supabaseEnabled || !supabase) {
      setLoading(false);
      return;
    }

    // Get initial session
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        setUser(mapUser(session?.user ?? null));
        setLoading(false);
      })
      .catch(() => setLoading(false));

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(mapUser(session?.user ?? null));
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      if (!supabaseEnabled || !supabase) {
        return { success: false, error: "Autentisering er ikke konfigurert." };
      }
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        const friendly =
          error.message === "Invalid login credentials"
            ? "Feil e-post eller passord."
            : error.message;
        return { success: false, error: friendly };
      }
      return { success: true };
    },
    [supabaseEnabled],
  );

  const register = useCallback(
    async (data: { name: string; email: string; password: string }) => {
      if (!supabaseEnabled || !supabase) {
        return { success: false, error: "Autentisering er ikke konfigurert." };
      }
      if (data.password.length < 6) {
        return { success: false, error: "Passord må være minst 6 tegn." };
      }

      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: { name: data.name },
        },
      });

      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true };
    },
    [supabaseEnabled],
  );

  const logout = useCallback(async () => {
    if (supabaseEnabled && supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
  }, [supabaseEnabled]);

  const updateUser = useCallback(
    (data: Partial<HeiUser>) => {
      if (!user) return;
      setUser((prev) => (prev ? { ...prev, ...data } : null));
    },
    [user],
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateUser,
        isAuthenticated: !!user,
        isOrganizer: user?.role === "organizer" || user?.role === "admin",
        isAdmin: user?.role === "admin",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
