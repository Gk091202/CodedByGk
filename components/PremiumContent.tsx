"use client";

import { useAuth } from "./AuthProvider";
import { useState } from "react";
import AuthModal from "./AuthModal";

interface PremiumContentProps {
  children: React.ReactNode;
  previewContent?: React.ReactNode;
}

export default function PremiumContent({
  children,
  previewContent,
}: PremiumContentProps) {
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  if (user) {
    return <>{children}</>;
  }

  return (
    <>
      {/* Preview Content (if provided) */}
      {previewContent && <div className="mb-8">{previewContent}</div>}

      {/* Premium Gate */}
      <div className="relative">
        {/* Blurred content */}
        <div className="blur-sm pointer-events-none select-none">
          {children}
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-light-bg/80 dark:via-dark-bg/80 to-light-bg dark:to-dark-bg flex items-center justify-center">
          <div className="text-center p-8 max-w-md">
            <div className="bg-accent-primary/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-accent-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-2">Premium Content</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Sign up for free to read this full post and unlock all premium
              content.
            </p>
            <button
              onClick={() => setShowAuthModal(true)}
              className="px-6 py-3 bg-accent-primary text-white rounded-lg font-medium hover:bg-opacity-90 transition"
            >
              Sign Up to Continue Reading
            </button>
            <p className="text-sm text-gray-500 mt-4">
              Already have an account?{" "}
              <button
                onClick={() => setShowAuthModal(true)}
                className="text-accent-primary hover:underline"
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </div>

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </>
  );
}
