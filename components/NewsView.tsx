"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft, FiCalendar, FiClock, FiTag, FiShare2 } from "react-icons/fi";
import ReactMarkdown from "react-markdown"; // Установи: npm install react-markdown

// Тип пропсов
interface NewsViewProps {
  post: {
    title: string;
    description: string;
    date: string;
    image: string;
    category: string;
    readTime?: string;
  };
  content: string; // Сюда прилетит чистый markdown текст
}

export default function NewsView({ post, content }: NewsViewProps) {
    
  return (
    <article className="min-h-screen bg-white">
       {/* --- HERO SECTION (Заголовок с фоном) --- */}
      <div className="relative min-h-[60vh] flex flex-col justify-end text-white">
        
        {/* 1. Фоновое изображение */}
        <div className="absolute inset-0 z-0">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority // Грузим сразу, это LCP элемент
          />
          {/* 2. Затемнение (Градиент), чтобы текст читался */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
        </div>

        {/* 3. Контент заголовка (поверх картинки) */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 pb-12 pt-32">
          
          {/* Кнопка Назад (теперь белая) */}
          <div className="absolute top-8 left-4 sm:left-6 lg:left-0 lg:-ml-12">
            <Link 
              href="/press" 
              className="inline-flex items-center text-white/80 hover:text-white transition-colors bg-black/20 hover:bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium"
            >
              <FiArrowLeft className="mr-2" />
              Назад
            </Link>
          </div>

          {/* Мета-информация */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap items-center gap-4 text-sm font-medium text-white/90 mb-6"
          >
            {/* Категория */}
            <span className="bg-primary-600/90 backdrop-blur text-white px-3 py-1 rounded-full flex items-center shadow-lg border border-white/10">
              <FiTag className="mr-2 w-3 h-3" /> {post.category}
            </span>
            
            {/* Дата и время */}
            <div className="flex items-center gap-4 bg-black/30 backdrop-blur px-4 py-1 rounded-full border border-white/10">
                <span className="flex items-center">
                <FiCalendar className="mr-1.5 w-4 h-4" /> {post.date}
                </span>
                {post.readTime && (
                <>
                    <span className="w-1 h-1 bg-white/50 rounded-full" />
                    <span className="flex items-center">
                    <FiClock className="mr-1.5 w-4 h-4" /> {post.readTime}
                    </span>
                </>
                )}
            </div>
          </motion.div>

          {/* Главный заголовок */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-shadow-sm"
          >
            {post.title}
          </motion.h1>
          
          {/* Лид (Описание) */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-3xl"
          >
            {post.description}
          </motion.p>
        </div>
      </div>

      {/* Основной контент */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        
       

        {/* Вставка Markdown */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="prose prose-lg prose-blue max-w-none text-gray-700"
        >
          <ReactMarkdown>{content}</ReactMarkdown>
        </motion.div>


        {/* Футер статьи (Поделиться) */}
        <div className="mt-16 pt-8 border-t border-gray-100 flex justify-between items-center">
          <div className="text-gray-500 font-medium">Поделиться новостью:</div>
          <div className="flex gap-4">
            <button className="p-2 bg-gray-100 rounded-full hover:bg-blue-100 hover:text-blue-600 transition-colors">
               <FiShare2 className="w-5 h-5" />
            </button>
            {/* Сюда можно добавить иконки соцсетей */}
          </div>
        </div>

      </div>
    </article>
  );
}
