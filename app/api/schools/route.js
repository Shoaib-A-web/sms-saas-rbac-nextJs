import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    
    const schools = await prisma.school.findMany({
      select: {
        id: true,
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
      data: schools.map((school) => ({
        ...school,
        id: String(school.id),
      }
	)),
    });
  } catch (error) {
    console.error("GET /api/schools:", error);

    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "Unable to retrieve schools.",
        },
      },
      { status: 500 }
    );
  }
}