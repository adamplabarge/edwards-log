import { Auth0Client } from "@auth0/nextjs-auth0/server";
import { NextResponse } from "next/server";
import prisma from "./prisma";

export const auth0 = new Auth0Client({
  async onCallback(error, context, session) {
    
    if (error) {
      return NextResponse.redirect(
        new URL(`/error?error=${error.message}`, process.env.APP_BASE_URL)
      );
    }

    const user = session?.user;
    
    if (user && user.sub) {
      try {
        await prisma.user.upsert({
          where: { sub: user.sub },
          update: {
            sub: user.sub,
          },
          create: {
            sub: user.sub,
          },
        });
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : 'Unknown error';
        return NextResponse.redirect(
          new URL(`/error?error=${errorMessage}`, process.env.APP_BASE_URL)
        );
      }
      
    }

    return NextResponse.redirect(
      new URL("/dashboard", process.env.APP_BASE_URL)
    );
  },
});