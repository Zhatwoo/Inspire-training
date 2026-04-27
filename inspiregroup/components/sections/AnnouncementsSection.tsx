"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import EventModal from "@/components/modals/EventModal";
import { eventData } from "@/lib/data";
import { useLanguage } from "@/context/LanguageContext";
import type { EventData } from "@/lib/types";

export default function AnnouncementsSection() {
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);
  const { t, language } = useLanguage();
  const localizedEvents = eventData.map((event) => ({
    ...event,
    ...announcementContent[language][event.id],
  }));

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
    const next = Math.max(0, Math.min(localizedEvents.length - 1, activeSlide + dir));
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
      style={{ background: "#07121e", color: "#fff", margin: "0 20px", borderRadius: "var(--r-xl)" }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 20% 50%, rgba(37,99,235,0.18) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(139,92,246,0.16) 0%, transparent 45%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-full"
          style={{
            background: "linear-gradient(180deg, transparent 45%, rgba(7,18,30,0.95) 100%)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-[220px] md:h-[260px] pointer-events-none">
          <div className="absolute left-[10%] bottom-0 w-16 h-24 rounded-t-lg bg-white/10" />
          <div className="absolute left-[20%] bottom-0 w-10 h-16 rounded-t-lg bg-white/10" />
          <div className="absolute left-[30%] bottom-0 w-14 h-32 rounded-t-lg bg-white/10" />
          <div className="absolute left-[45%] bottom-0 w-12 h-20 rounded-t-lg bg-white/10" />
          <div className="absolute left-[58%] bottom-0 w-20 h-28 rounded-t-lg bg-white/10" />
          <div className="absolute left-[70%] bottom-0 w-14 h-24 rounded-t-lg bg-white/10" />
          <div className="absolute left-[82%] bottom-0 w-10 h-18 rounded-t-lg bg-white/10" />
        </div>
      </div>

      {/* Header */}
      <div className="relative z-10 pt-16 pb-10 px-6 sm:px-10 max-w-4xl mx-auto text-center">
        <SectionHeader
          label={t("annLabel")}
          labelColorClass=""
          title={t("annTitle")}
          subtitle={t("annSubtitle")}
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
          {localizedEvents.map((event) => (
            <button
              key={event.id}
              onClick={() => setSelectedEvent(event)}
              className={`carousel-card cinema-slide snap-center shrink-0 rounded-[var(--r-xl)] overflow-hidden flex flex-col cursor-pointer text-left ${event.slideClass}`}
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
              <div className="p-5 sm:p-7 flex flex-col grow -mt-4 relative z-10">
                <div className="cinema-tag py-1.5 px-3 rounded-full text-[0.7rem] font-extrabold uppercase inline-flex items-center gap-1.5 w-fit mb-3 text-white">
                  <i className={event.tagIcon} />
                  {event.tagLabel}
                </div>
                <h3 className="font-serif text-[1.35rem] sm:text-[1.6rem] font-bold leading-snug mb-2 text-[#f8fafc]">
                  {event.title}
                </h3>
                <p className="text-[0.85rem] sm:text-[0.92rem] text-[#cbd5e1] leading-relaxed mb-5 grow">
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
          disabled={activeSlide === localizedEvents.length - 1}
          className="hidden md:flex absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full items-center justify-center text-white border border-white/20 bg-white/10 backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <i className="ph-bold ph-caret-right text-lg" />
        </button>

        {/* Dot indicators */}
        <div className="flex justify-center items-center gap-2 mt-6">
          {localizedEvents.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`nav-dot h-2 rounded-full cursor-pointer transition-all duration-400 ${
                activeSlide === i ? "bg-white w-7" : "bg-white/25 w-2 hover:bg-white/50"
              }`}
              aria-label={`${t("annGoToSlide")} ${i + 1}`}
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

type EventLocale = Pick<EventData, "tagLabel" | "title" | "shortDesc" | "fullDesc" | "date" | "location">;

const announcementContent: Record<"en" | "ja" | "ko", Record<string, EventLocale>> = {
  en: {
    event1: {
      tagLabel: "Event",
      title: "MS Valentines 2026",
      shortDesc: "Celebrate love and unity across all departments with special activities and surprises.",
      fullDesc:
        "MS Valentines 2026 is a special celebration bringing together all departments to recognize love, friendship, and camaraderie in the workplace. Join us for exciting activities, team bonding, and heartfelt moments with colleagues. This all-department event promises fun, laughter, and strengthened relationships across Inspire Group.",
      date: "February 14, 2026",
      location: "All Departments",
    },
    event2: {
      tagLabel: "Event",
      title: "Girl Power Empowerment Month",
      shortDesc: "A celebration dedicated to empowering and recognizing the women of Inspire Group.",
      fullDesc:
        "The Girl Power Empowerment event celebrates the strength, achievements, and contributions of all women across Inspire Group. Featuring inspiring talks, networking sessions, and recognition ceremonies for outstanding female leaders and team members. This all-department celebration aims to foster inclusivity and highlight the vital role of women in our organization.",
      date: "March 8, 2026",
      location: "All Departments",
    },
    event3: {
      tagLabel: "Update",
      title: "Success Collaboration with UnionBank",
      shortDesc: "Inspire Group successfully collaborates with UnionBank for enhanced financial services.",
      fullDesc:
        "We're thrilled to announce the successful collaboration between Inspire Group and UnionBank! This strategic partnership enables our employees and clients to access a comprehensive suite of banking services, including digital payment solutions, investment products, and credit facilities. The collaboration strengthens our commitment to financial inclusion and innovation within the organization.",
      date: "April 1, 2026",
      location: "All Departments",
    },
    event4: {
      tagLabel: "Event",
      title: "Halloween 2025",
      shortDesc: "Join us for a spooktacular celebration with all departments in festive costumes and activities.",
      fullDesc:
        "The Annual Halloween Party is back! All departments are invited to celebrate with creative costumes, themed decorations, and exciting activities. Expect costume contests, Halloween games, special treats, and a festive atmosphere throughout the office. Come dressed to impress and make this Halloween unforgettable with your colleagues!",
      date: "October 31, 2025",
      location: "All Departments",
    },
    event5: {
      tagLabel: "Event",
      title: "Year End Party 2025",
      shortDesc: "Celebrate the year's achievements and welcome the new year with all departments.",
      fullDesc:
        "The Year End Party 2025 is our biggest celebration of the year! All departments come together to celebrate our accomplishments, recognize outstanding contributions, and ring in the new year. Expect fine dining, entertainment, awards ceremony, and an atmosphere of camaraderie and appreciation. Join us for an unforgettable evening of celebration and gratitude.",
      date: "December 20, 2025",
      location: "All Departments",
    },
  },
  ja: {
    event1: {
      tagLabel: "イベント",
      title: "MS Valentines 2026",
      shortDesc: "全部門で特別なアクティビティとサプライズを楽しみ、愛と団結を祝います。",
      fullDesc:
        "MS Valentines 2026では、全部門が集まり友情と職場の絆を祝いながら、特別なアクティビティやチームビルディングを行います。思い出に残るひとときを同僚と共有しましょう。",
      date: "2026年2月14日",
      location: "全部門",
    },
    event2: {
      tagLabel: "イベント",
      title: "Girl Power Empowerment Month",
      shortDesc: "Inspire Groupの女性をたたえ、エンパワーメントを推進するイベントです。",
      fullDesc:
        "Girl Power Empowermentでは、Inspire Groupの女性の強さと成果を称え、インスピレーションあふれるトークやネットワーキング、表彰セレモニーを通じて包摂性を高めます。",
      date: "2026年3月8日",
      location: "全部門",
    },
    event3: {
      tagLabel: "更新",
      title: "Success Collaboration with UnionBank",
      shortDesc: "Inspire GroupとUnionBankの戦略的な協業を発表します。",
      fullDesc:
        "Inspire GroupはUnionBankと協力し、従業員と顧客にデジタル決済や投資商品、クレジットサービスを提供します。このパートナーシップは金融包摂とイノベーションを強化します。",
      date: "2026年4月1日",
      location: "全部門",
    },
    event4: {
      tagLabel: "イベント",
      title: "Halloween 2025",
      shortDesc: "仮装と楽しいアクティビティで盛り上がるハロウィンパーティーです。",
      fullDesc:
        "Annual Halloween Partyが帰ってきました！全部門が参加し、コスチュームコンテストやハロウィンゲーム、特別なお菓子を楽しみます。",
      date: "2025年10月31日",
      location: "全部門",
    },
    event5: {
      tagLabel: "イベント",
      title: "Year End Party 2025",
      shortDesc: "1年の成果を祝う大晦日のパーティーです。",
      fullDesc:
        "Year End Party 2025では、全部門が1年の成果を称え、エンターテインメントと感謝に満ちた夜を共に過ごします。",
      date: "2025年12月20日",
      location: "全部門",
    },
  },
  ko: {
    event1: {
      tagLabel: "이벤트",
      title: "MS Valentines 2026",
      shortDesc: "전체 부서가 함께 사랑과 단합을 축하하는 특별한 활동입니다.",
      fullDesc:
        "MS Valentines 2026는 전 부서를 하나로 모아 우정과 직장 내 동료애를 기념하는 행사입니다. 즐거운 활동과 팀 결속의 순간을 함께하세요.",
      date: "2026년 2월 14일",
      location: "전체 부서",
    },
    event2: {
      tagLabel: "이벤트",
      title: "Girl Power Empowerment Month",
      shortDesc: "Inspire Group 여성들을 응원하고 기념하는 행사입니다.",
      fullDesc:
        "Girl Power Empowerment는 여성들의 강점과 성취를 기념하는 자리입니다. 영감을 주는 연설, 네트워킹 세션, 뛰어난 여성 리더에 대한 시상식이 포함됩니다.",
      date: "2026년 3월 8일",
      location: "전체 부서",
    },
    event3: {
      tagLabel: "업데이트",
      title: "Success Collaboration with UnionBank",
      shortDesc: "Inspire Group과 UnionBank의 성공적인 협업을 발표합니다.",
      fullDesc:
        "Inspire Group은 UnionBank와 협력하여 디지털 결제, 투자 상품, 신용 서비스를 제공하게 되었습니다. 이 파트너십은 금융 포용과 혁신을 강화합니다.",
      date: "2026년 4월 1일",
      location: "전체 부서",
    },
    event4: {
      tagLabel: "이벤트",
      title: "Halloween 2025",
      shortDesc: "코스튬과 재미있는 활동이 가득한 할로윈 파티입니다.",
      fullDesc:
        "Annual Halloween Party가 돌아왔습니다! 전체 부서가 함께 코스튬 대회, 할로윈 게임, 특별 간식을 즐기며 축제를 만끽합니다.",
      date: "2025년 10월 31일",
      location: "전체 부서",
    },
    event5: {
      tagLabel: "이벤트",
      title: "Year End Party 2025",
      shortDesc: "연말 성과를 축하하는 특별한 파티입니다.",
      fullDesc:
        "Year End Party 2025에서는 전체 부서가 함께 1년의 성과를 축하하고 새로운 한 해를 맞이하는 축제 분위기를 즐깁니다.",
      date: "2025년 12월 20일",
      location: "전체 부서",
    },
  },
};
