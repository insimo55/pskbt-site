"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiHome } from "react-icons/fi";
import AnimatedGradientBackground from "../components/AnimatedGradientBackground"; // <-- 1. ИМПОРТИРУЕМ НАШ КОМПОНЕНТ

export default function NotFound() {
  return (
    // 2. УДАЛЯЕМ bg-gray-900 отсюда и добавляем `relative`
    <main className="relative flex flex-col items-center justify-center w-full min-h-screen text-center text-white px-4 overflow-hidden">
      {/* 3. ДОБАВЛЯЕМ ФОН */}
      <AnimatedGradientBackground />

      {/* 
        4. Оборачиваем весь контент в div с `z-10`, чтобы он был НАД фоном.
           Это важно, так как фон теперь отдельный элемент.
      */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <div className="relative flex items-center justify-center">
          {/* Анимированный фон за цифрами */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
            // 5. Делаем тень текста более выразительной на новом фоне
            className="absolute text-[250px] font-black text-black/20 -z-1"
          >
            404
          </motion.div>

          {/* ... остальной код без изменений ... */}
          <motion.div
            className="flex items-center space-x-2 text-8xl md:text-9xl font-bold z-10"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
          >
            {"404".split("").map((char, index) => (
              <motion.span
                key={index}
                className="bg-clip-text text-transparent bg-gradient-to-b from-primary-400 to-primary-600"
                variants={{
                  hidden: { y: 50, opacity: 0 },
                  visible: { y: 0, opacity: 1 },
                }}
                transition={{ duration: 0.5, type: "spring" }}
              >
                {char}
              </motion.span>
            ))}
          </motion.div>
        </div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-8 text-3xl md:text-4xl font-semibold text-gray-200"
        >
          Ой! Страница не найдена
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-4 max-w-md text-lg text-gray-400"
        >
          Кажется, вы свернули не на ту тропинку. Но не волнуйтесь, мы поможем вам вернуться домой.
        </motion.p>
        
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-12"
        >
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 12px rgba(var(--color-primary-500-rgb), 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 font-semibold text-white bg-primary-500 rounded-lg shadow-lg hover:bg-primary-600 transition-all duration-300"
            >
              <FiHome />
              Вернуться на главную
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}