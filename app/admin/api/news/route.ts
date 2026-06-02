import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { getNews, saveNews } from '@/lib/dataManager';
import {
  createNewsContentTemplate,
  deleteNewsContent,
  getNewsContent,
  newsContentExists,
  sanitizeNewsId,
  saveNewsContent,
} from '@/lib/newsContent';

async function requireAuth() {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return null;
}

export async function GET(request: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const id = request.nextUrl.searchParams.get('id');
    const news = await getNews();

    if (id) {
      const meta = news.find((n: { id: string }) => n.id === id);
      if (!meta) {
        return NextResponse.json({ error: 'News not found' }, { status: 404 });
      }

      const content = (await getNewsContent(id)) ?? '';
      return NextResponse.json({
        meta,
        content,
        hasContent: await newsContentExists(id),
      });
    }

    const withContentFlags = await Promise.all(
      news.map(async (item: { id: string }) => ({
        ...item,
        hasContent: await newsContentExists(item.id),
      }))
    );

    return NextResponse.json(withContentFlags);
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const { action, data, content } = await request.json();
    const news = await getNews();

    if (action === 'add') {
      sanitizeNewsId(data.id);
      news.push(data);
      const markdown =
        typeof content === 'string'
          ? content
          : createNewsContentTemplate(data.title);
      await saveNewsContent(data.id, markdown);
    } else if (action === 'update') {
      sanitizeNewsId(data.id);
      const idx = news.findIndex((n: { id: string }) => n.id === data.id);
      if (idx !== -1) {
        news[idx] = data;
      }
      if (typeof content === 'string') {
        await saveNewsContent(data.id, content);
      }
    } else if (action === 'delete') {
      const filtered = news.filter((n: { id: string }) => n.id !== data.id);
      await saveNews(filtered);
      await deleteNewsContent(data.id);
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
    }

    await saveNews(news);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating news:', error);
    const message = error instanceof Error ? error.message : 'Failed to update news';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
