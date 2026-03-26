"use client";

import { useState } from "react";
import type { AppModalProps } from "@/lib/types";
import Portal from "@/components/ui/Portal";

export default function AppModal({ app, isOpen, onClose }: AppModalProps) {
  const [activeTab, setActiveTab] = useState(0);

  if (!app) return null;

  const tabs = ["Overview", "Demos"];

  return (
    <Portal>
    <div
      className={`modal-overlay ${isOpen ? "active" : ""}`}
      onClick={onClose}
    >
      <div
        className="modal-panel w-full max-w-[600px] rounded-xl overflow-hidden shadow-(--shadow-xl) relative flex flex-col max-h-[90vh] bg-card text-content border border-subtle"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="close-btn-rotate absolute top-5 right-5 bg-inset border border-subtle w-10 h-10 rounded-full text-muted text-[1.2rem] flex items-center justify-center z-10"
        >
          <i className="ph-bold ph-x" />
        </button>

        {/* Header */}
        <div
          className="pt-12 px-10 pb-8 flex flex-col items-center text-center border-b border-subtle max-md:px-6 max-md:pt-8"
          style={{
            background: `linear-gradient(to bottom, rgba(${app.modalRgb},0.05), transparent)`,
          }}
        >
          <div
            className="w-[100px] h-[100px] rounded-[30px] flex items-center justify-center mb-6 text-[3.5rem] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2),var(--shadow-md)] relative overflow-hidden max-md:w-20 max-md:h-20 max-md:text-[2.5rem]"
            style={{
              background: app.modalLogoBg,
              color: app.modalLogoColor,
            }}
          >
            {app.imageSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={app.imageSrc} alt={app.name} className="w-full h-full object-contain p-2" />
            ) : (
              <i className={app.icon} />
            )}
          </div>
          <h2 className="font-serif text-[2.2rem] mb-3">{app.name}</h2>
          <p className="text-[1.05rem] text-muted leading-relaxed text-center">
            {app.longDesc}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-inset p-1.5 rounded-full mx-10 -translate-y-1/2 border border-subtle max-md:mx-6">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`flex-1 py-3 px-5 text-[0.9rem] font-bold rounded-full text-center transition-all duration-300 ${
                activeTab === i
                  ? "bg-card text-content shadow-(--shadow-sm)"
                  : "text-muted hover:text-content"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="px-10 pb-10 pt-2 overflow-y-auto max-md:px-6 max-md:pb-8">
          {/* Overview Tab */}
          {activeTab === 0 && (
            <div className="animate-[fadeInUp_0.4s_ease]">
              <h4 className="font-serif text-[1.2rem] font-bold mb-5">
                Key Features
              </h4>
              <ul className="grid grid-cols-2 gap-4 mb-9 max-md:grid-cols-1 list-none p-0">
                {app.features.map((f) => (
                  <li
                    key={f.text}
                    className="flex items-center gap-3 text-[0.95rem] font-medium text-content"
                  >
                    <i
                      className={`${f.icon} text-[1.2rem]`}
                      style={{ color: app.modalLogoColor }}
                    />
                    {f.text}
                  </li>
                ))}
              </ul>
              <button
                className="w-full py-4 rounded-full text-[1.1rem] font-bold flex items-center justify-center gap-3 shadow-(--shadow-md) transition-all duration-300 hover:-translate-y-1 hover:shadow-(--shadow-lg)"
                style={{
                  background: app.modalLogoBg,
                  color: app.modalLogoColor,
                }}
              >
                <i className="ph-bold ph-arrow-square-out" /> Launch{" "}
                {app.name}
              </button>
            </div>
          )}

          {/* Demos Tab */}
          {activeTab === 1 && (
            <div className="animate-[fadeInUp_0.4s_ease]">
              <h4 className="font-serif text-[1.2rem] font-bold mb-5">
                Demo Videos
              </h4>
              {app.videos.map((vid) => (
                <div
                  key={vid.title}
                  className="bg-main border border-subtle rounded-md overflow-hidden mb-4 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-(--shadow-sm)"
                  style={
                    {
                      "--modal-rgb": app.modalRgb,
                    } as React.CSSProperties
                  }
                >
                  <div
                    className="h-40 flex items-center justify-center relative"
                    style={{ background: vid.gradient }}
                  >
                    <div className="absolute inset-0 bg-black/10" />
                    <div
                      className="w-[50px] h-[50px] rounded-full bg-white/95 flex items-center justify-center z-[2] shadow-(--shadow-md) transition-transform duration-400 hover:scale-110"
                      style={{ color: `rgb(${app.modalRgb})` }}
                    >
                      <i className="ph-fill ph-play text-[1.2rem]" />
                    </div>
                  </div>
                  <div className="py-4 px-5">
                    <h5 className="font-serif text-[1.05rem] font-bold mb-1.5">
                      {vid.title}
                    </h5>
                    <p className="text-[0.85rem] text-muted">{vid.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
    </Portal>
  );
}
