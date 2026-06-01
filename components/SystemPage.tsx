'use client'; // Добавил use client, так как используем motion в Hero

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import technologiesData from "@/data/technologies.json";
import { StaggerContainer, FadeInUp } from "@/components/animations/Motion"; // Твои компоненты
import BackButton from "@/components/BackButton"; // Твой компонент
import SampleRequestButton from "@/components/SampleRequestButton_tech"; // Твой компонент

interface Props { params: { category: string, system: string } }

export default function SystemPage({ params }: Props) {
  const { category, system } = params;
  
  // Ищем систему по slug
  const item = technologiesData.systems.find(s => s.slug === system); 
  
  if (!item) return <div className="min-h-screen flex items-center justify-center text-2xl font-bold">Система не найдена</div>;

  return (
    <main className="pb-20 bg-white">
      {/* 1. HERO BLOCK */}
      <div className="relative bg-gray-900 py-12 sm:py-8 sm:py-12 lg:py-16 lg:py-20 lg:py-28 text-white mb-12">
        <div className="absolute inset-0 overflow-hidden">
             <div className="absolute inset-0 bg-black/60 z-10"></div>
             {/* Добавил фолбэк картинку, если в JSON пусто */}
             <Image src={item.heroImage || "/images/tech-bg.jpg"} alt={item.title} fill className="object-cover opacity-60" priority />
        </div>
        <div className="container-custom relative z-20">
          <BackButton fallbackHref={`/technologies/${category}`} className="text-gray-100 hover:text-white mb-6 border-white/20" />
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} 
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 max-w-4xl"
          >
            {item.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl"
          >
            {item.subtitle}
          </motion.p>
        </div>
      </div>

      <div className="container-custom">
        <StaggerContainer className="grid lg:grid-cols-12 gap-6 sm:gap-12">
          
          {/* ЛЕВАЯ КОЛОНКА: Основной контент (8 cols) */}
          <div className="lg:col-span-8">
            
            {/* 2. KEY STATS GRID (Динамические плашки с параметрами) */}
            {item.specs && Object.keys(item.specs).length > 0 && (
              <FadeInUp>
                {/* Используем flex-wrap вместо жесткого grid, чтобы плашки красиво 
                    растягивались вне зависимости от их количества (2, 3, 4 или 5) */}
                <div className="flex flex-wrap gap-4 mb-12">
                  {Object.entries(item.specs).map(([specName, specValue]) => (
                    <div 
                      key={specName} 
                      className="flex-1 min-w-[160px] bg-gray-50 p-5 rounded-2xl border border-gray-100 text-center"
                    >
                      <span className="block text-sm text-gray-500 mb-1 uppercase tracking-wider">
                        {specName}
                      </span>
                      <span className="text-base sm:text-xl md:text-2xl font-bold text-primary-600">
                        {specValue as string}
                      </span>
                    </div>
                  ))}
                </div>
              </FadeInUp>
            )}

            {/* 3. ОПИСАНИЕ */}
            <FadeInUp>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">Описание системы</h2>
              <div className="prose prose-lg text-gray-600 mb-12 max-w-none">
                <p className="whitespace-pre-line leading-relaxed">{item.fullDescription}</p>
              </div>
            </FadeInUp>

            {/* 4. ПРЕИМУЩЕСТВА */}
            {item.advantages && item.advantages.length > 0 && (
              <FadeInUp>
                <div className="bg-primary-50 rounded-3xl p-8 mb-12 border border-primary-100">
                  <h3 className="text-2xl font-bold mb-6 text-gray-900">Ключевые преимущества</h3>
                  <ul className="grid md:grid-cols-2 gap-x-6 gap-y-4">
                    {item.advantages.map((adv, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="mt-1 shrink-0 w-6 h-6 rounded-full bg-primary-600 flex items-center justify-center">
                           <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <span className="text-gray-800 font-medium leading-relaxed">{adv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeInUp>
            )}

             {/* 5. ОБЛАСТЬ ПРИМЕНЕНИЯ */}
             {item.applicationArea && (
               <FadeInUp>
                 <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900">Область применения</h2>
                 <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-10 leading-relaxed border-l-4 border-gray-200 pl-4 py-1">
                   {item.applicationArea}
                 </p>
               </FadeInUp>
             )}
          </div>

          {/* ПРАВАЯ КОЛОНКА: Сайдбар (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* БЛОК: Основные компоненты системы */}
            {item.components && item.components.length > 0 && (
              <FadeInUp delay={0.2}>
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm sticky top-24">
                  <h4 className="font-bold text-xl mb-3 text-gray-900">Компоненты системы</h4>
                  <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                    Рекомендуемые компоненты для приготовления данной системы (производства компании "ПСК "Буртехнологии"):
                  </p>
                  <ul className="space-y-4">
                    {item.components.map((comp) => (
                      <li key={comp.name} className="flex items-center justify-between group">
                          <span className="text-gray-800 font-medium flex-1 pr-4">
                              {comp.name}
                          </span>
                          {comp.slug ? (
                              <Link 
                                href={`/products/${comp.category}/${comp.slug}`} 
                                className="text-xs bg-gray-50 border border-gray-200 group-hover:bg-primary-50 group-hover:border-primary-200 group-hover:text-primary-700 text-gray-600 px-3 py-1.5 rounded-full transition-all whitespace-nowrap"
                              >
                                  См. продукт
                              </Link>
                          ) : (
                              <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded">Скоро</span>
                          )}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeInUp>
            )}

            {/* CTA БЛОК */}
              <div className="bg-gray-900 rounded-2xl p-8 text-white text-center shadow-lg relative overflow-hidden">
                {/* Декоративный круг в фоне CTA */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary-600 rounded-full blur-3xl opacity-20"></div>
                
                <h4 className="font-bold text-2xl mb-3 relative z-10">Нужна консультация?</h4>
                <p className="text-gray-300 text-base mb-8 relative z-10">
                  Наши технологи помогут адаптировать рецептуру под условия вашей скважины.
                </p>
                <div className="relative z-10">
                  <SampleRequestButton 
                    productName={`Запрос по системе: ${item.title}`}
                    label="Связаться с технологом"
                    className="w-full bg-primary-600 hover:bg-primary-500 text-white py-4 rounded-xl font-bold transition-all shadow-md hover:shadow-primary-500/30 hover:-translate-y-1"
                  />
                </div>
              </div>

          </div>
        </StaggerContainer>
      </div>
    </main>
  );
}
