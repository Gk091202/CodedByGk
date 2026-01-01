"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { authService } from "@/lib/appwrite";

interface User {
  $id: string;
  name: string;
  email: string;
  labels: string[];
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  signup: (
    email: string,
    password: string,
    name: string
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const result = await authService.getCurrentUser();
    if (result.success && result.data) {
      setUser(result.data as User);
      const adminStatus = await authService.isAdmin();
      setIsAdmin(adminStatus);
    }
    setLoading(false);
  };

  const login = async (email: string, password: string) => {
    try {
      const result = await authService.login(email, password);
      if (result.success) {
        await checkUser();
      }
      return result;
    } catch (error: any) {
      console.error("Login error:", error);
      if (error.message?.includes("fetch")) {
        return {
          success: false,
          error:
            "Connection failed. Please add 'http://localhost:3000' to your Appwrite platform settings.",
        };
      }
      return { success: false, error: error.message || "Login failed" };
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      const result = await authService.createAccount(email, password, name);
      if (result.success) {
        await checkUser();
      }
      return result;
    } catch (error: any) {
      console.error("Signup error:", error);
      if (error.message?.includes("fetch")) {
        return {
          success: false,
          error:
            "Connection failed. Please add 'http://localhost:3000' to your Appwrite platform settings.",
        };
      }
      return { success: false, error: error.message || "Signup failed" };
    }
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, isAdmin, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
