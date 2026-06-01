"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

// Стили swiper
import "swiper/css";
import "swiper/css/navigation";

import companyData from "@/data/main.json";

export default function HeroSlider() {
  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);
  const swiperRef = useRef<any>(null);

  const slides = companyData.main.heroSlides;
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative h-[calc(100vh-80px)] w-full">
      <Swiper
        modules={[Navigation, Autoplay]}
        slidesPerView={1}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
          // @ts-ignore
          swiper.params.navigation.prevEl = prevRef.current;
          // @ts-ignore
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full">
              {/* Фон */}
              <Image
                src={slide.background}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50" />

              {/* Контент */}
              <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 lg:px-20">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="max-w-3xl text-white"
                >
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4 uppercase">
                    {slide.title}
                  </h1>
                  {slide.subtitle && (
                    <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-4 sm:mb-6">
                      {slide.subtitle}
                    </h2>
                  )}
                  <p className="text-sm sm:text-base md:text-lg mb-6 sm:mb-8">{slide.description}</p>
                  <div className="flex flex-wrap gap-2 sm:gap-4 mb-8 sm:mb-10">
                    {slide.buttons.map((btn, i) => (
                      <Link
                        key={i}
                        href={btn.href}
                        className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 text-xs sm:text-base ${
                          btn.type === "primary"
                            ? "bg-primary-600 text-white hover:bg-primary-700"
                            : "border border-white text-white hover:bg-white hover:text-primary-600"
                        }`}
                      >
                        {btn.label}
                      </Link>
                    ))}
                  </div>

                  {/* Кастомная пагинация — теперь под текстом */}
                  <div className="hidden gap-2 sm:gap-4 sm:flex sm:flew-wrap">
                    {slides.map((_, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-start gap-1 cursor-pointer group"
                        onClick={() => swiperRef.current?.slideToLoop(index)}
                      >
                        {/* цифра */}
                        <span
                          className={`text-3xl font-semibold transition-colors ${
                            activeIndex === index
                              ? "text-white"
                              : "text-white/50 group-hover:text-white"
                          }`}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        {/* полоска */}
                        <div className="h-[2px] w-[150px] bg-white/30 overflow-hidden relative">
                          {activeIndex === index && (
                            <div className="absolute inset-0 bg-white animate-progress"></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Стрелки */}
      <div
        ref={prevRef}
        className="absolute top-1/2 left-2 sm:left-4 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white/20 backdrop-blur-md text-white rounded-full hidden sm:flex items-center justify-center shadow-lg hover:bg-white/40 transition-all duration-300 cursor-pointer"
      >
        ‹
      </div>
      <div
        ref={nextRef}
        className="absolute top-1/2 right-2 sm:right-4 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white/20 backdrop-blur-md text-white rounded-full hidden sm:flex items-center justify-center shadow-lg hover:bg-white/40 transition-all duration-300 cursor-pointer"
      >
        ›
      </div>
    </section>
  );
}


