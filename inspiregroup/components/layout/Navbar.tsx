"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { languageOptions } from "@/lib/translations";

interface NavbarProps {
  onGoHome: () => void;
}

export default function Navbar({ onGoHome }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const navLinks = [
    { label: t("navHome"), href: "#hero" },
    { label: t("navEcosystem"), href: "#projects" },
    { label: t("navNews"), href: "#announcements" },
    { label: t("navTeams"), href: "#departments" },
  ];

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
          <div className="flex items-center gap-1.5 bg-inset border border-subtle rounded-full p-1">
            {languageOptions.map((option) => (
              <button
                key={option.code}
                onClick={() => setLanguage(option.code)}
                className={`px-3 py-1.5 rounded-full text-[0.72rem] font-bold transition-all duration-200 ${
                  language === option.code
                    ? "bg-content text-main"
                    : "text-muted hover:text-content"
                }`}
                aria-label={`${t("navLanguage")}: ${option.label}`}
              >
                {option.label}
              </button>
            ))}
          </div>
          <button
            onClick={toggleTheme}
            className="theme-toggle-btn w-[42px] h-[42px] rounded-full flex items-center justify-center bg-inset border border-subtle text-muted"
            aria-label={t("navToggleTheme")}
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
