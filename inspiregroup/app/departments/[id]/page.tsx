"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { departmentData } from "@/lib/data";
import DepartmentPage from "@/components/department/DepartmentPage";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ParticleCanvas from "@/components/canvas/ParticleCanvas";
import { useRouter } from "next/navigation";

export default function DepartmentRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const dept = departmentData.find((d) => d.id === id);

  if (!dept) return notFound();

  return (
    <>
      <ParticleCanvas />
      <Navbar onGoHome={() => router.push("/")} />
      <div className="relative z-[1]">
        <DepartmentPage
          department={dept}
          onBack={() => router.push("/#departments")}
        />
        <Footer />
      </div>
    </>
  );
}
