"use client";

import { useState } from "react";
import type { DeptVideo } from "@/lib/types";
import { useLanguage } from "@/context/LanguageContext";

const LANGS = [
  { code: "en", label: "English" },
  { code: "ja", label: "日本語" },
  { code: "ko", label: "한국어" },
];

const videoTranslations: Record<"ja" | "ko", Record<string, Record<string, string>>> = {
  ja: {
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
    sales: {
      "Preventive Maintenance Schedule": "月次・四半期の保守タスク概要。",
      "Utilities Monitoring Guide": "電気・水道・空調使用量の追跡と報告方法。",
      "Work Order System Tutorial": "保守作業依頼の申請と管理方法。",
    },
  },
  ko: {
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
    sales: {
      "Preventive Maintenance Schedule": "월간 및 분기 유지보수 작업 개요.",
      "Utilities Monitoring Guide": "전기, 수도, HVAC 사용량 추적 및 보고 방법.",
      "Work Order System Tutorial": "유지보수 작업 지시 제출 및 관리 방법.",
    },
  },
};

export default function VideoCard({
  vid,
  deptId,
  deptColor,
  deptRgb,
  onPlay,
}: {
  vid: DeptVideo;
  deptId: string;
  deptColor: string;
  deptRgb: string;
  onPlay?: () => void;
}) {
  const { language } = useLanguage();
  const [lang, setLang] = useState(language);

  const translatedDesc = (() => {
    if (lang === "en") return vid.desc;
    const deptTrans = videoTranslations[lang as "ja" | "ko"]?.[deptId];
    return deptTrans?.[vid.title] ?? vid.desc;
  })();

  return (
    <div
      className="bg-card border border-subtle rounded-xl overflow-hidden shadow-(--shadow-sm) cursor-pointer"
      style={{ "--dept-color": deptColor, "--dept-rgb": deptRgb } as React.CSSProperties}
      onClick={() => onPlay?.()}
    >
      <div
        className="h-[200px] relative flex items-center justify-center"
        style={{ background: `rgba(${deptRgb}, 0.05)` }}
      >
        <div
          className="w-16 h-16 rounded-full text-white flex items-center justify-center text-[1.5rem] z-[2] transition-transform duration-400 hover:scale-110"
          style={{ background: deptColor, boxShadow: `0 10px 20px rgba(${deptRgb}, 0.4)` }}
        >
          <i className="ph-fill ph-play" />
        </div>
      </div>
      <div className="p-6">
        <h4 className="font-serif text-[1.2rem] font-bold mb-2 text-content">{vid.title}</h4>
        <p className="text-[0.9rem] text-muted leading-snug">{translatedDesc}</p>
        <span className="text-[0.8rem] text-muted mt-3 inline-block font-mono">{vid.duration}</span>
        <div className="flex gap-2 mt-4 flex-wrap">
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
