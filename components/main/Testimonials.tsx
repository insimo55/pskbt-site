"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// стили
import "swiper/css";
import "swiper/css/navigation";

import companyData from "@/data/main.json";

export default function Testimonials() {
  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);

  const testimonials = companyData.main.testimonials;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <section className="py-10 pb-0 sm:py-20 bg-gray-50">
      <div className="container-custom px-4 sm:px-6">
        {/* Заголовок и логотипы */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 sm:mb-10">
            Более <span className="text-primary-600">20 лет</span> ведения работ
          </h2>
          <div className="flex items-center justify-center gap-4 sm:gap-8 md:gap-16 lg:gap-28 flex-wrap">
            {companyData.main.partners.map((partner, i) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="w-auto flex items-center"
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={220}
                  height={110}
                  className="object-contain"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Секция отзывов */}
        <div className="mb-8 max-w-[770px] mx-auto">
          <h3 className="text-lg sm:text-2xl font-bold text-gray-900 mb-8 sm:mb-10">
            Что наши <span className="text-primary-600">Заказчики</span> говорят о нас
          </h3>

          <div className="relative">
            <Swiper
              modules={[Navigation, Autoplay]}
              slidesPerView={1}
              loop={true}
              autoplay={{ delay: 6000, disableOnInteraction: false }}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              onBeforeInit={(swiper) => {
                // @ts-ignore
                swiper.params.navigation.prevEl = prevRef.current;
                // @ts-ignore
                swiper.params.navigation.nextEl = nextRef.current;
              }}
            >
              {testimonials.map((item, index) => (
                <SwiperSlide key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto text-center text-center lg:text-left"
                  >
                    <div className="flex items-center justify-center lg:justify-start mb-6">
                      <Image
                        src={item.logo}
                        alt={item.company}
                        width={180}
                        height={80}
                        className="object-contain"
                      />
                    </div>
                    <p className="text-gray-700 text-sm sm:text-base lg:text-lg mb-6">{item.text}</p>
                    <div className="text-xs sm:text-sm text-gray-500">
                      <span className="font-semibold text-gray-900 block">
                        {item.author}
                      </span>
                      {item.position}
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Стрелки */}
            <div
              ref={prevRef}
              className="absolute hidden sm:block bottom-[50%] left-1 -translate-x-16 translate-y-full z-10 cursor-pointer p-3 text-gray-700 hover:text-primary-600 hover:scale-150 transition-all"
            >
              ←
            </div>
            <div
              ref={nextRef}
              className="absolute hidden sm:block bottom-[50%] right-1 translate-x-8 translate-y-full z-10 cursor-pointer p-3 text-gray-700 hover:text-primary-600 hover:scale-150 transition-all"
            >
              →
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


