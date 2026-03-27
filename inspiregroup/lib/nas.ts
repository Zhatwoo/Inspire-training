import path from "path";
import fs from "fs";

const NAS_BASE_PATH = process.env.NAS_BASE_PATH || "//NAS/shared";

export function resolveNasPath(relativePath: string): string {
  const resolved = path.join(NAS_BASE_PATH, relativePath);

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
