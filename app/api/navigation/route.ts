import { NextResponse } from 'next/server';
import { getProducts, getTechnologies } from '@/lib/dataManager';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const [productsData, technologiesData] = await Promise.all([
      getProducts(),
      getTechnologies(),
    ]);

    const productCategories = (productsData.categories || []).map((cat: any) => ({
      id: cat.id,
      title: cat.title,
      href: `/products/${cat.id}`,
      image: cat.image || '',
      description: cat.description || '',
    }));

    const technologyCategories = (technologiesData.realTechnologies || []).map(
      (cat: any) => ({
        id: cat.id,
        title: cat.title,
        href: `/technologies/${cat.id}`,
        background: cat.background || '',
        icon: cat.icon || '',
        descr: cat.descr || '',
      })
    );

    return NextResponse.json({ productCategories, technologyCategories });
  } catch (error) {
    console.error('Error building navigation payload:', error);
    return NextResponse.json(
      { error: 'Failed to load navigation data' },
      { status: 500 }
    );
  }
}
