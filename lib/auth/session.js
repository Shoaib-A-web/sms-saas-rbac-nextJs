import crypto from "crypto";
import { cookies } from "next/headers";
import { prisma } from ".././prisma";

const SESSION_COOKIE_NAME = "sms_session";

const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7;
// 7 days

function hashToken(token) {
  return crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
}

function generateToken() {
  return crypto.randomBytes(32).toString("hex");
}

export async function createSession(userId) {
  const rawToken = generateToken();
  const tokenHash = hashToken(rawToken);

  const expiresAt = new Date(
    Date.now() + SESSION_DURATION_SECONDS * 1000
  );

  await prisma.session.create({
    data: {
      session_token: tokenHash,
      user_id: userId,
      expires: expiresAt,
    },
  });

  const cookieStore = await cookies();

  cookieStore.set({
    name: SESSION_COOKIE_NAME,
    value: rawToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });

  return rawToken;
}

export async function getCurrentSession() {
  const cookieStore = await cookies();

  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

  if (!sessionCookie?.value) {
    return null;
  }

  const tokenHash = hashToken(sessionCookie.value);

  const session = await prisma.session.findUnique({
    where: {
      session_token: tokenHash,
    },
    include: {
      user: true,
    },
  });

  if (!session) {
    return null;
  }

  if (session.expires <= new Date()) {
    await prisma.session.delete({
      where: {
        id: session.id,
      },
    });

    return null;
  }

  if (session.user.status !== "ACTIVE") {
    return null;
  }

  return session;
}

export async function deleteCurrentSession() {
  const cookieStore = await cookies();

  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

  if (sessionCookie?.value) {
    const tokenHash = hashToken(sessionCookie.value);

    const session = await prisma.session.findUnique({
      where: {
        session_token: tokenHash,
      },
    });

    if (session) {
      await prisma.session.delete({
        where: {
          id: session.id,
        },
      });
    }
  }

  cookieStore.set({
    name: SESSION_COOKIE_NAME,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}