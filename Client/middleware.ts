// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  // Try multiple ways to get the token
  const token =
    req.cookies.get("accessToken")?.value ||
    req.cookies.get("access_token")?.value ||
    req.headers.get("Authorization")?.replace("Bearer ", "");

  console.log("All cookies:", req.cookies.getAll()); // Debug all cookies
  console.log("AccessToken:", token); // Debug token value
  console.log("Current path:", req.nextUrl.pathname); // Debug current path

  // If no token, redirect to signin (unless already on signin page)
  if (!token || token === "undefined" || token.trim() === "") {
    if (req.nextUrl.pathname !== "/signin") {
      console.log("No valid token, redirecting to signin");
      return NextResponse.redirect(new URL("/signin", req.url));
    }
    return NextResponse.next();
  }

  // If token exists and user is on signin page, redirect to home
  if (req.nextUrl.pathname === "/signin") {
    console.log("Token exists, redirecting from signin to home");
    return NextResponse.redirect(new URL("/", req.url));
  }

  // If token exists and user is on a protected route, allow access
  console.log("Token exists, allowing access to:", req.nextUrl.pathname);
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/design",
    "/design/view",
    "/design/view/:id*",
    "/manage",
    "/design/confirmation",
    "/design/confirmation/:id*",
  ],
};
