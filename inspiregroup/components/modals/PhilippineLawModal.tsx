"use client";

import type { PhilippineLawModalProps } from "@/lib/types";
import Portal from "@/components/ui/Portal";

export default function PhilippineLawModal({ law, isOpen, onClose }: PhilippineLawModalProps) {
  if (!law) return null;

  return (
    <Portal>
      <div
        className={`modal-overlay ${isOpen ? "active" : ""}`}
        onClick={onClose}
      >
        <div
          className="modal-panel w-full max-w-[700px] rounded-xl overflow-hidden shadow-(--shadow-xl) relative flex flex-col max-h-[90vh] bg-card text-content border border-subtle"
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
              background: `linear-gradient(to bottom, ${law.color}15, transparent)`,
            }}
          >
            <div
              className="w-[100px] h-[100px] rounded-[30px] flex items-center justify-center mb-6 text-[3.5rem] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2),var(--shadow-md)] relative overflow-hidden max-md:w-20 max-md:h-20 max-md:text-[2.5rem]"
              style={{
                background: `${law.color}20`,
                color: law.color,
              }}
            >
              <i className={law.icon} />
            </div>
            <div className="mb-3">
              <span
                className="inline-block px-4 py-1.5 bg-inset border border-subtle rounded-full text-[0.85rem] font-bold mb-3"
                style={{ color: law.color }}
              >
                RA {law.num}
              </span>
            </div>
            <h2 className="font-serif text-[2rem] mb-4">{law.details.title}</h2>
            <p className="text-[1rem] text-muted leading-relaxed text-center">
              {law.details.purpose}
            </p>
          </div>

          {/* Body */}
          <div className="px-10 pb-10 pt-8 overflow-y-auto max-md:px-6 max-md:pb-8">
            <div className="animate-[fadeInUp_0.4s_ease]">
              <h3
                className="font-serif text-[1.3rem] font-bold mb-6"
                style={{ color: law.color }}
              >
                Relevance to IT
              </h3>
              <div className="space-y-4">
                {law.details.relevance.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 font-bold text-white text-[0.85rem]"
                      style={{ backgroundColor: law.color }}
                    >
                      {index + 1}
                    </div>
                    <p className="text-[0.95rem] text-content leading-relaxed pt-1">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
}
