import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    
    if (!/^\d+$/.test(id)) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "INVALID_ID",
            message: "Invalid school ID.",
          },
        },
        { status: 400 }
      );
    }

    const schoolId = BigInt(id);


    const school = await prisma.school.findUnique({
      where: { id: schoolId },
      select: { id: true },
    });

    if (!school) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "NOT_FOUND",
            message: "School not found.",
          },
        },
        { status: 404 }
      );
    }

    const branches = await prisma.branch.findMany({
      where: {
        school_id: schoolId,
      },
      select: {
        id: true,
        school_id: true,
        name: true,
        code: true,
        status: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json({
      success: true,
      data: branches.map((branch) => ({
        ...branch,
        id: String(branch.id),
        school_id: String(branch.school_id),
      })),
    });
  } catch (error) {
    console.error("GET /api/schools/[id]/branches:", error);

    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "Unable to retrieve branches.",
        },
      },
      { status: 500 }
    );
  }
}