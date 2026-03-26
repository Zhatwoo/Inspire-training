"use client";

import { useState } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import AppModal from "@/components/modals/AppModal";
import { appData } from "@/lib/data";
import { useFadeIn } from "@/hooks/useFadeIn";
import type { AppData } from "@/lib/types";

export default function EcosystemSection() {
  const [selectedApp, setSelectedApp] = useState<AppData | null>(null);
  const { ref: gridRef, isVisible } = useFadeIn();

  return (
    <section id="projects" className="py-30 relative z-[1] bg-elevated">
      <div className="max-w-[1280px] mx-auto px-10 max-md:px-6">
        <SectionHeader
          label="Ecosystem"
          labelColorClass="lbl-blue"
          title="Core Applications"
          subtitle="The unified suite of tools powering our daily operations. Click any application to view features and launch."
          centered
        />

        <div
          ref={gridRef}
          className={`grid grid-cols-4 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1 transition-all duration-800 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ perspective: "1000px" }}
        >
          {appData.map((app) => (
            <button
              key={app.id}
              onClick={() => setSelectedApp(app)}
              className={`app-card-3d rounded-[var(--r-xl)] p-12 pb-12 flex flex-col items-center text-center border-none shadow-[var(--shadow-sm)] cursor-pointer ${app.cardClass}`}
            >
              <div
                className="app-logo-3d w-[90px] h-[90px] rounded-[28px] flex items-center justify-center mb-7 text-[3rem] shadow-[0_10px_24px_rgba(0,0,0,0.15)] overflow-hidden bg-white"
                style={{ color: app.logoColor, ...(app.logoBg ? { background: app.logoBg } : {}) }}
              >
                {app.imageSrc ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={app.imageSrc} alt={app.name} className="w-full h-full object-contain p-1" />
                ) : (
                  <i className={app.icon} />
                )}
              </div>
              <h3 className="font-serif text-[1.6rem] font-bold mb-3 text-white">
                {app.name}
              </h3>
              <p className="text-[0.95rem] leading-relaxed mb-7 flex-grow text-white/90">
                {app.desc}
              </p>
              <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full text-[0.75rem] font-extrabold uppercase bg-white/20 text-white border border-white/40 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-white" /> Live
              </div>
            </button>
          ))}
        </div>
      </div>

      <AppModal
        app={selectedApp}
        isOpen={!!selectedApp}
        onClose={() => setSelectedApp(null)}
      />
    </section>
  );
}
