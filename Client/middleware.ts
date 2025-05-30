import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;

  // If token exists and user is trying to access /signin or /signup, redirect to home
  if (
    token &&
    (req.nextUrl.pathname === "/signin" || req.nextUrl.pathname === "/signup")
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // If token does not exist and user is trying to access protected routes, redirect to signin
  if (
    !token &&
    ["/", "/design", "/design/view", "/manage", "/design/confirmation"].some(
      (path) => req.nextUrl.pathname.startsWith(path)
    )
  ) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/signin",
    "/signup",
    "/design",
    "/design/view/:id*",
    "/manage",
    "/design/confirmation",
    "/design/confirmation/:id*",
  ],
};
