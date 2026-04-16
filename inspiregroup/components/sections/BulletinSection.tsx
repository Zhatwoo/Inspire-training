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
          label="Notice Board"
          labelColorClass="lbl-orange"
          title="Bulletin Board"
          subtitle="Important guidelines, dress code policies, and IT tips for all employees."
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
                  Office Guidelines
                </h3>
                <p className="text-[0.9rem] text-muted mt-1">
                  Do&apos;s &amp; Don&apos;ts
                </p>
              </div>
            </div>
            <div className="p-8 grow">
              <div className="flex flex-col gap-4">
                <RuleItem type="do" icon="ph-bold ph-check-circle" text="Maintain a clean and organized workspace" />
                <RuleItem type="do" icon="ph-bold ph-check-circle" text="Use official communication channels" />
                <RuleItem type="dont" icon="ph-bold ph-prohibit" text="Use company resources for personal tasks" />
                <RuleItem type="dont" icon="ph-bold ph-prohibit" text="Share credentials or access cards" />
                <RuleItem type="do" icon="ph-bold ph-check-circle" text="Report safety concerns immediately" />
                <RuleItem type="dont" icon="ph-bold ph-prohibit" text="Bypass security protocols" />
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
                <p className="text-[0.9rem] text-muted mt-1">Compliance Hub</p>
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
