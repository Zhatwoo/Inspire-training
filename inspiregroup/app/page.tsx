"use client";

import { useState, useCallback } from "react";
import ParticleCanvas from "@/components/canvas/ParticleCanvas";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import EcosystemSection from "@/components/sections/EcosystemSection";
import AnnouncementsSection from "@/components/sections/AnnouncementsSection";
import OrgChartSection from "@/components/sections/OrgChartSection";
import BulletinSection from "@/components/sections/BulletinSection";
import DepartmentsSection from "@/components/sections/DepartmentsSection";

export default function Home() {
  const [, setForceUpdate] = useState(0);

  const goHome = useCallback(() => {
    setForceUpdate((n) => n + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <ParticleCanvas />
      <Navbar onGoHome={goHome} />
      <div className="relative z-1">
        <HeroSection />
        <EcosystemSection />
        <AnnouncementsSection />
        <OrgChartSection />
        <BulletinSection />
        <DepartmentsSection />
        <Footer />
      </div>
    </>
  );
}
