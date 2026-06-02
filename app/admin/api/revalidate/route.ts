// app/admin/api/revalidate/route.ts (или pages/api/admin/revalidate.ts, если ты используешь Pages Router для API)
import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache'; // Для App Router
// import { unstable_revalidate } from 'next/server'; // Если Pages Router, но для App Router лучше revalidatePath

export async function POST(request: NextRequest) {
  // Важно: Здесь нужно добавить проверку аутентификации,
  // чтобы только админка могла вызывать этот роут.
  // Например, проверку секрета или токена.
  const secret = request.nextUrl.searchParams.get('secret');
  if (secret !== process.env.MY_SECRET_TOKEN) { // MY_SECRET_TOKEN - это секрет, который ты сам придумаешь и хранишь в .env.production
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  try {
    const { paths } = await request.json(); // Ожидаем массив путей для ревалидации

    if (!Array.isArray(paths) || paths.length === 0) {
      return NextResponse.json({ message: 'No paths provided for revalidation' }, { status: 400 });
    }

    for (const p of paths) {
      if (typeof p === 'string') {
        revalidatePath(p); // Перевалидировать указанный путь
        console.log(`Revalidated path: ${p}`);
      }
    }

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    return NextResponse.json({ message: 'Error revalidating', error: err }, { status: 500 });
  }
}