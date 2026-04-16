"use client";

import { useState } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import { useFadeIn } from "@/hooks/useFadeIn";
import { philippineLawData } from "@/lib/data";
import PhilippineLawModal from "@/components/modals/PhilippineLawModal";
import type { PhilippineLawData } from "@/lib/types";

export default function BulletinSection() {
  const { ref, isVisible } = useFadeIn();
  const [selectedLaw, setSelectedLaw] = useState<PhilippineLawData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenLawModal = (law: PhilippineLawData) => {
    setSelectedLaw(law);
    setIsModalOpen(true);
  };

  const handleCloseLawModal = () => {
    setIsModalOpen(false);
    setSelectedLaw(null);
  };

  return (
    <section
      id="bulletin"
      className="py-30 relative z-1 bg-elevated border-t border-subtle"
    >
      <div className="max-w-7xl mx-auto px-10 max-md:px-6">
        <SectionHeader
          label={t("bulletinLabel")}
          labelColorClass="lbl-orange"
          title={t("bulletinTitle")}
          subtitle={t("bulletinSubtitle")}
          centered
        />

        <div
          ref={ref}
          className={`grid grid-cols-2 gap-8 max-lg:grid-cols-1 transition-all duration-800 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Card 1: Office Guidelines */}
          <div className="bulletin-card bg-card border border-subtle rounded-xl overflow-hidden shadow-(--shadow-sm) flex flex-col">
            <div className="p-8 pb-6 flex items-center gap-4 border-b border-subtle bg-inset">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-[1.6rem] shrink-0 text-white shadow-(--shadow-md) bg-inspire-green">
                <i className="ph-duotone ph-shield-check" />
              </div>
              <div>
                <h3 className="font-serif text-[1.4rem] font-bold text-content">
                  {content.officeTitle}
                </h3>
                <p className="text-[0.9rem] text-muted mt-1">
                  {content.officeSubtitle}
                </p>
              </div>
            </div>
            <div className="p-8 grow">
              <div className="flex flex-col gap-4">
                {content.officeRules.map((rule) => (
                  <RuleItem key={rule.text} type={rule.type} icon={rule.icon} text={rule.text} />
                ))}
              </div>
            </div>
          </div>

          {/* Card 2: Dress Code */}
          <div className="bulletin-card bg-card border border-subtle rounded-xl overflow-hidden shadow-(--shadow-sm) flex flex-col">
            <div className="p-8 pb-6 max-md:p-6 max-md:pb-4 flex items-center gap-4 border-b border-subtle bg-inset">
              <div className="w-14 h-14 max-md:w-12 max-md:h-12 rounded-2xl flex items-center justify-center text-[1.6rem] max-md:text-[1.3rem] shrink-0 text-white shadow-(--shadow-md) bg-inspire-blue">
                <i className="ph-duotone ph-t-shirt" />
              </div>
              <div>
                <h3 className="font-serif text-[1.4rem] max-md:text-[1.1rem] font-bold text-content">
                  Dress Code
                </h3>
                <p className="text-[0.9rem] max-md:text-[0.8rem] text-muted mt-1">
                  Attire Standards
                </p>
              </div>
            </div>
            <div className="p-8 max-md:p-6 grow">
              <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
                <AttireItem icon="ph-duotone ph-calendar-blank" title="Mon & Thu" subtitle="Employees" desc="White polo + Brown jacket (Company)" />
                <AttireItem icon="ph-duotone ph-palette" title="Tuesday" subtitle="Employees" desc="Red polo (Company)" />
                <AttireItem icon="ph-duotone ph-t-shirt" title="Wednesday" subtitle="Employees" desc="Gray polo or uniform (Company)" />
                <AttireItem icon="ph-duotone ph-briefcase" title="All Days" subtitle="OJT Trainees" desc="Formal business attire" />
              </div>
            </div>
          </div>

          {/* Card 3: Philippine Laws and Regulations */}
          <div className="bulletin-card bg-card border border-subtle rounded-xl overflow-hidden shadow-(--shadow-sm) flex flex-col">
            <div className="p-8 pb-6 flex items-center gap-4 border-b border-subtle bg-inset">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-[1.6rem] shrink-0 text-white shadow-(--shadow-md) bg-inspire-purple">
                <i className="ph-duotone ph-scroll" />
              </div>
              <div>
                <h3 className="font-serif text-[1.4rem] font-bold text-content">
                  Philippine Laws &amp; Regulations
                </h3>
                <p className="text-[0.9rem] text-muted mt-1">{content.policiesSubtitle}</p>
              </div>
            </div>
            <div className="p-8 grow">
              <div className="flex flex-col gap-3">
                {philippineLawData.map((law) => (
                  <div
                    key={law.id}
                    onClick={() => handleOpenLawModal(law)}
                    className="policy-item flex items-center gap-4 py-4 px-5 bg-inset border border-subtle rounded-md text-[0.95rem] font-semibold cursor-pointer text-content hover:bg-card transition-colors duration-200"
                  >
                    <i className={`${law.icon} text-[1.4rem] shrink-0`} style={{ color: law.color }} />
                    <div className="flex-1">
                      <p className="text-[0.9rem]">RA {law.num}</p>
                      <p className="text-[0.85rem] text-muted font-normal">{law.name}</p>
                    </div>
                    <i className="ph-bold ph-caret-right text-muted text-[0.9rem]" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 4: ID Requirements */}
          <div className="bulletin-card bg-card border border-subtle rounded-xl overflow-hidden shadow-(--shadow-sm) flex flex-col">
            <div className="p-8 pb-6 max-md:p-6 max-md:pb-4 flex items-center gap-4 border-b border-subtle bg-inset">
              <div className="w-14 h-14 max-md:w-12 max-md:h-12 rounded-2xl flex items-center justify-center text-[1.6rem] max-md:text-[1.3rem] shrink-0 text-white shadow-(--shadow-md) bg-inspire-teal">
                <i className="ph-duotone ph-identification-badge" />
              </div>
              <div>
                <h3 className="font-serif text-[1.4rem] max-md:text-[1.1rem] font-bold text-content">
                  ID Requirements
                </h3>
                <p className="text-[0.9rem] max-md:text-[0.8rem] text-muted mt-1">Security Policy</p>
              </div>
            </div>
            <div className="p-8 max-md:p-6 grow">
              <div className="flex flex-col gap-4">
                <RuleItem type="do" icon="ph-bold ph-check-circle" text="Wear your official company ID at all times in office" />
                <RuleItem type="do" icon="ph-bold ph-check-circle" text="Display ID visibly on your person at all times" />
                <RuleItem type="do" icon="ph-bold ph-check-circle" text="Applies to all employees and OJT trainees" />
                <RuleItem type="dont" icon="ph-bold ph-prohibit" text="NO ID, NO ENTRY policy is strictly enforced" />
                <RuleItem type="dont" icon="ph-bold ph-prohibit" text="Forgotten IDs are not excused under any circumstances" />
                <RuleItem type="do" icon="ph-bold ph-check-circle" text="Ensures security, identification, and workplace safety" />
              </div>
            </div>
          </div>

          {/* Card 5: New Work Schedule */}
          <div className="bulletin-card bg-card border border-subtle rounded-xl overflow-hidden shadow-(--shadow-sm) flex flex-col col-span-2 max-lg:col-span-1">
            <div className="p-8 pb-6 flex items-center gap-4 border-b border-subtle bg-inset max-md:p-6">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-[1.6rem] shrink-0 text-white shadow-(--shadow-md) bg-inspire-orange max-md:w-12 max-md:h-12 max-md:text-[1.3rem]">
                <i className="ph-duotone ph-clock" />
              </div>
              <div>
                <h3 className="font-serif text-[1.4rem] font-bold text-content max-md:text-[1.1rem]">
                  New Work Schedule
                </h3>
                <p className="text-[0.9rem] text-muted mt-1 max-md:text-[0.8rem]">Effective April 16, 2026</p>
              </div>
            </div>
            <div className="p-8 grow max-md:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-md:gap-4">
                {/* Left Column */}
                <div className="flex flex-col gap-5">
                  <ScheduleItem label="Morning Assembly" time="7:45 AM (Sharp)" icon="ph-duotone ph-users-three" />
                  <ScheduleItem label="Working Hours" time="8:00 AM - 5:00 PM" icon="ph-duotone ph-briefcase" />
                </div>

                {/* Right Column */}
                <div className="flex flex-col gap-5">
                  <div className="border-t md:border-t-0 md:border-l border-subtle pt-5 md:pt-0 md:pl-6">
                    <p className="text-[0.85rem] font-bold text-content mb-4">Break Time Schedule:</p>
                    <div className="flex flex-col gap-3">
                      <BreakItem role="OJT Trainees" time="11:00 AM - 12:00 NN" />
                      <BreakItem role="Back Office" time="12:00 NN - 1:00 PM" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Section */}
              <div className="border-t border-subtle mt-6 pt-6 max-md:mt-4 max-md:pt-4">
                <div className="flex flex-col gap-3">
                  <RuleItem type="do" icon="ph-bold ph-check-circle" text="Applies to: Marketing, Corporate, Reception, Admin, Joint Venture (JV), IT" />
                  <RuleItem type="do" icon="ph-bold ph-check-circle" text="Observe punctuality and discipline at all times" />
                  <RuleItem type="do" icon="ph-bold ph-check-circle" text="Managers may follow different schedule per operations" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Philippine Law Modal */}
      <PhilippineLawModal
        law={selectedLaw}
        isOpen={isModalOpen}
        onClose={handleCloseLawModal}
      />
    </section>
  );
}

type BulletinRule = {
  type: "do" | "dont";
  icon: string;
  text: string;
};

type BulletinAttire = {
  icon: string;
  title: string;
  subtitle: string;
  desc: string;
};

type BulletinPolicy = {
  icon: string;
  color: string;
  text: string;
};

const bulletinContent = {
  en: {
    officeTitle: "Office Guidelines",
    officeSubtitle: "Do's & Don'ts",
    officeRules: [
      { type: "do", icon: "ph-bold ph-check-circle", text: "Maintain a clean and organized workspace" },
      { type: "do", icon: "ph-bold ph-check-circle", text: "Use official communication channels" },
      { type: "dont", icon: "ph-bold ph-prohibit", text: "Use company resources for personal tasks" },
      { type: "dont", icon: "ph-bold ph-prohibit", text: "Share credentials or access cards" },
      { type: "do", icon: "ph-bold ph-check-circle", text: "Report safety concerns immediately" },
      { type: "dont", icon: "ph-bold ph-prohibit", text: "Bypass security protocols" },
    ] as BulletinRule[],
    dressTitle: "Dress Code",
    dressSubtitle: "Attire Standards",
    attireItems: [
      { icon: "ph-duotone ph-briefcase", title: "Business Days", subtitle: "Mon-Thu", desc: "Formal business attire" },
      { icon: "ph-duotone ph-sun-horizon", title: "Casual Friday", subtitle: "", desc: "Smart casual, polo shirts OK" },
      { icon: "ph-duotone ph-handshake", title: "Client Meetings", subtitle: "", desc: "Full formal, blazer required" },
      { icon: "ph-duotone ph-shooting-star", title: "Company Events", subtitle: "", desc: "Themed or business casual" },
    ] as BulletinAttire[],
    policiesTitle: "Key Policies",
    policiesSubtitle: "Compliance Hub",
    policies: [
      { icon: "ph-duotone ph-file-text", color: "var(--inspire-blue)", text: "Data Privacy & Protection Policy" },
      { icon: "ph-duotone ph-lock-key", color: "var(--inspire-red)", text: "Anti-Harassment & Safe Workplace" },
      { icon: "ph-duotone ph-globe-simple", color: "var(--inspire-green)", text: "Remote Work Agreement Terms" },
      { icon: "ph-duotone ph-laptop", color: "var(--inspire-purple)", text: "IT Acceptable Use Policy" },
      { icon: "ph-duotone ph-airplane", color: "var(--inspire-orange)", text: "Travel & Expense Guidelines" },
      { icon: "ph-duotone ph-scales", color: "var(--inspire-teal)", text: "Code of Ethics & Conduct" },
    ] as BulletinPolicy[],
    itTitle: "IT Tips & Support",
    itSubtitle: "Tech Corner",
    itTips: [
      { type: "do", icon: "ph-bold ph-lock", text: "Always lock your workstation (Win + L)" },
      { type: "do", icon: "ph-bold ph-wifi-high", text: "Use VPN when working remotely" },
      { type: "do", icon: "ph-bold ph-envelope-simple", text: "Report suspicious emails to security@inspire.ph" },
      { type: "do", icon: "ph-bold ph-key", text: "Password rotation every 90 days" },
      { type: "do", icon: "ph-bold ph-broom", text: "Clear browser cache weekly" },
      { type: "do", icon: "ph-bold ph-bookmark-simple", text: "Bookmark helpdesk.inspire.ph for tickets" },
    ] as BulletinRule[],
  },
  ja: {
    officeTitle: "オフィスガイドライン",
    officeSubtitle: "実施事項と禁止事項",
    officeRules: [
      { type: "do", icon: "ph-bold ph-check-circle", text: "作業スペースを常に清潔で整理された状態に保つ" },
      { type: "do", icon: "ph-bold ph-check-circle", text: "公式のコミュニケーションチャネルを利用する" },
      { type: "dont", icon: "ph-bold ph-prohibit", text: "私用のために会社資源を使用する" },
      { type: "dont", icon: "ph-bold ph-prohibit", text: "認証情報やアクセスカードを共有する" },
      { type: "do", icon: "ph-bold ph-check-circle", text: "安全上の懸念はすぐに報告する" },
      { type: "dont", icon: "ph-bold ph-prohibit", text: "セキュリティ手順を迂回する" },
    ] as BulletinRule[],
    dressTitle: "ドレスコード",
    dressSubtitle: "服装基準",
    attireItems: [
      { icon: "ph-duotone ph-briefcase", title: "ビジネスデー", subtitle: "月-木", desc: "フォーマルなビジネスウェア" },
      { icon: "ph-duotone ph-sun-horizon", title: "カジュアルフライデー", subtitle: "", desc: "スマートカジュアル（ポロシャツ可）" },
      { icon: "ph-duotone ph-handshake", title: "顧客ミーティング", subtitle: "", desc: "完全フォーマル（ブレザー必須）" },
      { icon: "ph-duotone ph-shooting-star", title: "社内イベント", subtitle: "", desc: "テーマ服またはビジネスカジュアル" },
    ] as BulletinAttire[],
    policiesTitle: "主要ポリシー",
    policiesSubtitle: "コンプライアンスハブ",
    policies: [
      { icon: "ph-duotone ph-file-text", color: "var(--inspire-blue)", text: "データプライバシー・保護ポリシー" },
      { icon: "ph-duotone ph-lock-key", color: "var(--inspire-red)", text: "ハラスメント防止と安全な職場" },
      { icon: "ph-duotone ph-globe-simple", color: "var(--inspire-green)", text: "リモートワーク契約条件" },
      { icon: "ph-duotone ph-laptop", color: "var(--inspire-purple)", text: "IT利用適正ポリシー" },
      { icon: "ph-duotone ph-airplane", color: "var(--inspire-orange)", text: "出張・経費ガイドライン" },
      { icon: "ph-duotone ph-scales", color: "var(--inspire-teal)", text: "倫理・行動規範" },
    ] as BulletinPolicy[],
    itTitle: "ITヒントとサポート",
    itSubtitle: "テックコーナー",
    itTips: [
      { type: "do", icon: "ph-bold ph-lock", text: "離席時は必ずPCをロックする（Win + L）" },
      { type: "do", icon: "ph-bold ph-wifi-high", text: "リモート勤務時はVPNを利用する" },
      { type: "do", icon: "ph-bold ph-envelope-simple", text: "不審なメールは security@inspire.ph に報告する" },
      { type: "do", icon: "ph-bold ph-key", text: "パスワードは90日ごとに変更する" },
      { type: "do", icon: "ph-bold ph-broom", text: "ブラウザキャッシュを毎週クリアする" },
      { type: "do", icon: "ph-bold ph-bookmark-simple", text: "helpdesk.inspire.ph をブックマークする" },
    ] as BulletinRule[],
  },
  ko: {
    officeTitle: "사무실 가이드라인",
    officeSubtitle: "권장 사항 및 금지 사항",
    officeRules: [
      { type: "do", icon: "ph-bold ph-check-circle", text: "작업 공간을 항상 깔끔하고 정돈된 상태로 유지" },
      { type: "do", icon: "ph-bold ph-check-circle", text: "공식 커뮤니케이션 채널 사용" },
      { type: "dont", icon: "ph-bold ph-prohibit", text: "개인 업무에 회사 자원 사용 금지" },
      { type: "dont", icon: "ph-bold ph-prohibit", text: "자격 증명 또는 출입 카드를 공유 금지" },
      { type: "do", icon: "ph-bold ph-check-circle", text: "안전 관련 우려 사항 즉시 보고" },
      { type: "dont", icon: "ph-bold ph-prohibit", text: "보안 절차 우회 금지" },
    ] as BulletinRule[],
    dressTitle: "복장 규정",
    dressSubtitle: "복장 기준",
    attireItems: [
      { icon: "ph-duotone ph-briefcase", title: "비즈니스 데이", subtitle: "월-목", desc: "정장 복장" },
      { icon: "ph-duotone ph-sun-horizon", title: "캐주얼 프라이데이", subtitle: "", desc: "스마트 캐주얼, 폴로셔츠 허용" },
      { icon: "ph-duotone ph-handshake", title: "고객 미팅", subtitle: "", desc: "완전 정장, 블레이저 필수" },
      { icon: "ph-duotone ph-shooting-star", title: "사내 이벤트", subtitle: "", desc: "테마 복장 또는 비즈니스 캐주얼" },
    ] as BulletinAttire[],
    policiesTitle: "주요 정책",
    policiesSubtitle: "컴플라이언스 허브",
    policies: [
      { icon: "ph-duotone ph-file-text", color: "var(--inspire-blue)", text: "데이터 프라이버시 및 보호 정책" },
      { icon: "ph-duotone ph-lock-key", color: "var(--inspire-red)", text: "직장 내 괴롭힘 방지 및 안전한 근무 환경" },
      { icon: "ph-duotone ph-globe-simple", color: "var(--inspire-green)", text: "원격 근무 계약 조건" },
      { icon: "ph-duotone ph-laptop", color: "var(--inspire-purple)", text: "IT 허용 사용 정책" },
      { icon: "ph-duotone ph-airplane", color: "var(--inspire-orange)", text: "출장 및 경비 가이드라인" },
      { icon: "ph-duotone ph-scales", color: "var(--inspire-teal)", text: "윤리 및 행동 강령" },
    ] as BulletinPolicy[],
    itTitle: "IT 팁 및 지원",
    itSubtitle: "테크 코너",
    itTips: [
      { type: "do", icon: "ph-bold ph-lock", text: "자리 비울 때는 항상 워크스테이션 잠금(Win + L)" },
      { type: "do", icon: "ph-bold ph-wifi-high", text: "원격 근무 시 VPN 사용" },
      { type: "do", icon: "ph-bold ph-envelope-simple", text: "의심스러운 이메일은 security@inspire.ph로 신고" },
      { type: "do", icon: "ph-bold ph-key", text: "비밀번호는 90일마다 변경" },
      { type: "do", icon: "ph-bold ph-broom", text: "브라우저 캐시를 매주 정리" },
      { type: "do", icon: "ph-bold ph-bookmark-simple", text: "helpdesk.inspire.ph를 북마크" },
    ] as BulletinRule[],
  },
} as const;

function RuleItem({
  type,
  icon,
  text,
}: {
  type: "do" | "dont";
  icon: string;
  text: string;
}) {
  return (
    <div className="flex items-start gap-3.5 text-[0.95rem] text-content leading-relaxed font-medium">
      <i
        className={`${icon} mt-0.5 text-[1.3rem] shrink-0 ${
          type === "do" ? "text-inspire-green" : "text-inspire-red"
        }`}
      />
      {text}
    </div>
  );
}

function AttireItem({
  icon,
  title,
  subtitle,
  desc,
}: {
  icon: string;
  title: string;
  subtitle: string;
  desc: string;
}) {
  return (
    <div className="attire-item bg-inset border border-subtle rounded-md p-5 max-md:p-3 text-center">
      <i className={`${icon} text-[2.2rem] max-md:text-[1.8rem] mb-3 block text-content`} />
      <h5 className="font-serif text-base max-md:text-sm font-bold mb-1.5 text-content">
        {title}
        {subtitle && (
          <span className="text-muted font-normal text-[0.85rem] max-md:text-[0.75rem]">
            {" "}
            {subtitle}
          </span>
        )}
      </h5>
      <p className="text-[0.85rem] max-md:text-[0.75rem] text-muted leading-snug">{desc}</p>
    </div>
  );
}

function ScheduleItem({
  label,
  time,
  icon,
}: {
  label: string;
  time: string;
  icon: string;
}) {
  return (
    <div className="flex items-center gap-4 max-md:gap-3 py-3 max-md:py-2 px-4 max-md:px-3 bg-inset border border-subtle rounded-md">
      <i className={`${icon} text-[1.6rem] max-md:text-[1.3rem] text-inspire-orange shrink-0`} />
      <div className="flex-1">
        <p className="text-[0.9rem] max-md:text-[0.8rem] font-bold text-content">{label}</p>
        <p className="text-[0.85rem] max-md:text-[0.75rem] text-muted">{time}</p>
      </div>
    </div>
  );
}

function BreakItem({
  role,
  time,
}: {
  role: string;
  time: string;
}) {
  return (
    <div className="flex items-center justify-between py-2 max-md:py-1.5 px-3 max-md:px-2 bg-inset rounded-md text-[0.9rem] max-md:text-[0.8rem]">
      <span className="font-semibold text-content">{role}</span>
      <span className="text-muted text-[0.85rem] max-md:text-[0.75rem]">{time}</span>
    </div>
  );
}
