import "server-only";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

const SESSION_COOKIE = "compuz_session";
const SESSION_DAYS = 7;

export interface SessionUser {
  id: string;
  email: string;
  name: string | null;
}

// Verify email/password, create a session row + cookie. Returns the user or null.
export async function login(
  email: string,
  password: string
): Promise<SessionUser | null> {
  const user = await prisma.adminUser.findUnique({ where: { email } });
  if (!user) return null;

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return null;

  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);
  const session = await prisma.session.create({
    data: { userId: user.id, expiresAt },
  });

  cookies().set(SESSION_COOKIE, session.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });

  return { id: user.id, email: user.email, name: user.name };
}

export async function logout(): Promise<void> {
  const id = cookies().get(SESSION_COOKIE)?.value;
  if (id) {
    await prisma.session.deleteMany({ where: { id } });
  }
  cookies().delete(SESSION_COOKIE);
}

// Returns the logged-in admin, or null. Deletes expired sessions lazily.
export async function getCurrentUser(): Promise<SessionUser | null> {
  const id = cookies().get(SESSION_COOKIE)?.value;
  if (!id) return null;

  const session = await prisma.session.findUnique({ where: { id } });
  if (!session) return null;

  if (session.expiresAt < new Date()) {
    await prisma.session.deleteMany({ where: { id } });
    return null;
  }

  const user = await prisma.adminUser.findUnique({
    where: { id: session.userId },
  });
  if (!user) return null;

  return { id: user.id, email: user.email, name: user.name };
}

export async function requireUser(): Promise<SessionUser> {
  const user = await getCurrentUser();
  if (!user) throw new Error("UNAUTHORIZED");
  return user;
}

export { SESSION_COOKIE };
