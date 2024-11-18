import { NextResponse, type NextRequest } from "next/server";

// const publicPaths = ["/", "/login"];

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
