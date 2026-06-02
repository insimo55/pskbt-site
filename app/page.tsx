import HeroSlider from "@/components/main/HeroSlider";
import OurAdvantages from '@/components/main/OurAdvantages';
import OurServices from '@/components/main/OurServices';
import Testimonials from '@/components/main/Testimonials';
import ProductsPreview from '@/components/main/ProductsPreview';
import LatestNews from '@/components/main/LatestNews';
import { getNews, getProducts, getTechnologies } from '@/lib/dataManager';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
  const [news, productsData, techData] = await Promise.all([
    getNews(),
    getProducts(),
    getTechnologies(),
  ]);
  const productCategories = (productsData.categories || []).map((cat: any) => ({
    id: cat.id,
    title: cat.title,
    href: `/products/${cat.id}`,
    image: cat.image,
  }));
  const techCategories = (techData.realTechnologies || []).map((cat: any) => ({
    id: cat.id,
    title: cat.title,
    href: `/technologies/${cat.id}`,
    background: cat.background,
    icon: cat.icon,
  }));
  return (
     <>
      <HeroSlider />
      <OurAdvantages/>
      {/* Остальные секции */}
      <OurServices/>
      <Testimonials/>
      <ProductsPreview products={productCategories} />
      <LatestNews news={news} />
    </>
  );
}