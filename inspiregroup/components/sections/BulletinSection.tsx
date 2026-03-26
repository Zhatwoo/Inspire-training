"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import { useFadeIn } from "@/hooks/useFadeIn";

export default function BulletinSection() {
  const { ref, isVisible } = useFadeIn();

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
            <div className="p-8 pb-6 flex items-center gap-4 border-b border-subtle bg-inset">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-[1.6rem] shrink-0 text-white shadow-(--shadow-md) bg-inspire-blue">
                <i className="ph-duotone ph-t-shirt" />
              </div>
              <div>
                <h3 className="font-serif text-[1.4rem] font-bold text-content">
                  Dress Code
                </h3>
                <p className="text-[0.9rem] text-muted mt-1">
                  Attire Standards
                </p>
              </div>
            </div>
            <div className="p-8 grow">
              <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
                <AttireItem icon="ph-duotone ph-briefcase" title="Business Days" subtitle="Mon–Thu" desc="Formal business attire" />
                <AttireItem icon="ph-duotone ph-sun-horizon" title="Casual Friday" subtitle="" desc="Smart casual, polo shirts OK" />
                <AttireItem icon="ph-duotone ph-handshake" title="Client Meetings" subtitle="" desc="Full formal, blazer required" />
                <AttireItem icon="ph-duotone ph-shooting-star" title="Company Events" subtitle="" desc="Themed or business casual" />
              </div>
            </div>
          </div>

          {/* Card 3: Key Policies */}
          <div className="bulletin-card bg-card border border-subtle rounded-xl overflow-hidden shadow-(--shadow-sm) flex flex-col">
            <div className="p-8 pb-6 flex items-center gap-4 border-b border-subtle bg-inset">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-[1.6rem] shrink-0 text-white shadow-(--shadow-md) bg-inspire-purple">
                <i className="ph-duotone ph-scroll" />
              </div>
              <div>
                <h3 className="font-serif text-[1.4rem] font-bold text-content">
                  Key Policies
                </h3>
                <p className="text-[0.9rem] text-muted mt-1">Compliance Hub</p>
              </div>
            </div>
            <div className="p-8 grow">
              <div className="flex flex-col gap-3">
                <PolicyItem icon="ph-duotone ph-file-text" color="var(--inspire-blue)" text="Data Privacy & Protection Policy" />
                <PolicyItem icon="ph-duotone ph-lock-key" color="var(--inspire-red)" text="Anti-Harassment & Safe Workplace" />
                <PolicyItem icon="ph-duotone ph-globe-simple" color="var(--inspire-green)" text="Remote Work Agreement Terms" />
                <PolicyItem icon="ph-duotone ph-laptop" color="var(--inspire-purple)" text="IT Acceptable Use Policy" />
                <PolicyItem icon="ph-duotone ph-airplane" color="var(--inspire-orange)" text="Travel & Expense Guidelines" />
                <PolicyItem icon="ph-duotone ph-scales" color="var(--inspire-teal)" text="Code of Ethics & Conduct" />
              </div>
            </div>
          </div>

          {/* Card 4: IT Tips */}
          <div className="bulletin-card bg-card border border-subtle rounded-xl overflow-hidden shadow-(--shadow-sm) flex flex-col">
            <div className="p-8 pb-6 flex items-center gap-4 border-b border-subtle bg-inset">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-[1.6rem] shrink-0 text-white shadow-(--shadow-md) bg-inspire-teal">
                <i className="ph-duotone ph-lightbulb" />
              </div>
              <div>
                <h3 className="font-serif text-[1.4rem] font-bold text-content">
                  IT Tips &amp; Support
                </h3>
                <p className="text-[0.9rem] text-muted mt-1">Tech Corner</p>
              </div>
            </div>
            <div className="p-8 grow">
              <div className="flex flex-col gap-4">
                <RuleItem type="do" icon="ph-bold ph-lock" text="Always lock your workstation (Win + L)" />
                <RuleItem type="do" icon="ph-bold ph-wifi-high" text="Use VPN when working remotely" />
                <RuleItem type="do" icon="ph-bold ph-envelope-simple" text="Report suspicious emails to security@inspire.ph" />
                <RuleItem type="do" icon="ph-bold ph-key" text="Password rotation every 90 days" />
                <RuleItem type="do" icon="ph-bold ph-broom" text="Clear browser cache weekly" />
                <RuleItem type="do" icon="ph-bold ph-bookmark-simple" text="Bookmark helpdesk.inspire.ph for tickets" />
              </div>
            </div>
          </div>
        </div>
      </div>
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
    <div className="attire-item bg-inset border border-subtle rounded-md p-5 text-center">
      <i className={`${icon} text-[2.2rem] mb-3 block text-content`} />
      <h5 className="font-serif text-base font-bold mb-1.5 text-content">
        {title}
        {subtitle && (
          <span className="text-muted font-normal text-[0.85rem]">
            {" "}
            {subtitle}
          </span>
        )}
      </h5>
      <p className="text-[0.85rem] text-muted leading-snug">{desc}</p>
    </div>
  );
}

function PolicyItem({
  icon,
  color,
  text,
}: {
  icon: string;
  color: string;
  text: string;
}) {
  return (
    <div className="policy-item flex items-center gap-4 py-4 px-5 bg-inset border border-subtle rounded-md text-[0.95rem] font-semibold cursor-pointer text-content">
      <i className={`${icon} text-[1.4rem] shrink-0`} style={{ color }} />
      {text}
      <i className="ph-bold ph-caret-right ml-auto text-muted text-[0.9rem]" />
    </div>
  );
}
