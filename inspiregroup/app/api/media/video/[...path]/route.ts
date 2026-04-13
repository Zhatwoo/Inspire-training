import { NextRequest, NextResponse } from "next/server";
import { resolveNasPath, getNasFileSize, isHttpNas } from "@/lib/nas";
import fs from "fs";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path: pathSegments } = await params;
    const relativePath = decodeURIComponent(pathSegments.join("/"));
    const fullPath = resolveNasPath(relativePath);
    console.log("[NAS Proxy Video] Fetching from upstream:", fullPath);

    if (isHttpNas) {
      const headers = new Headers();
      const range = request.headers.get("range");
      if (range) {
        headers.set("range", range);
      }

      const response = await fetch(fullPath, { headers });

      if (!response.ok) {
        if (response.status === 404) {
          return NextResponse.json({ error: "Video not found" }, { status: 404 });
        }
        throw new Error(`Upstream NAS returned ${response.status}`);
      }

      return new NextResponse(response.body as any, {
        status: response.status,
        headers: {
          "Content-Type": response.headers.get("Content-Type") || "video/mp4",
          "Content-Length": response.headers.get("Content-Length") || "",
          "Accept-Ranges": response.headers.get("Accept-Ranges") || "bytes",
          "Content-Range": response.headers.get("Content-Range") || "",
        },
      });
    }

    if (!fs.existsSync(fullPath)) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }

    const fileSize = getNasFileSize(relativePath);
    const range = request.headers.get("range");

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunkSize = end - start + 1;

      const stream = fs.createReadStream(fullPath, { start, end });
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
        status: 206,
        headers: {
          "Content-Range": `bytes ${start}-${end}/${fileSize}`,
          "Accept-Ranges": "bytes",
          "Content-Length": String(chunkSize),
          "Content-Type": "video/mp4",
        },
      });
    }

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
        "Content-Type": "video/mp4",
        "Accept-Ranges": "bytes",
      },
    });
  } catch (error) {
    console.error("Video streaming error:", error);
    return NextResponse.json(
      { error: "Failed to stream video" },
      { status: 500 }
    );
  }
}
