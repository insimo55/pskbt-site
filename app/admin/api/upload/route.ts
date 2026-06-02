import { NextRequest, NextResponse } from 'next/server';
import { writeFile, unlink } from 'fs/promises';
import path from 'path';
import { isAuthenticated } from '@/lib/auth';
import { existsSync } from 'fs';

async function requireAuth() {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return null;
}

export async function POST(request: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folder = formData.get('folder') as string;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create safe filename
    const timestamp = Date.now();
    const extension = file.name.split('.').pop();
    const filename = `${timestamp}.${extension}`;
    const filePath = path.join(process.cwd(), 'public', 'images', folder || 'uploads', filename);

    // Create directory if it doesn't exist
    const dir = path.dirname(filePath);
    try {
      await writeFile(filePath, buffer);
    } catch {
      // Directory might not exist, create it
      const { mkdir } = await import('fs/promises');
      await mkdir(dir, { recursive: true });
      await writeFile(filePath, buffer);
    }

    const publicPath = `/images/${folder || 'uploads'}/${filename}`;
    return NextResponse.json({ success: true, path: publicPath, filename });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const { filename } = await request.json();

    if (!filename) {
      return NextResponse.json({ error: 'No filename provided' }, { status: 400 });
    }

    // Security: only allow deletion of uploaded files
    if (filename.includes('..') || filename.startsWith('/')) {
      return NextResponse.json({ error: 'Invalid filename' }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), 'public', filename.startsWith('/') ? filename.slice(1) : filename);
    
    if (existsSync(filePath)) {
      await unlink(filePath);
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}
