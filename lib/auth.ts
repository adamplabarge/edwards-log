import { auth0 } from "@/lib/auth0";
import { prisma } from "@/lib/prisma";

export async function getCurrentUser() {
  const session = await auth0.getSession();

  if (!session?.user?.sub) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      sub: session.user.sub,
    },
  });

  if (!user) {
    // Optional: auto-create user on first login
    return await prisma.user.create({
      data: {
        sub: session.user.sub,
      },
    });
  }

  return user;
}
