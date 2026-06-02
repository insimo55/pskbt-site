import fs from 'fs/promises';
import path from 'path';
export { createNewsContentTemplate, DEFAULT_NEWS_CONTENT } from './newsContentTemplates';

const defaultContentDir = path.join(process.cwd(), 'content');
const contentDir = process.env.CONTENT_DIR
  ? path.resolve(process.env.CONTENT_DIR)
  : defaultContentDir;

export function sanitizeNewsId(id: string): string {
  const cleaned = id.trim();
  if (!/^[a-zA-Z0-9_-]+$/.test(cleaned)) {
    throw new Error('Invalid news id');
  }
  return cleaned;
}

function getContentPath(id: string) {
  return path.join(contentDir, `${sanitizeNewsId(id)}.md`);
}

export async function getNewsContent(id: string): Promise<string | null> {
  try {
    return await fs.readFile(getContentPath(id), 'utf-8');
  } catch {
    return null;
  }
}

export async function saveNewsContent(id: string, content: string) {
  await fs.mkdir(contentDir, { recursive: true });
  await fs.writeFile(getContentPath(id), content, 'utf-8');
}

export async function deleteNewsContent(id: string) {
  try {
    await fs.unlink(getContentPath(id));
  } catch {
    // файл мог не существовать
  }
}

export async function newsContentExists(id: string): Promise<boolean> {
  try {
    await fs.access(getContentPath(id));
    return true;
  } catch {
    return false;
  }
}

export function getNextNewsId(news: { id: string }[]): string {
  const numericIds = news
    .map((n) => parseInt(n.id, 10))
    .filter((n) => !Number.isNaN(n));
  const max = numericIds.length ? Math.max(...numericIds) : 0;
  return String(max + 1);
}
