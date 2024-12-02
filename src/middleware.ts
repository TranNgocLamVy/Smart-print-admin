import { NextResponse, type NextRequest } from "next/server";

// const publicPaths = ["/login"];

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  //   const token = request.cookies.get("token");
  //   if (!token && !publicPaths.includes(request.nextUrl.pathname)) {
  //     return NextResponse.redirect("/login");
  //   }

  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/signin", request.nextUrl));
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
