"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import AuthButton from "./AuthButton";

export default function Navigation() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-light-bg/80 dark:bg-dark-bg/80 backdrop-blur-lg border-b border-light-border dark:border-dark-border">
      <div className="max-w-5xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="font-display text-xl font-bold">
            CodedByGK
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-medium transition-colors hover:text-accent-primary ${
                  pathname === link.href
                    ? "text-accent-primary"
                    : "text-zinc-600 dark:text-zinc-400"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <AuthButton />
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-accent-primary transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg
                  className="w-6 h-6"
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
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-2">
            <div className="flex flex-col gap-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`font-medium transition-colors hover:text-accent-primary ${
                    pathname === link.href
                      ? "text-accent-primary"
                      : "text-zinc-600 dark:text-zinc-400"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 border-t border-light-border dark:border-dark-border">
                <AuthButton />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
