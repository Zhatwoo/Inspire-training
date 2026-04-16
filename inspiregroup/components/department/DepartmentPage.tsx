"use client";

import { useState } from "react";
import type { DepartmentPageProps, DeptVideo } from "@/lib/types";

const LANGS = [
  { code: "EN", label: "English" },
  { code: "JA", label: "日本語" },
  { code: "KO", label: "한국어" },
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
  const sizeClasses = {
    small: "w-20 h-20 sm:w-16 sm:h-16 text-xl max-sm:text-base",
    medium: "w-24 h-24 sm:w-20 sm:h-20 text-2xl max-sm:text-xl",
    large: "w-32 h-32 text-5xl max-sm:w-24 max-sm:h-24 max-sm:text-3xl",
  };

  const isRounded = size === "large" ? "rounded-2xl" : "rounded-full";

  return member.image ? (
    <img
      src={member.image}
      alt={member.name}
      className={`${sizeClasses[size]} ${isRounded} object-cover shrink-0 shadow-md mb-4`}
    />
  ) : (
    <div
      className={`${sizeClasses[size]} ${isRounded} flex items-center justify-center font-extrabold font-serif shrink-0 text-white mb-4 shadow-md`}
      style={{ background: deptColor }}
    >
      {member.initials}
    </div>
  );
}

function VideoCard({ vid, deptColor, deptRgb }: { vid: DeptVideo; deptColor: string; deptRgb: string }) {
  const [lang, setLang] = useState("EN");
  return (
    <div
      className="d-vid-card bg-card border border-subtle rounded-xl overflow-hidden shadow-(--shadow-sm) cursor-pointer"
      style={{ "--dept-color": deptColor, "--dept-rgb": deptRgb } as React.CSSProperties}
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
        <p className="text-[0.9rem] text-muted leading-snug">{vid.desc}</p>
        <span className="text-[0.8rem] text-muted mt-3 inline-block font-mono">{vid.duration}</span>
        <div className="flex gap-2 mt-4">
          {LANGS.map((l) => (
            <button
              key={l.code}
              onClick={() => setLang(l.code)}
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

export default function DepartmentPage({
  department: dept,
  onBack,
}: DepartmentPageProps) {
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
            <i className="ph-bold ph-arrow-left" /> Back to Departments
          </button>

          <div className="flex items-center gap-6 mb-5 max-md:flex-col max-md:items-start">
            <i
              className={`${dept.icon} text-[4rem] bg-white/20 p-6 rounded-[32px] backdrop-blur-[12px] shadow-[0_10px_30px_rgba(0,0,0,0.2)] max-md:text-[3rem] max-md:p-4`}
            />
            <h1 className="font-serif text-[clamp(3rem,5vw,4.5rem)] leading-none m-0 [text-shadow:0_4px_24px_rgba(0,0,0,0.2)]">
              {dept.name}
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
            Training Videos
          </h2>
          <div className="grid grid-cols-3 gap-7 max-lg:grid-cols-2 max-md:grid-cols-1">
            {dept.videos.map((vid) => (
              <VideoCard key={vid.title} vid={vid} deptColor={dept.color} deptRgb={dept.rgb} />
            ))}
          </div>
        </div>

        {/* Documents */}
        <div className="mb-20">
          <h2 className="font-serif text-[1.8rem] font-bold mb-8 flex items-center gap-4 text-content">
            <i
              className="ph-duotone ph-file-pdf text-[2.2rem]"
              style={{ color: dept.color }}
            />
            Documents &amp; Resources
          </h2>
          {dept.docs.map((doc) => (
            <div
              key={doc.title}
              className="doc-row flex items-center gap-5 py-5 px-8 bg-card border border-subtle rounded-lg mb-4 cursor-pointer shadow-(--shadow-xs) max-md:flex-wrap"
              style={
                {
                  "--dept-color": dept.color,
                  "--dept-rgb": dept.rgb,
                } as React.CSSProperties
              }
            >
              <div
                className="w-[54px] h-[54px] rounded-2xl flex items-center justify-center text-[1.5rem] shrink-0"
                style={{
                  background: `rgba(${dept.rgb}, 0.1)`,
                  color: dept.color,
                }}
              >
                <i className={doc.icon} />
              </div>
              <div className="flex-1">
                <h4 className="font-serif text-[1.15rem] font-bold mb-1 text-content">
                  {doc.title}
                </h4>
                <p className="text-[0.9rem] text-muted">{doc.desc}</p>
              </div>
              <span className="text-[0.8rem] text-muted font-mono shrink-0">
                {doc.size} &middot; {doc.type}
              </span>
              <span className="py-2.5 px-6 bg-inset text-content font-bold rounded-full text-[0.9rem] border border-subtle whitespace-nowrap shrink-0 transition-all duration-300">
                View
              </span>
            </div>
          ))}
        </div>

        {/* Team */}
        <div className="mb-20">
          <h2 className="font-serif text-[1.8rem] font-bold mb-8 flex items-center gap-4 text-content">
            <i
              className="ph-duotone ph-users text-[2.2rem]"
              style={{ color: dept.color }}
            />
            Team Members
          </h2>

          {/* Head Section - Horizontal */}
          <div className="mb-12">
            <div className="mb-6 flex items-center gap-4">
              <h3
                className="font-serif text-[1.2rem] font-bold"
                style={{ color: dept.color }}
              >
                Head
              </h3>
              <div
                className="flex-1 h-1 rounded-full"
                style={{
                  background: `linear-gradient(to right, ${dept.color}ff, ${dept.color}00)`,
                }}
              />
            </div>
            {dept.team
              .filter((m) => m.head)
              .map((member) => (
                <div
                  key={member.name}
                  className="flex items-center gap-8 max-sm:gap-6 p-8 max-sm:p-6 rounded-2xl border-2 transition-all duration-300"
                  style={{
                    borderColor: dept.color,
                    background: `rgba(${dept.rgb}, 0.08)`,
                  }}
                >
                  <div className="shrink-0 w-32 h-32 max-sm:w-24 max-sm:h-24">
                    <MemberAvatar
                      member={member}
                      deptColor={dept.color}
                      size="large"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-serif font-bold text-content text-[1.3rem] max-sm:text-[1.1rem] flex items-center gap-3 mb-2">
                      {member.name}
                      <span
                        className="text-[0.65rem] py-1.5 px-3 rounded-full font-extrabold uppercase tracking-wider font-sans text-white"
                        style={{ background: dept.color }}
                      >
                        Head
                      </span>
                    </h4>
                    <p
                      className="text-[0.95rem] font-semibold"
                      style={{ color: dept.color }}
                    >
                      {member.role}
                    </p>
                  </div>
                </div>
              ))}
          </div>

          {/* Positions & Members Sections */}
          {(() => {
            const nonHeadTeam = dept.team.filter((m) => !m.head);
            const positions = {};
            const members = [];

            nonHeadTeam.forEach((member) => {
              if (member.role === "Member") {
                members.push(member);
              } else {
                if (!positions[member.role]) {
                  positions[member.role] = [];
                }
                positions[member.role].push(member);
              }
            });

            const positionOrder = ["Internal Audit", "Receptionist I", "Receptionist II", "Security"];
            const sortedPositions = positionOrder.filter((pos) => positions[pos]);

            return (
              <>
                {/* Position Sections */}
                {sortedPositions.map((role, idx) => (
                  <div key={role} className={idx > 0 ? "mt-12" : ""}>
                    <div className="mb-6 flex items-center gap-4">
                      <h3
                        className="font-serif text-[1.2rem] font-bold"
                        style={{ color: dept.color }}
                      >
                        {role}
                      </h3>
                      <div
                        className="flex-1 h-1 rounded-full"
                        style={{
                          background: `linear-gradient(to right, ${dept.color}ff, ${dept.color}00)`,
                        }}
                      />
                    </div>
                    <div className="flex flex-wrap gap-6 max-sm:gap-4">
                      {positions[role].map((member) => (
                        <div
                          key={member.name}
                          className="flex-1 min-w-48 flex flex-col items-center p-6 max-sm:p-4 rounded-xl border transition-all duration-300"
                          style={{
                            borderColor: `${dept.color}50`,
                            background: `rgba(${dept.rgb}, 0.05)`,
                          }}
                        >
                          <MemberAvatar
                            member={member}
                            deptColor={dept.color}
                            size="medium"
                          />
                          <h4 className="font-serif font-bold text-content text-center max-sm:text-[0.95rem] mt-3 w-full">
                            {member.name}
                          </h4>
                          <p
                            className="text-[0.8rem] font-medium text-center max-sm:text-[0.75rem] mt-1"
                            style={{ color: dept.color }}
                          >
                            {member.role}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Members Section */}
                {members.length > 0 && (
                  <div className="mt-12">
                    <div className="mb-6 flex items-center gap-4">
                      <h3
                        className="font-serif text-[1.2rem] font-bold"
                        style={{ color: dept.color }}
                      >
                        Members
                      </h3>
                      <div
                        className="flex-1 h-1 rounded-full"
                        style={{
                          background: `linear-gradient(to right, ${dept.color}ff, ${dept.color}00)`,
                        }}
                      />
                    </div>
                    <div className="flex flex-wrap gap-6 max-sm:gap-4 justify-start">
                      {members.map((member) => (
                        <div
                          key={member.name}
                          className="flex flex-col items-center text-center"
                        >
                          <MemberAvatar
                            member={member}
                            deptColor={dept.color}
                            size="medium"
                          />
                          <h4 className="font-serif font-bold text-content max-sm:text-[0.95rem] mt-3">
                            {member.name}
                          </h4>
                          <p className="text-muted text-[0.8rem] font-medium max-sm:text-[0.75rem] mt-1">
                            {member.role}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
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
              Repositories
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
              Environment Files
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
                  <i className="ph-bold ph-download-simple" /> Download
                </span>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
