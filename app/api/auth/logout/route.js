import { NextResponse } from "next/server";
import { deleteCurrentSession } from "@/lib/auth/session";

export async function POST() {
  try {
    await deleteCurrentSession();

    return NextResponse.json({
      message: "Logged out successfully.",
    });
  } catch (error) {
    console.error("LOGOUT_ERROR:", error);

    return NextResponse.json(
      {
        message: "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}