"use client";

import type { DeptTeamMember } from "@/lib/types";
import MemberAvatar from "./MemberAvatar";

function HeadCard({
  member,
  deptColor,
  deptRgb,
}: {
  member: DeptTeamMember;
  deptColor: string;
  deptRgb: string;
}) {
  return (
    <div
      className="flex items-center gap-6 sm:gap-8 max-sm:flex-col max-sm:items-start p-6 sm:p-8 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg"
      style={{ borderColor: deptColor, background: `rgba(${deptRgb}, 0.08)` }}
    >
      <div className="shrink-0">
        <MemberAvatar member={member} deptColor={deptColor} size="large" className="" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <h4 className="font-serif font-bold text-content text-[1.15rem] sm:text-[1.3rem]">
            {member.name}
          </h4>
          <span
            className="text-[0.65rem] py-1 px-2.5 rounded-full font-extrabold uppercase tracking-wider text-white shrink-0"
            style={{ background: deptColor }}
          >
            {member.role}
          </span>
        </div>
        <p className="text-[0.88rem] sm:text-[0.95rem] font-semibold" style={{ color: deptColor }}>
          {member.role}
        </p>
      </div>
    </div>
  );
}

function MemberCard({
  member,
  deptColor,
  deptRgb,
}: {
  member: DeptTeamMember;
  deptColor: string;
  deptRgb: string;
}) {
  return (
    <div
      className="flex-1 min-w-[180px] sm:min-w-[200px] flex flex-col items-center text-center p-6 sm:p-8 rounded-2xl border transition-all duration-300 hover:shadow-md hover:-translate-y-1"
      style={{
        borderColor: `${deptColor}40`,
        background: `rgba(${deptRgb}, 0.05)`,
      }}
    >
      <MemberAvatar member={member} deptColor={deptColor} size="medium" />
      <h4 className="font-serif font-bold text-content text-[0.9rem] sm:text-[1rem] leading-snug w-full">
        {member.name}
      </h4>
      <p className="text-[0.76rem] sm:text-[0.82rem] font-semibold mt-1" style={{ color: deptColor }}>
        {member.role}
      </p>
    </div>
  );
}

function RoleGroup({
  label,
  members,
  deptColor,
  deptRgb,
  showDivider,
}: {
  label: string;
  members: DeptTeamMember[];
  deptColor: string;
  deptRgb: string;
  showDivider: boolean;
}) {
  return (
    <div
      className={showDivider ? "pt-8 border-t mb-10" : "mb-10"}
      style={showDivider ? { borderColor: `${deptColor}25` } : undefined}
    >
      <p className="text-[0.82rem] font-extrabold uppercase tracking-wider mb-5" style={{ color: deptColor }}>
        {label}
      </p>
      <div className="flex flex-wrap gap-5 sm:gap-7">
        {members.map((member) => (
          <MemberCard key={member.name} member={member} deptColor={deptColor} deptRgb={deptRgb} />
        ))}
      </div>
    </div>
  );
}

function groupByRole(members: DeptTeamMember[]): Map<string, DeptTeamMember[]> {
  const map = new Map<string, DeptTeamMember[]>();
  members.forEach((m) => {
    if (!map.has(m.role)) map.set(m.role, []);
    map.get(m.role)!.push(m);
  });
  return map;
}

export default function TeamSection({
  team,
  deptColor,
  deptRgb,
}: {
  team: DeptTeamMember[];
  deptColor: string;
  deptRgb: string;
}) {
  const head = team.filter((m) => m.head);
  const nonHead = team.filter((m) => !m.head);
  const hasSubGroups = nonHead.some((m) => m.subGroup);

  const renderRoleGroups = (members: DeptTeamMember[], startDivider = false) => {
    const roleMap = groupByRole(members);
    return Array.from(roleMap.entries()).map(([role, roleMembers], idx) => (
      <RoleGroup
        key={role}
        label={role}
        members={roleMembers}
        deptColor={deptColor}
        deptRgb={deptRgb}
        showDivider={startDivider || idx > 0}
      />
    ));
  };

  const renderSubGroups = () => {
    const subGroupMap = new Map<string, DeptTeamMember[]>();
    nonHead.forEach((m) => {
      const sg = m.subGroup ?? "";
      if (!subGroupMap.has(sg)) subGroupMap.set(sg, []);
      subGroupMap.get(sg)!.push(m);
    });

    const isFirst = head.length === 0;

    return Array.from(subGroupMap.entries()).map(([sg, sgMembers], sgIdx) => {
      const showTopBorder = !isFirst || sgIdx > 0;
      const roleMap = groupByRole(sgMembers);
      return (
        <div key={sg} className="mb-4">
          {sg && (
            <div
              className={`flex items-center gap-3 mb-6 ${showTopBorder ? "pt-8 border-t" : "pb-2"}`}
              style={showTopBorder ? { borderColor: `${deptColor}25` } : undefined}
            >
              <h3 className="font-serif text-[1.1rem] sm:text-[1.2rem] font-bold text-content whitespace-nowrap">
                {sg}
              </h3>
              <div className="flex-1 h-px" style={{ background: `${deptColor}30` }} />
            </div>
          )}
          {Array.from(roleMap.entries()).map(([role, roleMembers], rIdx) => (
            <RoleGroup
              key={role}
              label={role}
              members={roleMembers}
              deptColor={deptColor}
              deptRgb={deptRgb}
              showDivider={rIdx > 0}
            />
          ))}
        </div>
      );
    });
  };

  const headLabel = head.length > 0 ? head[0].role : "";

  return (
    <div>
      {/* Head / Leadership section */}
      {head.length > 0 && (
        <div className="mb-12">
          <p className="text-[0.82rem] font-extrabold uppercase tracking-wider mb-5" style={{ color: deptColor }}>
            {headLabel}
          </p>
          <div className={`grid gap-5 ${head.length === 1 ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"}`}>
            {head.map((member) => (
              <HeadCard key={member.name} member={member} deptColor={deptColor} deptRgb={deptRgb} />
            ))}
          </div>
        </div>
      )}

      {/* Role groups or sub-groups */}
      {hasSubGroups
        ? renderSubGroups()
        : renderRoleGroups(nonHead, head.length > 0)}
    </div>
  );
}
