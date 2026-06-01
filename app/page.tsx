'use client'; 
import Link from 'next/link';
import HeroSlider from "@/components/main/HeroSlider";
import OurAdvantages from '@/components/main/OurAdvantages';
import OurServices from '@/components/main/OurServices';
import Testimonials from '@/components/main/Testimonials';
import ProductsPreview from '@/components/main/ProductsPreview';
import LatestNews from '@/components/main/LatestNews';

export default function Home() {
  return (
     <>
      <HeroSlider />
      <OurAdvantages/>
      {/* Остальные секции */}
      <OurServices/>
      <Testimonials/>
      <ProductsPreview/>
      <LatestNews />
    </>
  );
}