import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { getTechnologies, saveTechnologies } from '@/lib/dataManager';

async function requireAuth() {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return null;
}

export async function GET() {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const data = await getTechnologies();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching technologies:', error);
    return NextResponse.json({ error: 'Failed to fetch technologies' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const { action, data } = await request.json();
    const technologies = await getTechnologies();

    if (action === 'addCategory') {
      technologies.realTechnologies.push(data);
    } else if (action === 'updateCategory') {
      const idx = technologies.realTechnologies.findIndex((c: any) => c.id === data.id);
      if (idx !== -1) {
        technologies.realTechnologies[idx] = data;
      }
    } else if (action === 'deleteCategory') {
      technologies.realTechnologies = technologies.realTechnologies.filter((c: any) => c.id !== data.id);
    } else if (action === 'addSystem') {
      technologies.systems.push(data);
    } else if (action === 'updateSystem') {
      const idx = technologies.systems.findIndex((s: any) => s.id === data.id);
      if (idx !== -1) {
        technologies.systems[idx] = data;
      }
    } else if (action === 'deleteSystem') {
      technologies.systems = technologies.systems.filter((s: any) => s.id !== data.id);
    }

    await saveTechnologies(technologies);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating technologies:', error);
    return NextResponse.json({ error: 'Failed to update technologies' }, { status: 500 });
  }
}
