import { NextResponse } from "next/server";
import { resolveNasPath, getNasFileSize, isHttpNas } from "@/lib/nas";
import fs from "fs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path: pathSegments } = await params;
    const relativePath = decodeURIComponent(pathSegments.join("/"));
    const fullPath = resolveNasPath(relativePath);
    console.log("[NAS Proxy PDF] Fetching from upstream:", fullPath);

    if (isHttpNas) {
      const response = await fetch(fullPath);

      if (!response.ok) {
        if (response.status === 404) {
          return NextResponse.json({ error: "PDF not found" }, { status: 404 });
        }
        throw new Error(`Upstream NAS returned ${response.status}`);
      }

      return new NextResponse(response.body as any, {
        status: response.status,
        headers: {
          "Content-Length": response.headers.get("Content-Length") || "",
          "Content-Type": response.headers.get("Content-Type") || "application/pdf",
          "Content-Disposition": `inline; filename="${pathSegments[pathSegments.length - 1]}"`,
        },
      });
    }

    if (!fs.existsSync(fullPath)) {
      return NextResponse.json({ error: "PDF not found" }, { status: 404 });
    }

    const fileSize = getNasFileSize(relativePath);
    const stream = fs.createReadStream(fullPath);

    const readableStream = new ReadableStream({
      start(controller) {
        stream.on("data", (chunk) => {
          try {
            controller.enqueue(chunk);
          } catch (e) {
            stream.destroy();
          }
        });
        stream.on("end", () => {
          try {
            controller.close();
          } catch (e) {}
        });
        stream.on("error", (err) => {
          try {
            controller.error(err);
          } catch (e) {}
        });
      },
      cancel() {
        stream.destroy();
      },
    });

    return new NextResponse(readableStream, {
      headers: {
        "Content-Length": String(fileSize),
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${pathSegments[pathSegments.length - 1]}"`,
      },
    });
  } catch (error) {
    console.error("PDF streaming error:", error);
    return NextResponse.json(
      { error: "Failed to stream PDF" },
      { status: 500 }
    );
  }
}
