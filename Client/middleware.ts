import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  // Read the accessToken cookie from the request
  const accessToken = req.cookies.get("accessToken")?.value;

  console.log("AccessToken:", accessToken);

  if (!accessToken) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/design",
    "/design/view",
    "/design/view/:id*",
    "/manage",
    "/design/confirmation",
    "/design/confirmation/:id*",
  ],
};
