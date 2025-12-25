import { auth0 } from "@/lib/auth0";
import { NextRequest } from "next/server";

export async function proxy(request: Request) {
  return await auth0.middleware(request as NextRequest);
}

export const config = {
  matcher: [
    "/dashboard/:path*"
  ],
};