import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import crypto from 'crypto';

const sessionOptions = {
  password: process.env.ADMIN_SESSION_SECRET || 'default-secret-key-change-this-in-production',
  cookieName: 'admin-session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },
};

export interface AdminSession {
  isLoggedIn?: boolean;
  adminId?: string;
}

export async function getSession() {
  const cookieStore = await cookies();
  const session = await getIronSession<AdminSession>(cookieStore, sessionOptions);
  return session;
}

export async function login(password: string) {
  const adminPassword = process.env.ADMIN_PASSWORD || 'change-me-to-strong-password';
  
  if (password !== adminPassword) {
    return false;
  }

  const session = await getSession();
  session.isLoggedIn = true;
  session.adminId = crypto.randomBytes(8).toString('hex');
  await session.save();
  
  return true;
}

export async function logout() {
  const session = await getSession();
  session.destroy();
}

export async function isAuthenticated() {
  const session = await getSession();
  return session.isLoggedIn === true;
}
