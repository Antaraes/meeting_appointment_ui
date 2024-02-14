import { type NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  console.log("env---", process.env.SERVER_PORT);
  console.log("middleware----");
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
