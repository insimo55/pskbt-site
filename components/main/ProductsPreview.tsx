"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const products = [
  {
    title: "Тампонижные составы",
    image: "/images/main/products/cement.jpg",
    link: "/products/cementing",
  },
  {
    title: "Буровые растворы",
    image: "/images/main/products/mud.jpg",
    link: "/products/drilling",
  },
];

export default function ProductsPreview() {
  return (
    <section className="py-5 sm:py-20 bg-white">
      <div className="container-custom text-center px-4 sm:px-6">
        {/* Заголовок */}
        <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-gray-900 mb-8 sm:mb-12 leading-tight">
          Продукция и технологические решения <br />
          <span className="text-sm sm:text-base md:text-lg text-gray-500 font-normal">Материалы и составы для строительства нефтяных и газовых скважин</span>
        </h2>

        {/* Карточки */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 justify-center mb-8 sm:mb-12">
          {products.map((product, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              viewport={{ once: true }}
              className="group bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition relative"
            >
              {/* Изображение */}
              <div className="relative w-full h-48 sm:h-64 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500 pointer-events-none" />
              </div>

              {/* Нижний блок с текстом и кнопкой */}
              {/* Нижний блок с текстом и кнопкой — кнопка в потоке */}
                <div className="p-6 relative h-32 overflow-hidden">
                <div className="flex flex-col items-center">
                    {/* Контейнер, который будет «раскрываться» по высоте */}
                    <div className="w-full overflow-hidden transition-all duration-500 ease-in-out max-h-[56px] group-hover:max-h-[140px]">
                    {/* Заголовок — вверху контейнера */}
                    <h3 className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-lg font-semibold text-gray-900 transition-all duration-500 ease-in-out group-hover:top-6 group-hover:translate-y-0">
                        {product.title}
                    </h3>

                    {/* Блок кнопки — изначально скрыт за счёт max-h и opacity */}
                    <div className="absolute inset-x-0 bottom-6 opacity-0 translate-y-10 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:translate-y-0">
                        <Link
                        href={product.link}
                        className="inline-block px-6 py-2 border border-primary-500 text-primary-500 rounded-lg
                      bg-white/90 hover:bg-primary-500 hover:text-white transition"
                        >
                        Смотреть
                        </Link>
                    </div>
                    </div>
                </div>
                </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <span className="text-lg font-semibold text-gray-900">
            Посмотреть все наши продукты
          </span>
          <Link
            href="/products"
            className="px-6 py-3 bg-primary-500 text-white rounded-lg shadow hover:bg-primary-600 transition"
          >
            Смотреть продукты
          </Link>
        </div>
      </div>
    </section>
  );
}

