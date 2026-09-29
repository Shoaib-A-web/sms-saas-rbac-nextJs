// proxy.js

import { NextResponse } from "next/server";

const protectedRoutes = [
  "/",
  "/dashboard",
  "/school",
  "/students",
  "/teachers",
  "/master",
  "/settings",
];

const authRoutes = [
  "/login",
  "/register",
  "/forgot-password",
];

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  const isProtectedRoute = protectedRoutes.some(
    (route) =>
      pathname === route ||
      pathname.startsWith(`${route}/`)
  );

  const isAuthRoute = authRoutes.some(
    (route) =>
      pathname === route ||
      pathname.startsWith(`${route}/`)
  );

  // We will check the session here.
  const sessionToken = request.cookies.get("sms_session")?.value;

  const isLoggedIn = !!sessionToken;


  // Not logged in -> protected page
  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  // Already logged in -> auth page
  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(
      new URL("/", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/school/:path*",
    "/students/:path*",
    "/teachers/:path*",
    "/settings/:path*",
    "/master/:path*",
    "/login",
    "/register",
    "/forgot-password",
  ],
};