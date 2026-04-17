"use client";

import { useState } from "react";
import type { DepartmentPageProps, DeptVideo } from "@/lib/types";
import { useLanguage } from "@/context/LanguageContext";
import { departmentTranslations } from "@/lib/translations";

const LANGS = [
  { code: "en", label: "English" },
  { code: "ja", label: "日本語" },
  { code: "ko", label: "한국어" },
];

// Reusable Member Avatar Component
function MemberAvatar({
  member,
  deptColor,
  size = "medium",
}: {
  member: { name: string; initials: string; image?: string };
  deptColor: string;
  size?: "small" | "medium" | "large";
}) {
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    small: "w-20 h-20 sm:w-16 sm:h-16 text-xl max-sm:text-base",
    medium: "w-24 h-24 sm:w-20 sm:h-20 text-2xl max-sm:text-xl",
    large: "w-32 h-32 text-5xl max-sm:w-24 max-sm:h-24 max-sm:text-3xl",
  };

  const isRounded = size === "large" ? "rounded-2xl" : "rounded-full";

  const showInitials = !member.image || imageError;

  return showInitials ? (
    <div
      className={`${sizeClasses[size]} ${isRounded} flex items-center justify-center font-extrabold font-serif shrink-0 text-white mb-4 shadow-md`}
      style={{ background: deptColor }}
    >
      {member.initials}
    </div>
  ) : (
    <img
      src={member.image}
      alt={member.name}
      onError={() => setImageError(true)}
      className={`${sizeClasses[size]} ${isRounded} object-cover shrink-0 shadow-md mb-4`}
    />
  );
}

function VideoCard({ vid, deptId, deptColor, deptRgb, onPlay }: { vid: DeptVideo; deptId: string; deptColor: string; deptRgb: string; onPlay?: () => void }) {
  const { language } = useLanguage();
  const [lang, setLang] = useState(language);

  // Get translated description based on language
  const translatedDesc = (() => {
    const langKey = lang as "EN" | "JA" | "KO";
    if (langKey === "EN") return vid.desc;
    
    const deptTranslations = videoDescriptionTranslationsByDepartment[langKey]?.[deptId];
    return deptTranslations?.[vid.title] || vid.desc;
  })();

  return (
    <div
      className="d-vid-card bg-card border border-subtle rounded-xl overflow-hidden shadow-(--shadow-sm) cursor-pointer"
      style={{ "--dept-color": deptColor, "--dept-rgb": deptRgb } as React.CSSProperties}
      onClick={() => onPlay?.()}
    >
      <div
        className="h-[200px] relative flex items-center justify-center"
        style={{ background: `rgba(${deptRgb}, 0.05)` }}
      >
        <div
          className="play-btn-dept w-16 h-16 rounded-full text-white flex items-center justify-center text-[1.5rem] z-[2] transition-transform duration-400"
          style={{ background: deptColor, boxShadow: `0 10px 20px rgba(${deptRgb}, 0.4)` }}
        >
          <i className="ph-fill ph-play" />
        </div>
      </div>
      <div className="p-6">
        <h4 className="font-serif text-[1.2rem] font-bold mb-2 text-content">{vid.title}</h4>
        <p className="text-[0.9rem] text-muted leading-snug">{translatedDesc}</p>
        <span className="text-[0.8rem] text-muted mt-3 inline-block font-mono">{vid.duration}</span>
        <div className="flex gap-2 mt-4">
          {LANGS.map((l) => (
            <button
              key={l.code}
              onClick={(e) => {
                e.stopPropagation();
                setLang(l.code as "en" | "ja" | "ko");
              }}
              className={`py-1 px-3 rounded-full text-[0.75rem] font-bold border transition-all duration-200 ${
                lang === l.code
                  ? "text-white border-transparent"
                  : "bg-inset text-muted border-subtle hover:text-content"
              }`}
              style={lang === l.code ? { background: deptColor, borderColor: deptColor } : undefined}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

const videoDescriptionTranslations: Record<"JA" | "KO", Record<string, string>> = {
  JA: {
    "End-to-end guide for handling customer inquiries.": "顧客問い合わせ対応のエンドツーエンドガイド。",
    "How to escalate and resolve complex customer issues.": "複雑な顧客課題のエスカレーションと解決方法。",
    "Managing customer records and interaction history.": "顧客記録と対応履歴の管理方法。",
    "Structure, policies, and decision-making framework.": "組織構造、方針、意思決定フレームワーク。",
    "Guidelines for investor and partner communications.": "投資家・パートナー向けコミュニケーション指針。",
    "Annual strategy cycle and department alignment.": "年間戦略サイクルと部門アラインメント。",
    "How to reserve meeting rooms and event spaces.": "会議室・イベントスペースの予約方法。",
    "Vehicle request and tracking procedures.": "車両申請と追跡手順。",
    "End-to-end procurement workflow.": "調達のエンドツーエンド業務フロー。",
    "Configure VPN, proxy settings, and internal DNS for secure access.": "安全なアクセスのためのVPN、プロキシ、社内DNS設定。",
    "Standard operating procedure for deploying new machines.": "新規端末展開の標準作業手順。",
    "Step-by-step guide for handling security incidents.": "セキュリティインシデント対応の手順ガイド。",
    "Steps for evaluating and acquiring new properties.": "新規物件の評価・取得手順。",
    "How to manage active lease agreements and renewals.": "契約中リースと更新の管理方法。",
    "Planning and execution of property development projects.": "不動産開発プロジェクトの計画と実行。",
    "Full walkthrough of Iwallet features and use cases.": "Iwalletの機能と利用ケースの完全ガイド。",
    "How to process and resolve payment disputes.": "支払い紛争の処理と解決方法。",
    "Step-by-step user onboarding for new wallet accounts.": "新規ウォレット口座のユーザーオンボーディング手順。",
    "How we scope, design, and deliver business solutions.": "業務ソリューションの要件定義、設計、提供方法。",
    "Techniques for uncovering client needs and pain points.": "顧客ニーズと課題を把握する手法。",
    "End-to-end delivery approach for solution projects.": "ソリューション案件のエンドツーエンド提供アプローチ。",
    "How Inspire Group structures joint business agreements.": "Inspire Groupにおける共同事業契約の設計方法。",
    "Steps for evaluating potential joint venture partners.": "合弁候補パートナーの評価手順。",
    "Overview of partnership revenue and profit sharing.": "提携における売上・利益分配の概要。",
    "Logo usage, color palette, and tone-of-voice standards.": "ロゴ使用、カラーパレット、トーン&マナー基準。",
    "How to plan and execute a marketing campaign.": "マーケティングキャンペーンの計画と実行方法。",
    "Content calendar, posting schedule, and engagement tips.": "コンテンツカレンダー、投稿計画、エンゲージメント向上のコツ。",
    "Overview of monthly and quarterly maintenance tasks.": "月次・四半期の保守タスク概要。",
    "How to track and report electricity, water, and HVAC usage.": "電気・水道・空調使用量の追跡と報告方法。",
    "Submitting and managing maintenance work orders.": "保守作業依頼の申請と管理方法。",
  },
  KO: {
    "End-to-end guide for handling customer inquiries.": "고객 문의 처리 전 과정을 다루는 가이드입니다.",
    "How to escalate and resolve complex customer issues.": "복잡한 고객 이슈를 에스컬레이션하고 해결하는 방법.",
    "Managing customer records and interaction history.": "고객 기록 및 상호작용 이력 관리 방법.",
    "Structure, policies, and decision-making framework.": "조직 구조, 정책, 의사결정 프레임워크.",
    "Guidelines for investor and partner communications.": "투자자 및 파트너 커뮤니케이션 가이드라인.",
    "Annual strategy cycle and department alignment.": "연간 전략 사이클 및 부서 정렬.",
    "How to reserve meeting rooms and event spaces.": "회의실 및 행사 공간 예약 방법.",
    "Vehicle request and tracking procedures.": "차량 요청 및 추적 절차.",
    "End-to-end procurement workflow.": "조달 업무의 전체 워크플로우.",
    "Configure VPN, proxy settings, and internal DNS for secure access.": "보안 접속을 위한 VPN, 프록시, 내부 DNS 설정 방법.",
    "Standard operating procedure for deploying new machines.": "신규 장비 배포를 위한 표준 운영 절차.",
    "Step-by-step guide for handling security incidents.": "보안 사고 대응 단계별 가이드.",
    "Steps for evaluating and acquiring new properties.": "신규 부동산 평가 및 취득 절차.",
    "How to manage active lease agreements and renewals.": "진행 중인 임대 계약 및 갱신 관리 방법.",
    "Planning and execution of property development projects.": "부동산 개발 프로젝트의 기획 및 실행.",
    "Full walkthrough of Iwallet features and use cases.": "Iwallet 기능과 활용 사례 전체 안내.",
    "How to process and resolve payment disputes.": "결제 분쟁 처리 및 해결 방법.",
    "Step-by-step user onboarding for new wallet accounts.": "신규 월렛 계정 사용자 온보딩 단계별 가이드.",
    "How we scope, design, and deliver business solutions.": "비즈니스 솔루션의 범위 정의, 설계, 제공 방식.",
    "Techniques for uncovering client needs and pain points.": "고객 니즈와 페인포인트를 파악하는 기법.",
    "End-to-end delivery approach for solution projects.": "솔루션 프로젝트의 엔드투엔드 전달 방식.",
    "How Inspire Group structures joint business agreements.": "Inspire Group의 공동사업 계약 구조화 방식.",
    "Steps for evaluating potential joint venture partners.": "잠재 합작 파트너 평가 절차.",
    "Overview of partnership revenue and profit sharing.": "파트너십 매출 및 이익 배분 개요.",
    "Logo usage, color palette, and tone-of-voice standards.": "로고 사용, 컬러 팔레트, 톤앤매너 기준.",
    "How to plan and execute a marketing campaign.": "마케팅 캠페인 기획 및 실행 방법.",
    "Content calendar, posting schedule, and engagement tips.": "콘텐츠 캘린더, 게시 일정, 참여도 향상 팁.",
    "Overview of monthly and quarterly maintenance tasks.": "월간 및 분기 유지보수 작업 개요.",
    "How to track and report electricity, water, and HVAC usage.": "전기, 수도, HVAC 사용량 추적 및 보고 방법.",
    "Submitting and managing maintenance work orders.": "유지보수 작업 지시 제출 및 관리 방법.",
  },
};

const videoDescriptionTranslationsByDepartment: Record<
  "EN" | "JA" | "KO",
  Record<string, Record<string, string>>
> = {
  EN: {},
  JA: {
    customer: {
      "Customer Support Process": "顧客問い合わせ対応のエンドツーエンドガイド。",
      "Escalation Procedures": "複雑な顧客課題のエスカレーションと解決方法。",
      "CRM System Overview": "顧客記録と対応履歴の管理方法。",
    },
    corporate: {
      "Corporate Governance Overview": "組織構造、方針、意思決定フレームワーク。",
      "Stakeholder Communication": "投資家・パートナー向けコミュニケーション指針。",
      "Strategic Planning Process": "年間戦略サイクルと部門アラインメント。",
    },
    admin: {
      "Facility Booking System": "会議室・イベントスペースの予約方法。",
      "Fleet Management Overview": "車両申請と追跡手順。",
      "Supply Chain Process": "調達のエンドツーエンド業務フロー。",
    },
    it: {
      "Network Setup Guide": "安全なアクセスのためのVPN、プロキシ、社内DNS設定。",
      "Workstation Imaging SOP": "新規端末展開の標準作業手順。",
      "Incident Response Protocol": "セキュリティインシデント対応の手順ガイド。",
    },
    realestate: {
      "Property Acquisition Process": "新規物件の評価・取得手順。",
      "Lease Management Guide": "契約中リースと更新の管理方法。",
      "Site Development Overview": "不動産開発プロジェクトの計画と実行。",
    },
    iwallet: {
      "Iwallet Product Overview": "Iwalletの機能と利用ケースの完全ガイド。",
      "Transaction Dispute Handling": "支払い紛争の処理と解決方法。",
      "Wallet Onboarding Flow": "新規ウォレット口座のユーザーオンボーディング手順。",
    },
    solution: {
      "Solution Design Framework": "業務ソリューションの要件定義、設計、提供方法。",
      "Client Discovery Process": "顧客ニーズと課題を把握する手法。",
      "Implementation Methodology": "ソリューション案件のエンドツーエンド提供アプローチ。",
    },
    jba: {
      "JBA Partnership Framework": "Inspire Groupにおける共同事業契約の設計方法。",
      "Due Diligence Process": "合弁候補パートナーの評価手順。",
      "Revenue Sharing Models": "提携における売上・利益分配の概要。",
    },
    marketing: {
      "Brand Guidelines Overview": "ロゴ使用、カラーパレット、トーン&マナー基準。",
      "Campaign Planning Process": "マーケティングキャンペーンの計画と実行方法。",
      "Social Media Strategy": "コンテンツカレンダー、投稿計画、エンゲージメント向上のコツ。",
    },
    utility: {
      "Preventive Maintenance Schedule": "月次・四半期の保守タスク概要。",
      "Utilities Monitoring Guide": "電気・水道・空調使用量の追跡と報告方法。",
      "Work Order System Tutorial": "保守作業依頼の申請と管理方法。",
    },
  },
  KO: {
    customer: {
      "Customer Support Process": "고객 문의 처리 전 과정을 다루는 가이드입니다.",
      "Escalation Procedures": "복잡한 고객 이슈를 에스컬레이션하고 해결하는 방법.",
      "CRM System Overview": "고객 기록 및 상호작용 이력 관리 방법.",
    },
    corporate: {
      "Corporate Governance Overview": "조직 구조, 정책, 의사결정 프레임워크.",
      "Stakeholder Communication": "투자자 및 파트너 커뮤니케이션 가이드라인.",
      "Strategic Planning Process": "연간 전략 사이클 및 부서 정렬.",
    },
    admin: {
      "Facility Booking System": "회의실 및 행사 공간 예약 방법.",
      "Fleet Management Overview": "차량 요청 및 추적 절차.",
      "Supply Chain Process": "조달 업무의 전체 워크플로우.",
    },
    it: {
      "Network Setup Guide": "보안 접속을 위한 VPN, 프록시, 내부 DNS 설정 방법.",
      "Workstation Imaging SOP": "신규 장비 배포를 위한 표준 운영 절차.",
      "Incident Response Protocol": "보안 사고 대응 단계별 가이드.",
    },
    realestate: {
      "Property Acquisition Process": "신규 부동산 평가 및 취득 절차.",
      "Lease Management Guide": "진행 중인 임대 계약 및 갱신 관리 방법.",
      "Site Development Overview": "부동산 개발 프로젝트의 기획 및 실행.",
    },
    iwallet: {
      "Iwallet Product Overview": "Iwallet 기능과 활용 사례 전체 안내.",
      "Transaction Dispute Handling": "결제 분쟁 처리 및 해결 방법.",
      "Wallet Onboarding Flow": "신규 월렛 계정 사용자 온보딩 단계별 가이드.",
    },
    solution: {
      "Solution Design Framework": "비즈니스 솔루션의 범위 정의, 설계, 제공 방식.",
      "Client Discovery Process": "고객 니즈와 페인포인트를 파악하는 기법.",
      "Implementation Methodology": "솔루션 프로젝트의 엔드투엔드 전달 방식.",
    },
    jba: {
      "JBA Partnership Framework": "Inspire Group의 공동사업 계약 구조화 방식.",
      "Due Diligence Process": "잠재 합작 파트너 평가 절차.",
      "Revenue Sharing Models": "파트너십 매출 및 이익 배분 개요.",
    },
    marketing: {
      "Brand Guidelines Overview": "로고 사용, 컬러 팔레트, 톤앤매너 기준.",
      "Campaign Planning Process": "마케팅 캠페인 기획 및 실행 방법.",
      "Social Media Strategy": "콘텐츠 캘린더, 게시 일정, 참여도 향상 팁.",
    },
    utility: {
      "Preventive Maintenance Schedule": "월간 및 분기 유지보수 작업 개요.",
      "Utilities Monitoring Guide": "전기, 수도, HVAC 사용량 추적 및 보고 방법.",
      "Work Order System Tutorial": "유지보수 작업 지시 제출 및 관리 방법.",
    },
  },
};

export default function DepartmentPage({
  department: dept,
  onBack,
}: DepartmentPageProps) {
  const { t, language } = useLanguage();
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const localized =
    departmentTranslations[language as keyof typeof departmentTranslations][
      dept.id
    ];
  const deptName = localized?.name ?? dept.name;
  const deptDesc = localized?.desc ?? dept.desc;
  return (
    <div className="bg-main min-h-screen pb-24">
      {/* Hero Banner */}
      <div
        className="dept-hero-bg pt-[180px] pb-[100px] relative overflow-hidden text-white max-md:pt-[120px] max-md:pb-[60px] max-md:rounded-none"
        style={{
          background: `linear-gradient(135deg, ${dept.color}, rgba(${dept.rgb},0.8))`,
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
        }}
      >
        <div className="relative z-[2] max-w-7xl mx-auto px-10 max-md:px-6">
          <button
            onClick={onBack}
            className="back-btn inline-flex items-center gap-2.5 text-white font-bold mb-10 bg-white/15 py-3 px-6 rounded-full backdrop-blur-[12px] border border-white/20"
          >
            <i className="ph-bold ph-arrow-left" /> {t("deptBack")}
          </button>

          <div className="flex items-center gap-6 mb-5 max-md:flex-col max-md:items-start">
            <i
              className={`${dept.icon} text-[4rem] bg-white/20 p-6 rounded-[32px] backdrop-blur-[12px] shadow-[0_10px_30px_rgba(0,0,0,0.2)] max-md:text-[3rem] max-md:p-4`}
            />
            <h1 className="font-serif text-[clamp(3rem,5vw,4.5rem)] leading-none m-0 [text-shadow:0_4px_24px_rgba(0,0,0,0.2)]">
              {deptName}
            </h1>
          </div>
          <p className="text-[1.25rem] opacity-90 leading-relaxed max-md:mt-6 text-justify">
            {dept.desc}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-10 pt-20 max-md:px-6">
        {/* Training Videos */}
        <div className="mb-20">
          <h2 className="font-serif text-[1.8rem] font-bold mb-8 flex items-center gap-4 text-content">
            <i
              className="ph-duotone ph-monitor-play text-[2.2rem]"
              style={{ color: dept.color }}
            />
            {t("deptTrainingVideos")}
          </h2>
          <div className="grid grid-cols-3 gap-7 max-lg:grid-cols-2 max-md:grid-cols-1">
            {dept.videos.map((vid) => (
              <VideoCard
                key={vid.title}
                vid={vid}
                deptId={dept.id}
                deptColor={dept.color}
                deptRgb={dept.rgb}
                onPlay={() => {
                  if (vid.url) setActiveVideoUrl(vid.url);
                  else alert("Video is not available on NAS server yet.");
                }}
              />
            ))}
          </div>
        </div>



        {/* Team */}
        <div className="mb-20">
          <h2 className="font-serif text-[1.8rem] font-bold mb-16 flex items-center gap-4 text-content">
            <i
              className="ph-duotone ph-users text-[2.2rem]"
              style={{ color: dept.color }}
            />
            {t("deptTeamMembers")}
          </h2>

          {(() => {
            const head = dept.team.filter((m) => m.head || m.role === "Head");
            const nonHeadTeam = dept.team.filter((m) => !(m.head || m.role === "Head"));
            const positions: Record<string, typeof dept.team> = {};

            nonHeadTeam.forEach((member) => {
              const roleKey =
                member.role === "Receptionist I" || member.role === "Receptionist II"
                  ? "Receptionist"
                  : member.role;

              if (!positions[roleKey]) positions[roleKey] = [];
              positions[roleKey].push(member);
            });

            return (
              <>
                {/* Head */}
                {head.length > 0 && (
                  <div className="mb-16">
                    <p className="text-[0.85rem] font-extrabold uppercase tracking-wider mb-4" style={{ color: dept.color }}>
                      Head
                    </p>
                    {head.length === 1 ? (
                      <div
                        className="flex items-center gap-8 max-sm:gap-6 p-8 max-sm:p-5 rounded-2xl border-2 transition duration-300 hover:shadow-md"
                        style={{
                          borderColor: dept.color,
                          background: `rgba(${dept.rgb}, 0.08)`,
                        }}
                      >
                        <div className="shrink-0 w-32 h-32 max-sm:w-24 max-sm:h-24">
                          <MemberAvatar member={head[0]} deptColor={dept.color} size="large" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-serif font-bold text-content text-[1.3rem] max-sm:text-[1.1rem]">
                              {head[0].name}
                            </h4>
                            <span
                              className="text-[0.65rem] py-1.5 px-3 rounded-full font-extrabold uppercase tracking-wider font-sans text-white"
                              style={{ background: dept.color }}
                            >
                              Head
                            </span>
                          </div>
                          <p className="text-[0.95rem] font-semibold" style={{ color: dept.color }}>
                            {head[0].role}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-8 max-sm:gap-6">
                        {head.map((member) => (
                          <div
                            key={member.name}
                            className="flex-1 min-w-48 flex flex-col items-center p-8 max-sm:p-6 rounded-2xl border transition duration-300 hover:shadow-md"
                            style={{
                              borderColor: `${dept.color}40`,
                              background: `rgba(${dept.rgb}, 0.05)`,
                            }}
                          >
                            <MemberAvatar member={member} deptColor={dept.color} size="medium" />
                            <h4 className="font-serif font-bold text-content text-center max-sm:text-[0.95rem] mt-4 w-full">
                              {member.name}
                            </h4>
                            <p className="text-[0.8rem] font-medium text-center max-sm:text-[0.75rem] mt-2" style={{ color: dept.color }}>
                              {member.role}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {Object.entries(positions).map(([role, members]) => (
                  <div key={role} className="mb-16">
                    <p className="text-[0.85rem] font-extrabold uppercase tracking-wider mb-4" style={{ color: dept.color }}>
                      {role === "Member" ? "Members" : role}
                    </p>
                    <div className="flex flex-wrap gap-8 max-sm:gap-6">
                      {members.map((member) => (
                        <div
                          key={member.name}
                          className="flex-1 min-w-48 flex flex-col items-center p-8 max-sm:p-6 rounded-2xl border transition duration-300 hover:shadow-md"
                          style={{
                            borderColor: `${dept.color}40`,
                            background: `rgba(${dept.rgb}, 0.05)`,
                          }}
                        >
                          <MemberAvatar member={member} deptColor={dept.color} size="medium" />
                          <h4 className="font-serif font-bold text-content text-center max-sm:text-[0.95rem] mt-4 w-full">
                            {member.name}
                          </h4>
                          <p className="text-[0.8rem] font-medium text-center max-sm:text-[0.75rem] mt-2" style={{ color: dept.color }}>
                            {member.role}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

              </>
            );
          })()}
        </div>

        {/* Repositories */}
        {dept.repos && dept.repos.length > 0 && (
          <div className="mb-20">
            <h2 className="font-serif text-[1.8rem] font-bold mb-8 flex items-center gap-4 text-content">
              <i
                className="ph-duotone ph-git-branch text-[2.2rem]"
                style={{ color: dept.color }}
              />
              {t("deptRepositories")}
            </h2>
            <div className="grid grid-cols-2 gap-5 max-lg:grid-cols-1">
              {dept.repos.map((repo) => (
                <a
                  key={repo.name}
                  href={repo.url ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="repo-card bg-card border border-subtle rounded-lg p-6 shadow-(--shadow-sm) flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-(--shadow-md) hover:border-[var(--dept-color-border)]"
                  style={{ "--dept-color": dept.color } as React.CSSProperties}
                >
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="font-mono text-[1.05rem] font-semibold flex items-center gap-2.5 text-content">
                      <i className="ph-duotone ph-git-branch shrink-0" style={{ color: dept.color }} />
                      {repo.name}
                    </h4>
                    <i className="ph-bold ph-arrow-square-out text-muted text-[1rem] shrink-0 mt-0.5" />
                  </div>
                  <p className="text-[0.9rem] text-muted leading-relaxed flex-1">{repo.desc}</p>
                  {repo.envs && repo.envs.length > 0 ? (
                    <div className="flex gap-2 flex-wrap">
                      {repo.envs.map((env) => (
                        <span
                          key={env}
                          className={`font-mono text-[0.75rem] py-1 px-2.5 rounded-md font-semibold ${
                            env === "prod"
                              ? "bg-inspire-green/10 text-inspire-green border border-inspire-green/20"
                              : "bg-inspire-yellow/10 text-inspire-yellow border border-inspire-yellow/20"
                          }`}
                        >
                          {env}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Env Files */}
        {dept.envFiles && dept.envFiles.length > 0 && (
          <div className="mb-20">
            <h2 className="font-serif text-[1.8rem] font-bold mb-8 flex items-center gap-4 text-content">
              <i
                className="ph-duotone ph-file-lock text-[2.2rem]"
                style={{ color: dept.color }}
              />
              {t("deptEnvironmentFiles")}
            </h2>
            {dept.envFiles.map((file) => (
              <a
                key={file.name}
                href="#"
                download
                className="doc-row flex items-center gap-5 py-5 px-8 bg-card border border-subtle rounded-lg mb-4 shadow-(--shadow-xs) max-md:flex-wrap transition-all duration-300 hover:-translate-y-0.5 hover:shadow-(--shadow-sm)"
                style={{ "--dept-color": dept.color, "--dept-rgb": dept.rgb } as React.CSSProperties}
              >
                <div
                  className="w-[54px] h-[54px] rounded-2xl flex items-center justify-center text-[1.5rem] shrink-0"
                  style={{ background: `rgba(${dept.rgb}, 0.1)`, color: dept.color }}
                >
                  <i className="ph-duotone ph-file-txt" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-mono text-[1.05rem] font-semibold mb-1 text-content">{file.name}</h4>
                  <p className="text-[0.9rem] text-muted leading-snug">{file.desc}</p>
                </div>
                <span className="text-[0.8rem] text-muted font-mono shrink-0">{file.size} &middot; TXT</span>
                <span className="py-2.5 px-6 bg-inset text-content font-bold rounded-full text-[0.9rem] border border-subtle whitespace-nowrap shrink-0 transition-all duration-300 flex items-center gap-2">
                  <i className="ph-bold ph-download-simple" /> {t("commonDownload")}
                </span>
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Video Modal Overlay */}
      {activeVideoUrl && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
            <button
              onClick={() => setActiveVideoUrl(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors border border-white/20"
            >
              <i className="ph-bold ph-x text-xl" />
            </button>
            <video
              controls
              autoPlay
              className="w-full h-full object-contain"
              src={activeVideoUrl}
            />
          </div>
        </div>
      )}
    </div>
  );
}
