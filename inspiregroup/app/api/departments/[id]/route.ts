import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const rows: any[] = []; // TODO: Implement NAS read
    if (rows.length === 0) {
      return NextResponse.json(
        { error: "Department not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error("Failed to fetch department:", error);
    return NextResponse.json(
      { error: "Failed to fetch department" },
      { status: 500 }
    );
  }
}
