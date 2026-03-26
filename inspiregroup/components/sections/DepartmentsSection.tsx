"use client";

import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import { departmentData } from "@/lib/data";
import { useFadeIn } from "@/hooks/useFadeIn";

export default function DepartmentsSection() {
  const { ref, isVisible } = useFadeIn();

  return (
    <section
      id="departments"
      className="py-24 sm:py-30 relative z-1 bg-main border-t border-subtle"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">
        <SectionHeader
          label="Browse"
          labelColorClass="lbl-red"
          title="Department Resources"
          subtitle="Explore each department's training materials, documents, team roster, and tools."
          centered
        />

        <div
          ref={ref}
          className={`grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-4 sm:gap-6 transition-all duration-800 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {departmentData.map((dept) => (
            <Link
              key={dept.id}
              href={`/departments/${dept.id}`}
              className="group rounded-2xl p-6 sm:p-8 cursor-pointer flex gap-5 sm:gap-6 items-start text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.25)] shadow-[0_4px_16px_rgba(0,0,0,0.15)]"
              style={{ background: dept.color }}
            >
              {/* Icon */}
              <div
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "rgba(255,255,255,0.2)" }}
              >
                <i className={`${dept.icon} text-[1.6rem] sm:text-[1.8rem] text-white`} />
              </div>

              {/* Content */}
              <div className="min-w-0">
                <h3 className="font-serif text-[1.2rem] sm:text-[1.4rem] font-bold mb-1.5 text-white leading-snug">
                  {dept.name}
                </h3>
                <p className="text-[0.88rem] sm:text-[0.95rem] leading-relaxed mb-4 text-white/80 line-clamp-2">
                  {dept.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {dept.tags.map((tag) => (
                    <span
                      key={tag}
                      className="py-1 px-3 rounded-full text-[0.72rem] sm:text-[0.75rem] font-bold text-white border border-white/30 bg-white/15"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Arrow */}
              <i className="ph-bold ph-arrow-right text-white/60 text-[1.2rem] shrink-0 mt-1 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
