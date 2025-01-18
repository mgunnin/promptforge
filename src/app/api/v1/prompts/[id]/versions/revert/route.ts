import { VersionService } from "@/lib/services/version.service";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req });
    if (!token?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { versionId } = await req.json();
    if (!versionId) {
      return NextResponse.json(
        { message: "Version ID is required" },
        { status: 400 }
      );
    }

    const updatedPrompt = await VersionService.setActiveVersion(versionId);
    return NextResponse.json(updatedPrompt);
  } catch (error) {
    console.error("Error reverting to version:", error);
    return NextResponse.json(
      { message: "Failed to revert to version" },
      { status: 500 }
    );
  }
}
