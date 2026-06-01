"use client";

import { motion } from "framer-motion";

// Конфигурация для каждой "кляксы"
// Мы создаем несколько, чтобы они пересекались и создавали красивый эффект
const blobs = [
  {
    // Фиолетовая клякса
    classes: "bg-white",
    initial: { x: "-10%", y: "-10%", rotate: 0, scale: 1 },
    animate: {
      x: ["-10%", "20%", "-15%", "0%", "-10%"],
      y: ["-10%", "-20%", "25%", "10%", "-10%"],
      rotate: [0, 15, -10, 20, 0],
      scale: [1, 1.2, 0.9, 1.1, 1],
    },
    transition: {
      duration: 15,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "mirror",
    },
  },
  {
    // Синяя клякса
    classes: "bg-gray-400",
    initial: { x: "20%", y: "15%", rotate: 20, scale: 1.2 },
    animate: {
      x: ["20%", "-10%", "25%", "-5%", "20%"],
      y: ["15%", "20%", "-20%", "25%", "15%"],
      rotate: [20, 0, 15, -10, 20],
      scale: [1.2, 1, 1.3, 0.8, 1.2],
    },
    transition: {
      duration: 20,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "mirror",
      delay: 2, // Небольшая задержка, чтобы они двигались не синхронно
    },
  },
  {
    // Индиго клякса для глубины
    classes: "bg-gray-600",
    initial: { x: "-20%", y: "20%", rotate: -20, scale: 1.1 },
    animate: {
      x: ["-20%", "10%", "-25%", "15%", "-20%"],
      y: ["20%", "-15%", "10%", "-20%", "20%"],
      rotate: [-20, 10, 0, -15, -20],
      scale: [1.1, 0.9, 1.2, 1, 1.1],
    },
    transition: {
      duration: 15,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "mirror",
      delay: 4,
    },
  },
];

export default function AnimatedGradientBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-gray-900">
      <div className="relative w-full h-full">
        {blobs.map((blob, i) => (
          <motion.div
            key={i}
            initial={blob.initial}
            animate={blob.animate}
            // @ts-ignore
            transition={blob.transition}
            // Стили для создания эффекта
            // w-1/2 h-1/2: Большой размер
            // rounded-full: Круглая форма
            // opacity-40: Полупрозрачность для смешивания цветов
            // blur-[100px]: ОЧЕНЬ сильное размытие - это ключ к эффекту "пара"
            className={`absolute w-1/2 h-1/2 rounded-full opacity-40 blur-[100px] md:blur-[150px] ${blob.classes}`}
          />
        ))}
      </div>
    </div>
  );
}
