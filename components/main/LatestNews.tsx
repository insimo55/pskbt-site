"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight, FiCalendar } from "react-icons/fi";
import { news } from "@/data/press"; // Импортируем данные

export default function LatestNews() {
  // Берем только первые 3 новости
  // 1-я пойдет в большую карточку, 2-я и 3-я в боковую колонку
  const latestNews = news.slice(0, 3);
  const featured = latestNews[0];
  const sideNews = latestNews.slice(1, 3);

  if (!featured) return null;

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Заголовок секции */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Новости и события
          </motion.h2>
          <motion.p
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="text-sm sm:text-base text-blue-600 max-w-2xl mx-auto"
          >
            Следите за нашими последними разработками и жизнью компании
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8 mb-12">
          
          {/* ЛЕВАЯ КОЛОНКА: Большая карточка (занимает 2 части из 3) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <Link href={`/press/${featured.id}`} className="group relative block h-full min-h-[300px] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
              {/* Картинка */}
              <div className="absolute inset-0">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Градиент, чтобы текст читался на картинке */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              </div>

              {/* Контент поверх картинки (внизу) */}
              <div className="absolute bottom-0 left-0 p-4 sm:p-6 lg:p-8 w-full">
                <div className="flex items-center text-white/90 text-sm mb-3 space-x-4">
                  <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                    {featured.category}
                  </span>
                  <div className="flex items-center">
                    <FiCalendar className="mr-2" />
                    {featured.date}
                  </div>
                </div>

                <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-white mb-3 leading-tight group-hover:text-primary-400 transition-colors">
                  {featured.title}
                </h3>
                
                <p className="text-gray-200 line-clamp-2 mb-4 md:w-3/4">
                  {featured.description}
                </p>

                <div className="inline-flex items-center text-white font-semibold group-hover:underline">
                  Читать новость <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* ПРАВАЯ КОЛОНКА: Две карточки поменьше (вертикальный стек) */}
          <div className="flex flex-col gap-4 sm:gap-8 lg:col-span-1">
            {sideNews.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="flex-1"
              >
                <Link href={`/press/${item.id}`} className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
                  {/* Картинка */}
                  <div className="relative h-32 w-full overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded-md text-xs font-semibold text-gray-800">
                      {item.category}
                    </div>
                  </div>

                  {/* Текст */}
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="text-xs text-gray-500 mb-2 flex items-center">
                      <FiCalendar className="mr-1.5" />
                      {item.date}
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-500 transition-colors">
                      {item.title}
                    </h4>
                    <div className="mt-auto text-primary-500 text-sm font-medium flex items-center">
                      Подробнее <FiArrowRight className="ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Кнопка "Все новости" */}
        <div className="flex justify-center">
          <Link
            href="/press"
            className="px-6 sm:px-8 py-3 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-primary-500 hover:text-white hover:border-transparent transition-all duration-300 shadow-sm hover:shadow-md"
          >
            Все новости компании
          </Link>
        </div>

      </div>
    </section>
  );
}
