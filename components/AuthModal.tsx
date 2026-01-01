"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useAuth } from "./AuthProvider";

export default function AuthModal({ onClose }: { onClose: () => void }) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { login, signup } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result =
      mode === "login"
        ? await login(email, password)
        : await signup(email, password, name);

    if (result.success) {
      onClose();
    } else {
      setError(result.error || "Something went wrong");
    }
    setLoading(false);
  };

  const modalContent = (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(4px)",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "420px",
          maxHeight: "90vh",
          overflowY: "auto",
          borderRadius: "16px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        }}
        className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            zIndex: 10,
            padding: "4px",
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          aria-label="Close modal"
        >
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div style={{ padding: "32px" }}>
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              marginBottom: "24px",
              paddingRight: "32px",
            }}
            className="text-gray-900 dark:text-white"
          >
            {mode === "login" ? "Welcome Back" : "Create Account"}
          </h2>

          <form onSubmit={handleSubmit}>
            {mode === "signup" && (
              <div style={{ marginBottom: "16px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: 500,
                    marginBottom: "8px",
                  }}
                  className="text-gray-700 dark:text-gray-200"
                >
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Your name"
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: "8px",
                    border: "1px solid #d1d5db",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                  className="bg-white dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400"
                />
              </div>
            )}

            <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: 500,
                  marginBottom: "8px",
                }}
                className="text-gray-700 dark:text-gray-200"
              >
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "8px",
                  border: "1px solid #d1d5db",
                  outline: "none",
                  boxSizing: "border-box",
                }}
                className="bg-white dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400"
              />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: 500,
                  marginBottom: "8px",
                }}
                className="text-gray-700 dark:text-gray-200"
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                placeholder="••••••••"
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "8px",
                  border: "1px solid #d1d5db",
                  outline: "none",
                  boxSizing: "border-box",
                }}
                className="bg-white dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400"
              />
              {mode === "signup" && (
                <p
                  style={{
                    fontSize: "12px",
                    marginTop: "8px",
                  }}
                  className="text-gray-500 dark:text-gray-400"
                >
                  Minimum 8 characters
                </p>
              )}
            </div>

            {error && (
              <div
                style={{
                  padding: "12px",
                  marginBottom: "16px",
                  borderRadius: "8px",
                  backgroundColor: "rgba(239, 68, 68, 0.1)",
                  border: "1px solid rgba(239, 68, 68, 0.3)",
                }}
              >
                <p style={{ fontSize: "14px", color: "#dc2626" }}>{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "8px",
                border: "none",
                fontWeight: 500,
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.5 : 1,
              }}
              className="bg-accent-primary text-white"
            >
              {loading
                ? "Loading..."
                : mode === "login"
                ? "Sign In"
                : "Create Account"}
            </button>
          </form>

          <div style={{ marginTop: "24px", textAlign: "center" }}>
            <p
              style={{ fontSize: "14px" }}
              className="text-gray-600 dark:text-gray-400"
            >
              {mode === "login"
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                onClick={() => {
                  setMode(mode === "login" ? "signup" : "login");
                  setError("");
                }}
                style={{
                  background: "none",
                  border: "none",
                  fontWeight: 500,
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
                className="text-accent-primary"
              >
                {mode === "login" ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  if (!mounted) return null;

  return createPortal(modalContent, document.body);
}
