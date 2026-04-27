"use client";

import { useState } from "react";
import type { DepartmentPageProps } from "@/lib/types";
import { useLanguage } from "@/context/LanguageContext";
import { departmentTranslations } from "@/lib/translations";
import VideoCard from "./VideoCard";
import TeamSection from "./TeamSection";

export default function DepartmentPage({
  department: dept,
  onBack,
}: DepartmentPageProps) {
  const { t, language } = useLanguage();
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);

  const localized =
    departmentTranslations[language as keyof typeof departmentTranslations][dept.id];
  const deptName = localized?.name ?? dept.name;

  return (
    <div className="bg-main min-h-screen pb-24">
      {/* Hero Banner */}
      <div
        className="pt-[180px] pb-[100px] relative overflow-hidden text-white max-md:pt-[120px] max-md:pb-[60px]"
        style={{
          background: `linear-gradient(135deg, ${dept.color}, rgba(${dept.rgb},0.8))`,
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
        }}
      >
        <div className="relative z-[2] max-w-7xl mx-auto px-6 sm:px-10">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2.5 text-white font-bold mb-10 bg-white/15 py-3 px-6 rounded-full backdrop-blur-[12px] border border-white/20 transition-all duration-200 hover:bg-white/25"
          >
            <i className="ph-bold ph-arrow-left" /> {t("deptBack")}
          </button>

          <div className="flex items-center gap-6 mb-5 max-md:flex-col max-md:items-start">
            <i
              className={`${dept.icon} text-[4rem] bg-white/20 p-6 rounded-[32px] backdrop-blur-[12px] shadow-[0_10px_30px_rgba(0,0,0,0.2)] max-md:text-[3rem] max-md:p-4`}
            />
            <h1 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] leading-none m-0 [text-shadow:0_4px_24px_rgba(0,0,0,0.2)]">
              {deptName}
            </h1>
          </div>
          <p className="text-[1.1rem] sm:text-[1.25rem] opacity-90 leading-relaxed max-md:mt-6 text-justify">
            {dept.desc}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-16 sm:pt-20">

        {/* Training Videos */}
        {dept.videos && dept.videos.length > 0 && (
          <div className="mb-20">
            <h2 className="font-serif text-[1.6rem] sm:text-[1.8rem] font-bold mb-8 flex items-center gap-4 text-content">
              <i className="ph-duotone ph-monitor-play text-[2.2rem]" style={{ color: dept.color }} />
              {t("deptTrainingVideos")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
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
        )}

        {/* Team Members */}
        <div className="mb-20">
          <h2 className="font-serif text-[1.6rem] sm:text-[1.8rem] font-bold mb-10 flex items-center gap-4 text-content">
            <i className="ph-duotone ph-users text-[2.2rem]" style={{ color: dept.color }} />
            {t("deptTeamMembers")}
          </h2>
          <TeamSection team={dept.team} deptColor={dept.color} deptRgb={dept.rgb} />
        </div>

        {/* Documents */}
        {dept.docs && dept.docs.length > 0 && (
          <div className="mb-20">
            <h2 className="font-serif text-[1.6rem] sm:text-[1.8rem] font-bold mb-8 flex items-center gap-4 text-content">
              <i className="ph-duotone ph-files text-[2.2rem]" style={{ color: dept.color }} />
              {t("deptDocuments")}
            </h2>
            {dept.docs.map((doc) => (
              <a
                key={doc.title}
                href="#"
                download
                className="flex items-center gap-5 py-5 px-6 sm:px-8 bg-card border border-subtle rounded-lg mb-4 shadow-(--shadow-xs) max-md:flex-wrap transition-all duration-300 hover:-translate-y-0.5 hover:shadow-(--shadow-sm)"
              >
                <div
                  className="w-[54px] h-[54px] rounded-2xl flex items-center justify-center text-[1.5rem] shrink-0"
                  style={{ background: `rgba(${dept.rgb}, 0.1)`, color: dept.color }}
                >
                  <i className={doc.icon} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-mono text-[1rem] sm:text-[1.05rem] font-semibold mb-1 text-content">{doc.title}</h4>
                  <p className="text-[0.88rem] sm:text-[0.9rem] text-muted leading-snug">{doc.desc}</p>
                </div>
                <span className="text-[0.8rem] text-muted font-mono shrink-0">
                  {doc.size} &middot; {doc.type}
                </span>
                <span className="py-2.5 px-5 bg-inset text-content font-bold rounded-full text-[0.85rem] sm:text-[0.9rem] border border-subtle whitespace-nowrap shrink-0 flex items-center gap-2">
                  <i className="ph-bold ph-download-simple" /> {t("commonDownload")}
                </span>
              </a>
            ))}
          </div>
        )}

        {/* Repositories */}
        {dept.repos && dept.repos.length > 0 && (
          <div className="mb-20">
            <h2 className="font-serif text-[1.6rem] sm:text-[1.8rem] font-bold mb-8 flex items-center gap-4 text-content">
              <i className="ph-duotone ph-git-branch text-[2.2rem]" style={{ color: dept.color }} />
              {t("deptRepositories")}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {dept.repos.map((repo) => (
                <a
                  key={repo.name}
                  href={repo.url ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-card border border-subtle rounded-lg p-6 shadow-(--shadow-sm) flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-(--shadow-md)"
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

        {/* Environment Files */}
        {dept.envFiles && dept.envFiles.length > 0 && (
          <div className="mb-20">
            <h2 className="font-serif text-[1.6rem] sm:text-[1.8rem] font-bold mb-8 flex items-center gap-4 text-content">
              <i className="ph-duotone ph-file-lock text-[2.2rem]" style={{ color: dept.color }} />
              {t("deptEnvironmentFiles")}
            </h2>
            {dept.envFiles.map((file) => (
              <a
                key={file.name}
                href="#"
                download
                className="flex items-center gap-5 py-5 px-6 sm:px-8 bg-card border border-subtle rounded-lg mb-4 shadow-(--shadow-xs) max-md:flex-wrap transition-all duration-300 hover:-translate-y-0.5 hover:shadow-(--shadow-sm)"
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
                <span className="py-2.5 px-5 bg-inset text-content font-bold rounded-full text-[0.9rem] border border-subtle whitespace-nowrap shrink-0 flex items-center gap-2">
                  <i className="ph-bold ph-download-simple" /> {t("commonDownload")}
                </span>
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Video Modal */}
      {activeVideoUrl && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
            <button
              onClick={() => setActiveVideoUrl(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors border border-white/20"
            >
              <i className="ph-bold ph-x text-xl" />
            </button>
            <video controls autoPlay className="w-full h-full object-contain" src={activeVideoUrl} />
          </div>
        </div>
      )}
    </div>
  );
}
