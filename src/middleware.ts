import { type NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const authnicatedUser = true;
  if (!authnicatedUser)
    return NextResponse.redirect(new URL("/forbidden", req.url));

  // if(req.nextUrl.pathname === '/forbidden' && authnicatedUser)
}

export const config = {
  matcher: [
    "/dashboard/",
    "/dashboard/rooms",
    "/dashboard/departments",
    "/dashboard/appointments",
  ],
};
