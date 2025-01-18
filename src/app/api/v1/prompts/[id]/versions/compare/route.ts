import { VersionService } from "@/lib/services/version.service";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req });
    if (!token?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { versionId1, versionId2 } = await req.json();
    if (!versionId1 || !versionId2) {
      return NextResponse.json(
        { message: "Both version IDs are required" },
        { status: 400 }
      );
    }

    const comparison = await VersionService.compareVersions(versionId1, versionId2);
    return NextResponse.json(comparison);
  } catch (error) {
    console.error("Error comparing versions:", error);
    return NextResponse.json(
      { message: "Failed to compare versions" },
      { status: 500 }
    );
  }
}
