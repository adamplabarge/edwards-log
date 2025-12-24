import { auth0 } from "./lib/auth0";

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"
  ],
};

export async function proxy(request: Request) {
  const response = await auth0.middleware(request);

  return response;
}
