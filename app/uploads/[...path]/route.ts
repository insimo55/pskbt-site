import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function getMimeType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg';
  if (ext === '.png') return 'image/png';
  if (ext === '.webp') return 'image/webp';
  if (ext === '.gif') return 'image/gif';
  if (ext === '.avif') return 'image/avif';
  if (ext === '.svg') return 'image/svg+xml';
  return 'application/octet-stream';
}

export async function GET(
  _request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const uploadsRoot = process.env.UPLOADS_DIR
      ? path.resolve(process.env.UPLOADS_DIR)
      : path.join(process.cwd(), 'public', 'images');

    const safeSegments = (params.path || []).filter((segment) =>
      /^[a-zA-Z0-9._-]+$/.test(segment)
    );
    if (safeSegments.length !== (params.path || []).length) {
      return NextResponse.json({ error: 'Invalid path' }, { status: 400 });
    }

    const filePath = path.join(uploadsRoot, ...safeSegments);
    const content = await readFile(filePath);
    const body = new Uint8Array(content);

    return new NextResponse(body, {
      status: 200,
      headers: {
        'Content-Type': getMimeType(filePath),
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch {
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }
}
