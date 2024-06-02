import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const typesenseConnectionCookie = request.cookies.get("typesense.connection");
  const pathname = request.nextUrl.pathname;

  if (pathname === "/" && typesenseConnectionCookie) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (pathname === "/dashboard" && !typesenseConnectionCookie) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/"],
};
