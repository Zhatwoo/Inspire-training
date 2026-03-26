import type { SectionHeaderProps } from "@/lib/types";
import { useFadeIn } from "@/hooks/useFadeIn";

export default function SectionHeader({
  label,
  labelColorClass,
  title,
  subtitle,
  centered = false,
  dark = false,
}: SectionHeaderProps) {
  const { ref, isVisible } = useFadeIn();

  return (
    <div
      ref={ref}
      className={`mb-15 transition-all duration-800 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${centered ? "text-center flex flex-col items-center" : ""}`}
    >
      <div
        className={`inline-flex items-center gap-2 text-[0.8rem] font-extrabold uppercase tracking-widest py-2 px-5 rounded-full mb-6 shadow-[var(--shadow-sm)] ${labelColorClass} ${
          dark
            ? "bg-white/10 border border-white/10 backdrop-blur-[10px]"
            : "bg-card border border-subtle"
        }`}
      >
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: "currentColor" }}
        />
        {label}
      </div>
      <h2
        className={`font-serif text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.1] tracking-tight mb-4 ${
          dark ? "text-white" : "text-content"
        }`}
      >
        {title}
      </h2>
      <p
        className={`text-[1.1rem] max-w-[600px] leading-relaxed ${
          dark ? "text-white/70" : "text-muted"
        }`}
      >
        {subtitle}
      </p>
    </div>
  );
}
