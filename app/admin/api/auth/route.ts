import { NextRequest, NextResponse } from 'next/server';
import { login, logout, isAuthenticated } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { action, password } = await request.json();

    if (action === 'login') {
      const success = await login(password);
      if (success) {
        return NextResponse.json({ success: true });
      } else {
        return NextResponse.json({ success: false, error: 'Invalid password' }, { status: 401 });
      }
    }

    if (action === 'logout') {
      await logout();
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  const authenticated = await isAuthenticated();
  return NextResponse.json({ authenticated });
}
