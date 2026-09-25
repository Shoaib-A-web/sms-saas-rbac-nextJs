import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      message: "Axios API connection is working",
      timestamp: new Date().toISOString(),
    },
  });
}