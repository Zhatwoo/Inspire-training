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
              className={`carousel-card cinema-slide snap-center shrink-0 rounded-(--r-xl) overflow-hidden flex flex-col cursor-pointer text-left ${event.slideClass}`}
              style={{ width: "clamp(280px, 80vw, 420px)" }}
            >
              {/* Poster */}
              <div className="cinema-poster relative h-48 sm:h-56 w-full flex items-center justify-center overflow-hidden text-white/90 text-6xl sm:text-7xl">
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
      title: "Annual Summit 2026",
      shortDesc: "Join us for keynotes, workshops, and team-building across three full days.",
      fullDesc:
        "The Annual Inspire Summit brings together all departments for a three-day event featuring keynote speeches from leadership, interactive workshops on emerging technologies, cross-department collaboration sessions, and team-building activities designed to strengthen our organizational culture.",
      date: "March 28, 2026",
      location: "Grand Plaza",
    },
    event2: {
      tagLabel: "Update",
      title: "Hybrid Work Policy",
      shortDesc: "We're officially rolling out a flexible hybrid model. Review the new guidelines.",
      fullDesc:
        "Beginning April 2026, Inspire Group will officially adopt a hybrid work model. Employees may work remotely up to 3 days per week with manager approval. Updated guidelines covering equipment allowances, communication protocols, and performance expectations are now available in the HR portal.",
      date: "March 22, 2026",
      location: "All Departments",
    },
    event3: {
      tagLabel: "Award",
      title: "Employee Spotlight",
      shortDesc: "Congratulations to the IT Department for the successful launch of Iwallet v3.",
      fullDesc:
        "The IT Department has been recognized for the successful launch of Iwallet v3, our next-generation digital payment platform. The team completed the project 2 weeks ahead of schedule while maintaining zero critical bugs in production. Congratulations to the entire team!",
      date: "March 18, 2026",
      location: "IT Department",
    },
    event4: {
      tagLabel: "Advisory",
      title: "System Maintenance",
      shortDesc: "Portal and dev servers will undergo scheduled maintenance this weekend.",
      fullDesc:
        "Scheduled maintenance will affect the Employee Portal, development servers, and internal APIs this weekend (March 15-16). Expected downtime is 4 hours starting at 10:00 PM PHT Saturday. All critical services will have failover systems active. Please save your work and plan accordingly.",
      date: "March 15, 2026",
      location: "Infrastructure",
    },
  },
  ja: {
    event1: {
      tagLabel: "イベント",
      title: "Annual Summit 2026",
      shortDesc: "基調講演、ワークショップ、チームビルディングを3日間にわたり実施します。",
      fullDesc:
        "Inspire年次サミットでは、全部門が集まり3日間のプログラムを実施します。経営陣の基調講演、先端技術に関するワークショップ、部門横断の協業セッション、組織文化を強化するチームビルディング活動を行います。",
      date: "2026年3月28日",
      location: "グランドプラザ",
    },
    event2: {
      tagLabel: "更新",
      title: "Hybrid Work Policy",
      shortDesc: "柔軟なハイブリッド勤務モデルを正式導入します。新ガイドラインをご確認ください。",
      fullDesc:
        "2026年4月より、Inspire Groupはハイブリッド勤務モデルを正式導入します。上長承認のもと週3日まで在宅勤務が可能です。機材手当、連絡ルール、評価基準を含む最新ガイドラインはHRポータルで確認できます。",
      date: "2026年3月22日",
      location: "全部門",
    },
    event3: {
      tagLabel: "表彰",
      title: "Employee Spotlight",
      shortDesc: "IT部門のIwallet v3成功リリースを祝福します。",
      fullDesc:
        "IT部門は次世代決済プラットフォームIwallet v3の成功リリースにより表彰されました。チームは予定より2週間早くプロジェクトを完了し、本番環境で重大バグゼロを達成しました。素晴らしい成果です。",
      date: "2026年3月18日",
      location: "IT部門",
    },
    event4: {
      tagLabel: "お知らせ",
      title: "System Maintenance",
      shortDesc: "今週末にポータルと開発サーバーの定期メンテナンスを実施します。",
      fullDesc:
        "今週末（3月15日-16日）、社員ポータル、開発サーバー、社内APIに対する定期メンテナンスを実施します。停止時間は土曜日22:00（PHT）開始で約4時間を予定しています。重要サービスにはフェイルオーバー構成を適用しています。事前に作業保存をお願いします。",
      date: "2026年3月15日",
      location: "インフラ",
    },
  },
  ko: {
    event1: {
      tagLabel: "이벤트",
      title: "Annual Summit 2026",
      shortDesc: "기조연설, 워크숍, 팀 빌딩 프로그램이 3일간 진행됩니다.",
      fullDesc:
        "연례 Inspire 서밋은 전 부서가 모여 3일간 진행되는 행사입니다. 경영진의 기조연설, 신기술 워크숍, 부서 간 협업 세션, 조직 문화를 강화하는 팀 빌딩 활동으로 구성됩니다.",
      date: "2026년 3월 28일",
      location: "그랜드 플라자",
    },
    event2: {
      tagLabel: "업데이트",
      title: "Hybrid Work Policy",
      shortDesc: "유연한 하이브리드 근무 모델을 공식 도입합니다. 새 가이드라인을 확인하세요.",
      fullDesc:
        "2026년 4월부터 Inspire Group은 하이브리드 근무 모델을 공식 도입합니다. 관리자 승인 시 주 3일까지 원격 근무가 가능합니다. 장비 지원, 커뮤니케이션 규칙, 성과 기대치가 포함된 최신 가이드라인은 HR 포털에서 확인할 수 있습니다.",
      date: "2026년 3월 22일",
      location: "전체 부서",
    },
    event3: {
      tagLabel: "수상",
      title: "Employee Spotlight",
      shortDesc: "Iwallet v3를 성공적으로 출시한 IT 부서에 축하를 전합니다.",
      fullDesc:
        "IT 부서는 차세대 디지털 결제 플랫폼 Iwallet v3의 성공적인 출시로 표창을 받았습니다. 팀은 일정보다 2주 빠르게 프로젝트를 완료했고, 운영 환경에서 치명적 버그 0건을 유지했습니다. 팀 전체에 축하를 보냅니다.",
      date: "2026년 3월 18일",
      location: "IT 부서",
    },
    event4: {
      tagLabel: "안내",
      title: "System Maintenance",
      shortDesc: "이번 주말 포털 및 개발 서버 정기 점검이 진행됩니다.",
      fullDesc:
        "이번 주말(3월 15-16일) 직원 포털, 개발 서버, 내부 API에 대한 정기 점검이 진행됩니다. 예상 중단 시간은 토요일 PHT 기준 오후 10시 시작 약 4시간입니다. 핵심 서비스에는 페일오버 시스템이 적용됩니다. 작업을 미리 저장해 주세요.",
      date: "2026년 3월 15일",
      location: "인프라",
    },
  },
};
