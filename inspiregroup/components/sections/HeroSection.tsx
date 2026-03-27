"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function HeroSection() {
  const gridRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    if (!gridRef.current) return;
    const dots = gridRef.current.children;
    const colors = [
      "var(--inspire-blue)",
      "var(--inspire-green)",
      "var(--inspire-purple)",
      "var(--inspire-teal)",
    ];
    for (let i = 0; i < dots.length; i++) {
      const el = dots[i] as HTMLElement;
      if (Math.random() > 0.6) {
        el.style.background =
          colors[Math.floor(Math.random() * colors.length)];
        el.style.opacity = (0.3 + Math.random() * 0.7).toFixed(2);
      }
    }
  }, []);

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center relative overflow-hidden pt-20"
    >
      {/* Orbs */}
      <div className="orb-drift absolute rounded-full pointer-events-none opacity-20 w-[70vw] h-[70vw] -top-[20%] -right-[20%] blur-[120px] bg-inspire-blue" />
      <div className="orb-drift-delayed absolute rounded-full pointer-events-none opacity-20 w-[60vw] h-[60vw] -bottom-[20%] -left-[10%] blur-[120px] bg-inspire-purple" />

      <div className="relative z-[2] w-full max-w-[1280px] mx-auto px-10 max-md:px-6">
        <div className="grid grid-cols-[1.1fr_1fr] gap-20 items-center max-lg:grid-cols-1 max-lg:text-center">
          {/* Text */}
          <div className="hero-animate">
            <h1 className="font-serif text-[clamp(3rem,6vw,5rem)] font-bold leading-[1.05] tracking-tight mb-6">
              {t("heroTitle1")}
              <br />
              <span className="grad-text">{t("heroTitle2")}</span>
            </h1>

            <p className="text-[1.15rem] text-muted leading-relaxed max-w-[500px] mb-12 font-normal max-lg:mx-auto">
              {t("heroSubtitle")}
            </p>

            <a
              href="#departments"
              className="btn-brand inline-flex items-center justify-center gap-2.5 py-3.5 px-8 text-base font-semibold rounded-full bg-content text-main shadow-[var(--shadow-md)]"
            >
              <i className="ph-bold ph-buildings" /> {t("heroCta")}
            </a>
          </div>

          {/* Visual Cards */}
          <div className="hero-visual-animate relative hidden lg:block">
            <div className="relative w-full h-[500px]">
              {/* Card 1 - System Health */}
              <div className="hc absolute top-5 left-0 right-10 z-[4] p-8 shadow-[var(--shadow-lg)]">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-bold text-base flex items-center gap-2.5 font-serif text-content">
                    <i
                      className="ph-fill ph-chart-bar"
                      style={{ color: "var(--inspire-blue)" }}
                    />
                    {t("heroSystemHealth")}
                  </span>
                  <span className="py-1.5 px-3.5 rounded-full text-[0.75rem] font-extrabold uppercase bg-[rgba(16,185,129,0.1)] text-inspire-green">
                    {t("heroOptimal")}
                  </span>
                </div>
                <div className="flex items-end gap-2 h-[110px]">
                  {[40, 58, 32, 88, 55, 72].map((h, i) => (
                    <div
                      key={i}
                      className={`flex-1 mini-bar ${i === 3 ? "mini-bar-active" : ""}`}
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>

              {/* Card 2 - Network Activity */}
              <div className="hc absolute top-[240px] left-[60px] right-0 z-[3] p-8 shadow-[var(--shadow-md)]">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-bold text-base flex items-center gap-2.5 font-serif text-content">
                    <i
                      className="ph-fill ph-calendar-check"
                      style={{ color: "var(--inspire-green)" }}
                    />
                    {t("heroNetworkActivity")}
                  </span>
                </div>
                <div
                  ref={gridRef}
                  className="flex gap-1 flex-wrap"
                >
                  {Array.from({ length: 56 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-3 h-3 rounded bg-inset"
                    />
                  ))}
                </div>
              </div>

              {/* Floating Card - Uptime */}
              <div className="hc card-bob absolute top-[100px] -right-[30px] w-[180px] z-[5] p-6 shadow-[var(--shadow-xl)] bg-card rounded-[var(--r-xl)]">
                <div className="w-20 h-20 mx-auto mb-4 relative flex items-center justify-center">
                  <div className="ring-spin absolute inset-0 rounded-full border-[8px] border-inset border-t-inspire-purple border-r-inspire-blue" />
                  <span className="font-extrabold text-[1.2rem] font-serif text-content">
                    99%
                  </span>
                </div>
                <div className="text-center font-bold text-[0.9rem] text-content">
                  {t("heroUptime")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
