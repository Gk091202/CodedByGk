"use client";

import { useState } from "react";
import { useAuth } from "./AuthProvider";
import AuthModal from "./AuthModal";

export default function AuthButton() {
  const { user, logout } = useAuth();
  const [showModal, setShowModal] = useState(false);

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm">Hi, {user.name}</span>
        <button
          onClick={logout}
          className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="px-4 py-2 text-sm bg-accent-primary text-white rounded-lg hover:bg-opacity-90"
      >
        Login / Sign Up
      </button>
      {showModal && <AuthModal onClose={() => setShowModal(false)} />}
    </>
  );
}
