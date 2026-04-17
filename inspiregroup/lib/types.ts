// ─── Frontend Types ───

export interface AppFeature {
  icon: string;
  text: string;
}

export interface AppVideo {
  title: string;
  desc: string;
  gradient: string;
}

export interface AppData {
  id: string;
  name: string;
  icon: string;
  imageSrc?: string;
  logoBg?: string;
  cardClass: string;
  logoColor: string;
  modalRgb: string;
  modalLogoBg: string;
  modalLogoColor: string;
  desc: string;
  longDesc: string;
  features: AppFeature[];
  videos: AppVideo[];
}

export interface EventData {
  id: string;
  icon: string;
  tagIcon: string;
  tagLabel: string;
  slideClass: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  date: string;
  location: string;
  posterGradient: string;
}

export interface DeptVideo {
  title: string;
  desc: string;
  duration: string;
  url?: string;
}

export interface DeptDoc {
  title: string;
  desc: string;
  size: string;
  type: string;
  icon: string;
}

export interface DeptTeamMember {
  name: string;
  role: string;
  initials: string;
  head?: boolean;
  image?: string;
  subGroup?: string;
}

export interface DeptRepo {
  name: string;
  desc: string;
  envs: string[];
  url?: string;
}

export interface DeptEnvFile {
  name: string;
  desc: string;
  size: string;
}

export interface DepartmentData {
  id: string;
  name: string;
  icon: string;
  color: string;
  rgb: string;
  desc: string;
  tags: string[];
  videos?: DeptVideo[];
  docs?: DeptDoc[];
  team: DeptTeamMember[];
  repos?: DeptRepo[];
  envFiles?: DeptEnvFile[];
}

export interface SectionHeaderProps {
  label: string;
  labelColorClass: string;
  title: string;
  subtitle: string;
  centered?: boolean;
  dark?: boolean;
}

export interface AppModalProps {
  app: AppData | null;
  isOpen: boolean;
  onClose: () => void;
}

export interface EventModalProps {
  event: EventData | null;
  isOpen: boolean;
  onClose: () => void;
}

export interface PhilippineLawDetail {
  title: string;
  purpose: string;
  relevance: string[];
}

export interface PhilippineLawData {
  id: string;
  num: string;
  name: string;
  year: string;
  icon: string;
  color: string;
  details: PhilippineLawDetail;
}

export interface PhilippineLawModalProps {
  law: PhilippineLawData | null;
  isOpen: boolean;
  onClose: () => void;
}

export interface DepartmentPageProps {
  department: DepartmentData;
  onBack: () => void;
}
