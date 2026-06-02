"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FiCalendar, FiArrowRight, FiClock, FiStar } from "react-icons/fi";

// 1. Интерфейс
interface NewsItem {
  id: string;
  title: string;
  description: string;
  date: string;
  image: string;
  readTime?: string;
  category: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

interface PressPageProps {
  news: NewsItem[];
}

export default function PressPage({ news }: PressPageProps) {
  const featuredNews = news[0];
  const regularNews = news.slice(1);
  return (
    <section className="min-h-screen bg-gray-50 py-8 sm:py-12 lg:py-16 px-4 sm:px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Хедер страницы */}
        <div className="mb-12">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 sm:text-5xl mb-4"
          >
            Новости
          </motion.h1>
          <div className="h-1 w-20 bg-blue-600 rounded"></div>
        </div>

        {/* 1. Блок ГЛАВНОЙ новости (Featured) */}
        {featuredNews && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <Link href={`/press/${featuredNews.id}`} className="group block">
              <div className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 grid grid-cols-1 lg:grid-cols-2">
                
                {/* Левая часть - Картинка (на моб. сверху) */}
                <div className="relative h-64 lg:h-auto overflow-hidden">
                  <Image
                    src={featuredNews.image}
                    alt={featuredNews.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority // Загружаем картинку главной новости сразу
                  />
                  <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide flex items-center shadow-lg">
                    <FiStar className="mr-1" /> {featuredNews.category}
                  </div>
                </div>

                {/* Правая часть - Контент */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
                    <div className="flex items-center">
                      <FiCalendar className="mr-1.5" />
                      <span>{featuredNews.date}</span>
                    </div>
                    <div className="flex items-center">
                      <FiClock className="mr-1.5" />
                      <span>{featuredNews.readTime}</span>
                    </div>
                  </div>

                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors leading-tight">
                    {featuredNews.title}
                  </h2>

                  <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-8 line-clamp-3 lg:line-clamp-4">
                    {featuredNews.description}
                  </p>

                  <div className="flex items-center text-blue-600 font-bold text-lg">
                    Читать новость
                    <FiArrowRight className="ml-2 transform group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* 2. Сетка ОСТАЛЬНЫХ новостей */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8"
        >
          {regularNews.map((item) => (
            <motion.article
              key={item.id}
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-full border border-gray-100 group"
            >
              <div className="relative h-52 w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-800 uppercase tracking-wide">
                  {item.category}
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center text-xs text-gray-500 mb-3 space-x-3">
                  <span>{item.date}</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span>{item.readTime}</span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  <Link href={`/press/${item.id}`}>
                    <span className="absolute" /> 
                    {item.title}
                  </Link>
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-3 text-sm flex-grow">
                  {item.description}
                </p>

                <div>
                  <Link href={`/press/${item.id}`} className="text-blue-600 text-sm font-semibold flex items-center mt-auto">
                    Подробнее <FiArrowRight className="ml-1 group-hover:translate-x-1 transition-transform"/>
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
