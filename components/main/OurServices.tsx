"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import companyData from "@/data/main.json";

export default function OurServices() {
  const services = companyData.main.technologies;

  return (
    <section className="relative py-20 bg-[url('/images/main/bg_services.png')] bg-center bg-cover">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        {/* Заголовок */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl font-bold mb-4"
        >
          Наши технологии
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto mb-12"
        >
          “Буртехнологии” – сервисная компания, предоставляющая широкий спектр
          буровых растворов, тампонажных составов, вязко-упругих составов и других систем.
        </motion.p>

        {/* Сетка карточек */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 mb-12">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative bg-white rounded-xl shadow-md overflow-hidden group cursor-pointer "
            >
              {/* Фон с картинкой при hover */}
              {service.background && (
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ backgroundImage: `url(${service.background})` }}
                />
              )}
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Контент */}
              <a href={service.link}>
                <div className="relative z-10 flex flex-col items-center justify-center h-52 p-6 text-center min-w-full sm:min-w-[285px] min-h-[200px] sm:min-h-[285px]">
                <div className="w-14 h-14 mb-4 flex items-center justify-center">
                  <img
                    src={service.icon}
                    alt={service.title}
                    className="transition-all duration-500 group-hover:invert group-hover:brightness-0"
                  />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 group-hover:text-white">
                  {service.title}
                </h3>
              </div>
              </a>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          <p className="text-xl font-semibold">
            Узнать больше о наших технологиях
          </p>
          <Link
            href="/technologies"
            className="px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold shadow-md hover:bg-primary-700 transition-colors"
          >
            Смотреть технологии
          </Link>
        </div>
      </div>
    </section>
  );
}
