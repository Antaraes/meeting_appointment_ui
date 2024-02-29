import { type NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export function middleware(req: NextRequest) {
  console.log("env---", process.env.SERVER_PORT);
  console.log("middleware----");
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
