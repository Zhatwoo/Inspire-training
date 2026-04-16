"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import EventModal from "@/components/modals/EventModal";
import { eventData } from "@/lib/data";
import type { EventData } from "@/lib/types";

export default function AnnouncementsSection() {
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);

  // Scroll to a specific slide by index using accurate offsetLeft centering
  const goToSlide = useCallback((index: number) => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const cards = carousel.querySelectorAll<HTMLElement>(".carousel-card");
    if (!cards[index]) return;

    const card = cards[index];
    const containerWidth = carousel.offsetWidth;
    const cardWidth = card.offsetWidth;
    const targetLeft = card.offsetLeft - (containerWidth - cardWidth) / 2;

    isScrolling.current = true;
    carousel.scrollTo({ left: Math.max(0, targetLeft), behavior: "smooth" });
    setActiveSlide(index);

    // Re-enable scroll detection after animation
    setTimeout(() => {
      isScrolling.current = false;
    }, 600);
  }, []);

  const moveCarousel = (dir: number) => {
    const next = Math.max(0, Math.min(eventData.length - 1, activeSlide + dir));
    goToSlide(next);
  };

  // Sync dot indicator with manual swipe scroll
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const onScroll = () => {
      if (isScrolling.current) return;
      const cards = carousel.querySelectorAll<HTMLElement>(".carousel-card");
      if (!cards.length) return;

      const containerCenter = carousel.scrollLeft + carousel.offsetWidth / 2;
      let closest = 0;
      let closestDist = Infinity;

      cards.forEach((card, i) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const dist = Math.abs(containerCenter - cardCenter);
        if (dist < closestDist) {
          closestDist = dist;
          closest = i;
        }
      });

      setActiveSlide(closest);
    };

    carousel.addEventListener("scroll", onScroll, { passive: true });
    return () => carousel.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="announcements"
      className="relative overflow-hidden"
      style={{ background: "#0f172a", color: "#fff", margin: "0 20px", borderRadius: "var(--r-xl)" }}
    >
      {/* Background radials */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 20% 50%, rgba(37,99,235,0.12) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(139,92,246,0.12) 0%, transparent 50%)",
        }}
      />

      {/* Header */}
      <div className="relative z-10 pt-16 pb-10 px-6 sm:px-10 max-w-4xl mx-auto text-center">
        <SectionHeader
          label="The Latest"
          labelColorClass=""
          title="Company News & Events"
          subtitle="Swipe through updates, events, and milestones. Click any card to read the full brief."
          centered
          dark
        />
      </div>

      {/* Carousel area */}
      <div className="relative z-10 pb-14">
        {/* Prev button */}
        <button
          onClick={() => moveCarousel(-1)}
          disabled={activeSlide === 0}
          className="hidden md:flex absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full items-center justify-center text-white border border-white/20 bg-white/10 backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <i className="ph-bold ph-caret-left text-lg" />
        </button>

        {/* Cards track */}
        <div
          ref={carouselRef}
          className="hide-scrollbar flex overflow-x-auto snap-x snap-mandatory gap-4 sm:gap-6 py-4"
          style={{ paddingLeft: "clamp(16px, 6vw, 80px)", paddingRight: "clamp(16px, 6vw, 80px)" }}
        >
          {eventData.map((event) => (
            <button
              key={event.id}
              onClick={() => setSelectedEvent(event)}
              className={`carousel-card cinema-slide snap-center shrink-0 rounded-(--r-xl) overflow-hidden flex flex-col cursor-pointer text-left ${event.slideClass}`}
              style={{ width: "clamp(280px, 80vw, 420px)" }}
            >
              {/* Poster */}
              <div 
                className="cinema-poster relative h-48 sm:h-56 w-full flex items-center justify-center overflow-hidden text-white/90 text-6xl sm:text-7xl"
                style={{ background: event.posterGradient }}
              >
                <i className={event.icon} />
              </div>

              {/* Content */}
              <div className="p-5 sm:p-7 flex flex-col grow -mt-4 relative z-2">
                <div className="cinema-tag py-1.5 px-3 rounded-full text-[0.7rem] font-extrabold uppercase inline-flex items-center gap-1.5 w-fit mb-3 text-white">
                  <i className={event.tagIcon} />
                  {event.tagLabel}
                </div>
                <h3 className="font-serif text-[1.35rem] sm:text-[1.6rem] font-bold leading-snug mb-2 text-[#f8fafc]">
                  {event.title}
                </h3>
                <p className="text-[0.85rem] sm:text-[0.92rem] text-[#94a3b8] leading-relaxed mb-5 grow">
                  {event.shortDesc}
                </p>
                <div className="pt-4 border-t border-white/8 flex justify-between items-center text-[0.8rem] font-semibold">
                  <span className="cinema-footer-date">{event.date}</span>
                  <span className="text-white/50 font-medium">{event.location}</span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Next button */}
        <button
          onClick={() => moveCarousel(1)}
          disabled={activeSlide === eventData.length - 1}
          className="hidden md:flex absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full items-center justify-center text-white border border-white/20 bg-white/10 backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <i className="ph-bold ph-caret-right text-lg" />
        </button>

        {/* Dot indicators */}
        <div className="flex justify-center items-center gap-2 mt-6">
          {eventData.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`nav-dot h-2 rounded-full cursor-pointer transition-all duration-400 ${
                activeSlide === i ? "bg-white w-7" : "bg-white/25 w-2 hover:bg-white/50"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <EventModal
        event={selectedEvent}
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </section>
  );
}
