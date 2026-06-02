import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { getProducts, saveProducts } from '@/lib/dataManager';

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
    const data = await getProducts();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const { action, data } = await request.json();
    const products = await getProducts();

    if (action === 'addCategory') {
      products.categories.push(data);
    } else if (action === 'updateCategory') {
      const idx = products.categories.findIndex((c: any) => c.id === data.id);
      if (idx !== -1) {
        products.categories[idx] = data;
      }
    } else if (action === 'deleteCategory') {
      products.categories = products.categories.filter((c: any) => c.id !== data.id);
    } else if (action === 'addProduct') {
      products.products.push(data);
    } else if (action === 'updateProduct') {
      const idx = products.products.findIndex((p: any) => p.id === data.id);
      if (idx !== -1) {
        products.products[idx] = data;
      }
    } else if (action === 'deleteProduct') {
      products.products = products.products.filter((p: any) => p.id !== data.id);
    }

    await saveProducts(products);
     const revalidateSecret = process.env.MY_SECRET_TOKEN; // Тот же секрет
    if (!revalidateSecret) {
      console.error('MY_SECRET_TOKEN is not defined. Revalidation for products skipped.');
    } else {
      const revalidateUrl = `http://localhost:3000/admin/api/revalidate?secret=${revalidateSecret}`;
      
      // Определяем пути, которые нужно перевалидировать.
      // Если меняются продукты, то скорее всего, нужно обновить:
      // - страницу со всеми категориями (/products)
      // - страницу конкретной категории (/products/[category])
      // - страницу конкретного продукта (/products/[category]/[product])
      const pathsToRevalidate = [
        '/products', // Главная страница продукции
        '/products/[category]', // Шаблон для всех страниц категорий продукции
        '/products/[category]/[product]', // Шаблон для всех детальных страниц продуктов
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
          console.log('Pages revalidated successfully after products update!');
        } else {
          console.error('Failed to revalidate pages for products:', await revalidateResponse.text());
        }
      } catch (revalidateError) {
        console.error('Error during revalidation fetch for products:', revalidateError);
      }
    }
    // --- КОНЕЦ НОВОГО КОДА ДЛЯ REVALIDATION ---

    return NextResponse.json({ success: true, revalidated: true });
  } catch (error) {
    console.error('Error updating products:', error);
    const message =
      error instanceof Error ? error.message : 'Failed to update products';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
