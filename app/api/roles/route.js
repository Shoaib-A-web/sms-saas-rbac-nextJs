import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    
    const roles = await prisma.role.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json({
      success: true,
      data: roles.filter((role)=> role.name !== "SUPER_ADMIN").map((role) => ({
        ...role,
        id: String(role.id),
      }
	)),
    });
  } catch (error) {
    console.error("GET /api/roles:", error);

    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "Unable to retrieve roles.",
        },
      },
      { status: 500 }
    );
  }
}