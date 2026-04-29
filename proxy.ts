import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.BETTER_AUTH_SECRET,
  });

  if (!token) {
    const url = new URL("/signin", req.url);
    url.searchParams.set("callbackUrl", encodeURI(req.url));
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/create",
    "/reports",
    "/reports/:path*",
    "/api/private-tour/:path*",
    "/private-request",
  ],
};
