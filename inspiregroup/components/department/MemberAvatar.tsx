"use client";

import { useState } from "react";
import type { DeptTeamMember } from "@/lib/types";

const sizeClasses = {
  small: "w-20 h-20 sm:w-16 sm:h-16 text-xl max-sm:text-base",
  medium: "w-24 h-24 sm:w-20 sm:h-20 text-2xl max-sm:text-xl",
  large: "w-32 h-32 text-5xl max-sm:w-24 max-sm:h-24 max-sm:text-3xl",
};

export default function MemberAvatar({
  member,
  deptColor,
  size = "medium",
  className = "mb-4",
}: {
  member: Pick<DeptTeamMember, "name" | "initials" | "image">;
  deptColor: string;
  size?: "small" | "medium" | "large";
  className?: string;
}) {
  const [imageError, setImageError] = useState(false);
  const isRounded = size === "large" ? "rounded-2xl" : "rounded-full";
  const showInitials = !member.image || imageError;

  return showInitials ? (
    <div
      className={`${sizeClasses[size]} ${isRounded} flex items-center justify-center font-extrabold font-serif shrink-0 text-white ${className} shadow-md`}
      style={{ background: deptColor }}
    >
      {member.initials}
    </div>
  ) : (
    <img
      src={member.image}
      alt={member.name}
      onError={() => setImageError(true)}
      className={`${sizeClasses[size]} ${isRounded} object-cover shrink-0 shadow-md ${className}`}
    />
  );
}
