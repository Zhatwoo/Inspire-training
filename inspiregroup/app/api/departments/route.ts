import { NextResponse } from "next/server";

export async function GET() {
  try {
    const rows: any[] = []; // TODO: Implement NAS read
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Failed to fetch departments:", error);
    return NextResponse.json(
      { error: "Failed to fetch departments" },
      { status: 500 }
    );
  }
}
