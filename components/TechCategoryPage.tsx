'use client';

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiArrowLeft } from "react-icons/fi";

interface TechCategory {
  id: string;
  title: string;
  descr: string;
}

interface TechSystem {
  id: string;
  categoryId: string;
  slug: string;
  title: string;
  subtitle?: string;
  tags?: string[];
  shortDescription: string;
  cardImage?: string;
  categorySpecs?: Record<string, string>;
}

interface Props {
  params: { category: string };
  categories: TechCategory[];
  systemsData: TechSystem[];
}

export default function TechCategoryPage({ params, categories, systemsData }: Props) {
  const categoryId = params.category;
  const category = categories.find(c => c.id === categoryId);
  const systems = systemsData.filter(s => s.categoryId === categoryId);

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Категория не найдена</h2>
        <Link href="/technologies" className="text-primary-600 hover:underline">Вернуться к технологиям</Link>
      </div>
    );
  }

  return (
    <section className="py-12 sm:py-8 sm:py-12 lg:py-16 lg:py-20 bg-gray-50 min-h-screen relative">
      <div className="container-custom">
        <Link href="/technologies" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-primary-600 transition-colors mb-10">
          <FiArrowLeft className="mr-2 w-4 h-4" /> Назад к решениям
        </Link>

        <div className="mb-16 max-w-4xl">
          <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            {category.title}
          </motion.h1>
          <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="text-sm sm:text-base md:text-lg text-gray-600 border-l-4 border-primary-500 pl-4">
            {category.descr}
          </motion.p>
        </div>

        {systems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {systems.map((system, index) => (
              <motion.div key={system.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                <Link 
                  href={`/technologies/${categoryId}/${system.slug}`}
                  className="group block h-full bg-white rounded-2xl shadow-sm hover:shadow-xl hover:border-primary-500 border border-transparent transition-all duration-300 overflow-hidden flex flex-col"
                >
                   {/* НОВЫЙ БЛОК С КАРТИНКОЙ */}
                   <div className="relative h-56 w-full overflow-hidden bg-gray-200">
                      {/* Оверлей для затемнения (опционально) */}
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10 duration-500"></div>
                      <Image 
                        src={system.cardImage || "/images/tech-bg.jpg"} // Фолбэк картинка
                        alt={system.title}
                        fill
                        className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                      />
                   </div>
                   
                   {/* Контент карточки */}
                   <div className="p-8 flex flex-col flex-grow relative z-20">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                           <div className="w-12 h-1 bg-primary-500 rounded mb-3 group-hover:w-24 transition-all duration-300"></div>
                           <h3 className="text-2xl font-bold text-gray-900 mb-1">{system.title}</h3>
                           <p className="text-sm text-primary-600 font-medium">{system.subtitle}</p>
                        </div>
                        <div className="w-10 h-10 shrink-0 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition-all duration-300 transform group-hover:-translate-y-1 group-hover:translate-x-1">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {(system.tags || []).map(tag => (
                          <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium group-hover:bg-primary-50 group-hover:text-primary-700 transition-colors">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <p className="text-gray-600 mb-8 line-clamp-3 flex-grow">
                        {system.shortDescription}
                      </p>

                      {system.categorySpecs && Object.keys(system.categorySpecs).length > 0 && (
                        <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-6 mt-auto">
                          {Object.entries(system.categorySpecs).map(([specName, specValue]) => (
                            <div key={specName}>
                              <span className="text-[11px] text-gray-400 uppercase tracking-wider block mb-1">
                                {specName}
                              </span>
                              <p className="font-semibold text-gray-900 text-sm">
                                {specValue as string}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                   </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 sm:py-8 sm:py-12 lg:py-16 lg:py-20 bg-white rounded-2xl shadow-sm border border-gray-100"><h3 className="text-base sm:text-lg md:text-xl text-gray-500">Системы находятся в разработке.</h3></div>
        )}
      </div>
    </section>
  );
}
