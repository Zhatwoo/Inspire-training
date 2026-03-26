"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";

interface NavbarProps {
  onGoHome: () => void;
}

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Ecosystem", href: "#projects" },
  { label: "News", href: "#announcements" },
  { label: "Teams", href: "#departments" },
];

export default function Navbar({ onGoHome }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    onGoHome();
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="fixed top-5 left-0 right-0 z-[1000] flex justify-center px-5 pointer-events-none">
      <nav
        className={`h-[var(--nav-h)] bg-nav-blur backdrop-blur-[20px] saturate-[1.8] border border-subtle rounded-full flex items-center justify-between px-6 shadow-[var(--shadow-md)] w-full max-w-[1200px] pointer-events-auto transition-all duration-400 ${
          scrolled ? "navbar-scrolled" : ""
        }`}
      >
        {/* Brand */}
        <button
          onClick={onGoHome}
          className="flex items-center gap-3 cursor-pointer"
        >
          <div className="w-[42px] h-[42px] rounded-full overflow-hidden border border-subtle shadow-(--shadow-sm) shrink-0">
            <Image src="/logo.png" alt="Inspire Group" width={42} height={42} className="w-full h-full object-cover" />
          </div>
          <span className="font-serif font-bold text-[1.3rem] tracking-tight text-content">
            Inspire Group
          </span>
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="px-5 py-2.5 text-[0.9rem] font-semibold text-muted rounded-full transition-all duration-300 hover:text-content hover:bg-inset"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={toggleTheme}
            className="theme-toggle-btn w-[42px] h-[42px] rounded-full flex items-center justify-center bg-inset border border-subtle text-muted"
            aria-label="Toggle theme"
          >
            <i
              className={`ph-bold ${theme === "dark" ? "ph-moon" : "ph-sun"}`}
            />
          </button>
        </div>
      </nav>
    </div>
  );
}
