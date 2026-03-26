import { NextResponse } from "next/server";
import { resolveNasPath, getNasFileSize } from "@/lib/nas";
import fs from "fs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path: pathSegments } = await params;
    const relativePath = decodeURIComponent(pathSegments.join("/"));
    const fullPath = resolveNasPath(relativePath);

    if (!fs.existsSync(fullPath)) {
      return NextResponse.json({ error: "PDF not found" }, { status: 404 });
    }

    const fileSize = getNasFileSize(relativePath);
    const stream = fs.createReadStream(fullPath);

    const readableStream = new ReadableStream({
      start(controller) {
        stream.on("data", (chunk) => controller.enqueue(chunk));
        stream.on("end", () => controller.close());
        stream.on("error", (err) => controller.error(err));
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
