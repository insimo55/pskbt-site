"use client"
import React, { useState, useRef} from 'react';
import { motion } from 'framer-motion'
import { FiAward, FiGlobe, FiUsers, FiTrendingUp, FiMapPin, FiCheckCircle, FiChevronLeft, FiChevronRight} from 'react-icons/fi'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import companyData from "@/data/main.json";

export default function OurAdvantages() {
    return (
      <section className="w-ful pt-[100px] pb-[100px]">
        <div className="flex flex-col items-center text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
                Наши преимущества
            </h2>
            <div className="pt-4 sm:pt-6 text-gray-600 text-sm sm:text-base">
                Наша миссия - задавать и соответствовать высоким стандартам нефте-газовой промышленности
            </div>
        </div>
       <div className="flex flex-col sm:flex-row pt-6 sm:pt-8 justify-center gap-4 sm:gap-0 px-4 sm:px-0">
  {companyData.main.ourAdvantages.map((ourAdvantage, index) => (
    <React.Fragment key={ourAdvantage.image}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        viewport={{ once: true }}
        className="text-center px-4 sm:px-8"
      >
        <div className="max-w-[285px] mx-auto">
          <div className="w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <img src={ourAdvantage.image} alt={ourAdvantage.title} />
          </div>
          <h3 className="text-base sm:text-lg font-bold mb-2">{ourAdvantage.title}</h3>
          <p className="text-gray-600 text-sm sm:text-base text-center">{ourAdvantage.description}</p>
        </div>
      </motion.div>

      {/* Divider — добавляем только если не последний */}
      {index < companyData.main.ourAdvantages.length - 1 && (
        <div className="hidden sm:block w-[1px] h-[150px] bg-gray-300 self-center"></div>
      )}
    </React.Fragment>
  ))}
</div>
      </section>
    );
}
