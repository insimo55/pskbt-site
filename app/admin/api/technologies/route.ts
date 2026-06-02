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
    const revalidateSecret = process.env.ADMIN_SESSION_SECRET; // Убедись, что ADMIN_SESSION_SECRET определен в .env.production
    if (!revalidateSecret) {
      console.error('ADMIN_SESSION_SECRET is not defined. Revalidation skipped.');
      // Можно вернуть ошибку или просто продолжить без ревалидации
    } else {
      const revalidateUrl = `http://localhost:3000/admin/api/revalidate?secret=${revalidateSecret}`; // ИЛИ абсолютный URL твоего сайта
                                                                                                    // например, `https://chem-application.ru/admin/api/revalidate?secret=${revalidateSecret}`
                                                                                                    // Если этот роут вызывается изнутри сервера (как здесь),
                                                                                                    // то `http://localhost:3000` обычно работает лучше,
                                                                                                    // так как избегает лишнего сетевого трафика через Nginx.

      // Определяем, какие пути нужно перевалидировать.
      // Если ты добавил/удалил/обновил категорию или систему,
      // затрагиваются страницы категорий и отдельных систем.
      const pathsToRevalidate = [
        '/technologies', // Главная страница технологий, если она есть
        '/technologies/[category]', // Шаблон для всех страниц категорий
        '/technologies/[category]/[system]', // Шаблон для всех страниц систем
      ];

      try {
        const revalidateResponse = await fetch(revalidateUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ paths: pathsToRevalidate }),
        });

        if (revalidateResponse.ok) {
          console.log('Pages revalidated successfully after technologies update!');
        } else {
          console.error('Failed to revalidate pages:', await revalidateResponse.text());
        }
      } catch (revalidateError) {
        console.error('Error during revalidation fetch:', revalidateError);
      }
    }

    return NextResponse.json({ success: true, revalidated: true });
  } catch (error) {
    console.error('Error updating technologies:', error);
    return NextResponse.json({ error: 'Failed to update technologies' }, { status: 500 });
  }
}
