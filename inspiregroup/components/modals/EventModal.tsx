"use client";

import type { EventModalProps } from "@/lib/types";
import Portal from "@/components/ui/Portal";
import { useLanguage } from "@/context/LanguageContext";

export default function EventModal({
  event,
  isOpen,
  onClose,
}: EventModalProps) {
  const { t } = useLanguage();
  if (!event) return null;

  return (
    <Portal>
    <div
      className={`modal-overlay ${isOpen ? "active" : ""}`}
      onClick={onClose}
    >
      <div
        className="modal-panel bg-card w-full max-w-[550px] rounded-xl overflow-hidden shadow-(--shadow-xl) relative flex flex-col max-h-[90vh] border border-subtle"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="close-btn-rotate absolute top-5 right-5 bg-white/20 border border-white/30 w-10 h-10 rounded-full text-white text-[1.2rem] flex items-center justify-center z-10"
        >
          <i className="ph-bold ph-x" />
        </button>

        {/* Poster */}
        <div
          className="h-[240px] w-full flex items-center justify-center text-[6rem] text-white/95 relative"
          style={{ background: event.posterGradient }}
        >
          <i className={event.icon} />
        </div>

        {/* Body */}
        <div className="p-10 flex flex-col max-md:p-6">
          <h3 className="font-serif text-[2.2rem] mb-3 leading-[1.1] text-content">
            {event.title}
          </h3>

          <div className="flex flex-wrap gap-4 mb-6 pb-6 border-b border-subtle">
            <div className="flex items-center gap-2.5 text-[0.95rem] text-content font-semibold">
              <i className="ph-duotone ph-calendar-blank text-inspire-blue text-[1.3rem]" />
              {event.date}
            </div>
            <div className="flex items-center gap-2.5 text-[0.95rem] text-content font-semibold">
              <i className="ph-duotone ph-map-pin text-inspire-blue text-[1.3rem]" />
              {event.location}
            </div>
          </div>

          <p className="text-[1.05rem] text-muted leading-relaxed mb-9">
            {event.fullDesc}
          </p>

          <button
            onClick={onClose}
            className="w-full py-4 rounded-full border border-subtle text-content font-bold text-base transition-all duration-300 hover:bg-inset"
          >
            {t("eventClose")}
          </button>
        </div>
      </div>
    </div>
    </Portal>
  );
}
