"use client";

import type { EventModalProps } from "@/lib/types";
import Portal from "@/components/ui/Portal";

export default function EventModal({
  event,
  isOpen,
  onClose,
}: EventModalProps) {
  if (!event) return null;

  // Extract first color from gradient
  const getColorFromGradient = (gradient: string) => {
    const match = gradient.match(/#[0-9a-f]{6}/i);
    return match ? match[0] : "#3b82f6";
  };

  const primaryColor = getColorFromGradient(event.posterGradient);

  return (
    <Portal>
    <div
      className={`modal-overlay ${isOpen ? "active" : ""}`}
      onClick={onClose}
    >
      <div
        className="modal-panel bg-card w-full max-w-[550px] rounded-xl overflow-hidden shadow-(--shadow-xl) relative flex flex-col max-h-[90vh] border border-subtle max-md:max-w-[90%]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="close-btn-rotate absolute top-5 right-5 bg-white/20 border border-white/30 w-10 h-10 rounded-full text-white text-[1.2rem] flex items-center justify-center z-10"
        >
          <i className="ph-bold ph-x" />
        </button>

        {/* Poster - Solid Color */}
        <div
          className="h-[240px] w-full flex items-center justify-center text-[6rem] text-white/95 relative max-md:text-[4rem]"
          style={{ backgroundColor: primaryColor }}
        >
          <i className={event.icon} />
        </div>

        {/* Body */}
        <div className="p-10 flex flex-col max-md:p-6 overflow-y-auto">
          <h3 className="font-serif text-[2.2rem] max-md:text-[1.6rem] mb-3 leading-[1.1] text-content">
            {event.title}
          </h3>

          <div className="flex flex-wrap gap-4 mb-6 pb-6 border-b border-subtle">
            <div className="flex items-center gap-2.5 text-[0.95rem] max-md:text-[0.85rem] text-content font-semibold">
              <i className="ph-duotone ph-calendar-blank text-[1.3rem] max-md:text-[1.1rem]" style={{ color: primaryColor }} />
              {event.date}
            </div>
            <div className="flex items-center gap-2.5 text-[0.95rem] max-md:text-[0.85rem] text-content font-semibold">
              <i className="ph-duotone ph-map-pin text-[1.3rem] max-md:text-[1.1rem]" style={{ color: primaryColor }} />
              {event.location}
            </div>
          </div>

          <p className="text-[1.05rem] max-md:text-[0.95rem] text-muted leading-relaxed mb-9">
            {event.fullDesc}
          </p>

          <button
            onClick={onClose}
            className="w-full py-4 rounded-full border border-subtle text-content font-bold text-base transition-all duration-300 hover:bg-inset max-md:py-3 max-md:text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
    </Portal>
  );
}
