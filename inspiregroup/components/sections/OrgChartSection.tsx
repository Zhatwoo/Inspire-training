"use client";

import Image from "next/image";
import SectionHeader from "@/components/ui/SectionHeader";
import { useFadeIn } from "@/hooks/useFadeIn";
import { useLanguage } from "@/context/LanguageContext";

export default function OrgChartSection() {
  const { ref, isVisible } = useFadeIn();
  const { t } = useLanguage();

  return (
    <section id="orgchart" className="py-30 relative z-1 bg-main">
      <div className="max-w-7xl mx-auto px-10 max-md:px-6">
        <SectionHeader
          label={t("orgLabel")}
          labelColorClass="lbl-purple"
          title={t("orgTitle")}
          subtitle={t("orgSubtitle")}
          centered
        />

        <div
          ref={ref}
          className={`orgchart-container bg-card border border-subtle rounded-xl overflow-hidden shadow-(--shadow-sm) transition-all duration-800 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="relative w-full">
            <Image
              src="/orgchart.png"
              alt="Organizational Chart"
              width={1200}
              height={800}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
