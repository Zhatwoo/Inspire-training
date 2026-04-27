import path from "path";
import fs from "fs";

const RAW_NAS_BASE_PATH = process.env.NAS_BASE_PATH || "//NAS/shared";
export const isHttpNas = RAW_NAS_BASE_PATH.startsWith("http://") || RAW_NAS_BASE_PATH.startsWith("https://");
const NAS_BASE_PATH = isHttpNas ? RAW_NAS_BASE_PATH : path.resolve(RAW_NAS_BASE_PATH);

export function resolveNasPath(relativePath: string): string {
  if (isHttpNas) {
    const baseUrl = NAS_BASE_PATH.endsWith('/') ? NAS_BASE_PATH : `${NAS_BASE_PATH}/`;
    const rel = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath;
    return `${baseUrl}${rel}`;
  }

  const resolved = path.resolve(NAS_BASE_PATH, relativePath);

  // Prevent directory traversal attacks
  if (!resolved.startsWith(NAS_BASE_PATH)) {
    throw new Error("Invalid path: directory traversal detected");
  }

  return resolved;
}

export function nasFileExists(relativePath: string): boolean {
  try {
    const fullPath = resolveNasPath(relativePath);
    return fs.existsSync(fullPath);
  } catch {
    return false;
  }
}

export function getNasFileStream(relativePath: string): fs.ReadStream {
  const fullPath = resolveNasPath(relativePath);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`File not found: ${relativePath}`);
  }
  return fs.createReadStream(fullPath);
}

export function getNasFileSize(relativePath: string): number {
  const fullPath = resolveNasPath(relativePath);
  const stats = fs.statSync(fullPath);
  return stats.size;
}
