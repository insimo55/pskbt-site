import HeroSlider from "@/components/main/HeroSlider";
import OurAdvantages from '@/components/main/OurAdvantages';
import OurServices from '@/components/main/OurServices';
import Testimonials from '@/components/main/Testimonials';
import ProductsPreview from '@/components/main/ProductsPreview';
import LatestNews from '@/components/main/LatestNews';
import { getNews } from '@/lib/dataManager';

export default async function Home() {
  const news = await getNews();
  return (
     <>
      <HeroSlider />
      <OurAdvantages/>
      {/* Остальные секции */}
      <OurServices/>
      <Testimonials/>
      <ProductsPreview/>
      <LatestNews news={news} />
    </>
  );
}