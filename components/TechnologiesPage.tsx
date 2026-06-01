"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiChevronRight, FiCheckCircle, FiTrendingUp, FiGlobe } from 'react-icons/fi';
import techData from "@/data/technologies.json";
// import companyData from "@/data/main.json"; // Оставил, если понадобится позже

export default function TechnologiesPage() {
  const services = techData.realTechnologies;

  // Данные для новой секции "Преимущества" (можно тоже потом вынести в JSON)
  const advantages = [
    { icon: <FiGlobe />, title: "Экологичность", desc: "Сниженное воздействие на окружающую среду благодаря инновационным составам." },
    { icon: <FiTrendingUp />, title: "Эффективность", desc: "Увеличение скорости бурения и снижение непроизводительного времени." },
    { icon: <FiCheckCircle />, title: "Надежность", desc: "Стабильная работа даже в самых сложных геологических условиях." },
  ];

  return (
    <div className="min-h-screen">
      
      {/* 1. Hero Section */}
      <section className="relative bg-[url('/images/tech-bg.jpg')] bg-center bg-cover bg-black/60 bg-blend-multiply text-white py-32">
        <div className="container-custom text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 40 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            Технологические <span className="text-primary-500">Решения</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed"
          >
            Современные разработки и инновационные материалы для эффективного и безопасного строительства скважин.
          </motion.p>
        </div>
      </section>

      {/* 2. Main Technologies Section */}
      <section className="py-12 sm:py-8 sm:py-12 lg:py-16 lg:py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Основные <span className="text-primary-600">Технологии</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
              Мы предлагаем широкий спектр буровых, тампонажных и технологических жидкостей,
              обеспечивающих стабильность, безопасность и эффективность бурения.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
            {services.map((tech, index) => (
              <Link 
                href={`/technologies/${tech.id}`} // Предполагаемый роутинг
                key={tech.id}
                className="w-full sm:w-[calc(50%-2rem)] lg:w-[calc(33.333%-2rem)]"
              >
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 h-full min-h-[380px] flex flex-col"
                >
                  {/* Background Image on Hover */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 opacity-0 group-hover:opacity-100 group-hover:scale-110"
                    style={{ backgroundImage: `url(${tech.background})` }}
                  />
                  
                  {/* Dark Overlay on Hover */}
                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Card Content */}
                  <div className="relative z-10 p-8 flex flex-col items-center text-center h-full">
                    {/* Иконка через Next/Image */}
                    <div className="w-16 h-16 mb-6 relative flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:brightness-200">
                      <Image
                        src={tech.icon}
                        alt={tech.title}
                        width={64}
                        height={64}
                        className="object-contain drop-shadow-md"
                      />
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-4 transition-colors duration-300 group-hover:text-white">
                      {tech.title}
                    </h3>

                    <p className="text-base text-gray-600 leading-relaxed mb-6 transition-colors duration-300 group-hover:text-gray-300 flex-grow">
                      {tech.descr}
                    </p>

                    {/* Кнопка "Подробнее" из старого дизайна, адаптированная под ховер */}
                    <div className="mt-auto flex items-center text-primary-600 font-semibold group-hover:text-primary-400 transition-colors duration-300">
                      Подробнее
                      <FiChevronRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Дополнительная секция: Преимущества (Для наполнения) */}
      <section className="py-12 sm:py-8 sm:py-12 lg:py-16 lg:py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Преимущества наших решений</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {advantages.map((adv, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                className="flex flex-col items-center text-center p-6"
              >
                <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center text-primary-600 text-3xl mb-6">
                  {adv.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{adv.title}</h3>
                <p className="text-gray-600">{adv.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
