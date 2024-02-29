import { type NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export function middleware(req: NextRequest) {
  const cookiesList = cookies();
  const hasCookie = cookiesList.has("admin");
  const authnicatedUser = hasCookie;
  if (!authnicatedUser)
    return NextResponse.redirect(new URL("/forbidden", req.url));

  // if(req.nextUrl.pathname === '/forbidden' && authnicatedUser)
}

export const config = {
  matcher: "/dashboard/:path*",
};
