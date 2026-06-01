"use client";
import { useState, useRef } from 'react';
import { motion } from 'framer-motion'
import { FiCodesandbox, FiGlobe, FiUsers, FiThumbsUp, FiMapPin, FiCheckCircle, FiChevronLeft, FiChevronRight} from 'react-icons/fi'
import companyData from '@/data/company.json'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import WorkGeographySection from '@/components/WorkGeographySection';


interface Region {
  name: string;
  countries: string[];
}

interface PresenceSliderProps {
  regions: Region[];
}


export default function AboutPage() {
  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);
  const presencePrevRef = useRef<HTMLDivElement | null>(null);
  const presenceNextRef = useRef<HTMLDivElement | null>(null);
  const regions = companyData.company.globalPresence.regions;
  const [isLocked, setIsLocked] = useState<boolean>(false);
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative  from-primary-900 via-primary-800 to-primary-700 text-white py-12 sm:py-16 lg:py-20 bg-[url('../public/images/about/preview.png')] bg-center bg-cover bg-black/50 bg-blend-multiply">
        <div className="container-custom text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              О компании <br />
              <span className="text-accent-400"> ПСК "Буртехнологии"</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed">
              
              <span className='text-accent-400'>Более 20 лет</span> разрабатываем и сопровождаем технологические решения
  для бурения, цементирования и строительства нефтяных и газовых скважин.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Overview */}
      <section id="overview" className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                Передовые решения <span className="text-primary-600">для нефтегазовой отрасли</span>
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
                <span className='text-primary-600 font-bold'>ПСК "Буртехнологии"</span> уже более 20 лет разрабатывает передовые решения для бурения и цементирования скважин. Мы помогаем компаниям повышать эффективность бурения, обеспечивать целостность и стабильность ствола скважин, минимизировать воздействие на продуктивные горизонты и сохранять экологическую безопасность.
              </p>
              <div className="grid grid-cols-2 gap-3 sm:gap-6">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-primary-600 mb-2">
                    2001
                  </div>
                  <div className="text-sm text-gray-600">Год основания</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-primary-600 mb-2">
                    20+
                  </div>
                  <div className="text-sm text-gray-600">Лет в сфере</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-8"
            >
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-primary-900 mb-4">Наши приемущества</h3>
                  <div className="space-y-3">
                    {companyData.company.values.map((value, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <FiCheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0" />
                        <span className="text-primary-800 font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section id="mission" className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Принципы нашей <span className="text-primary-600">работы</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
               Надежность, инженерный подход и ответственность лежат в основе каждого реализуемого проекта.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 shadow-lg"
            >
              <div className="text-center">
                <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FiThumbsUp className="w-10 h-10 text-primary-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Инженерный подход</h3>
                <p className="text-gray-600 leading-relaxed">
                  Разрабатываем и сопровождаем технологические решения с учетом
  геолого-технических условий, особенностей бурения и требований проекта.
  Наша задача — обеспечивать стабильность, эффективность и безопасность
  производственных процессов.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 shadow-lg"
            >
              <div className="text-center">
                <div className="w-20 h-20 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FiCodesandbox className="w-10 h-10 text-accent-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Надежность и качество</h3>
                <p className="text-gray-600 leading-relaxed">
                  В своей работе мы придерживаемся принципов промышленной безопасности,
  технологической ответственности и постоянного контроля качества,
  выстраивая долгосрочные партнерские отношения с заказчиками.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      {/* <section id="team" className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Meet Our <span className="text-primary-600">Leadership Team</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Experienced professionals dedicated to driving innovation and excellence in the drilling fluids industry.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyData.leadership.map((leader, index) => (
              <motion.div
                key={leader.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="h-48 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                  <div className="text-center text-primary-600">
                    <div className="w-20 h-20 bg-primary-200 rounded-full mx-auto mb-3 flex items-center justify-center">
                      <FiUsers className="w-10 h-10" />
                    </div>
                    <p className="text-sm font-medium">Team Member</p>
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{leader.name}</h3>
                  <p className="text-primary-600 font-medium mb-3">{leader.position}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {leader.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Global Presence */}
      <section id="presence" className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            География нашей<span className="text-primary-600"> деятельности</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Наш опыт охватывает множество регионов России, а также ряд соседних стран,
            где мы помогали партнёрам решать задачи любой сложности.
          </p>
        </div>

        {/* Контейнер слайдера */}
        <div className="relative overflow-hidden">
          {/* Левая полупрозрачная тень */}
  <div className="absolute top-0 left-0 min-h-[240px] w-16 pointer-events-none bg-gradient-to-r from-gray-50 z-10"></div>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1} // мобильный экран — 1 карточка
            onBeforeInit={(swiper) => {
              // @ts-ignore
              swiper.params.navigation.prevEl = presencePrevRef.current;
              // @ts-ignore
              swiper.params.navigation.nextEl = presenceNextRef.current;
            }}
            navigation={{
              prevEl: presencePrevRef.current,
              nextEl: presenceNextRef.current,
            }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            className="!overflow-visible "
          >
            {regions.map((region, index) => (
              <SwiperSlide key={region.name}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-6 shadow-lg h-full flex flex-col items-center min-h-[240px]"
                >
                  <div className="w-16 h-16 overflow-hidden mb-4">
                    {/* <FiGlobe className="w-8 h-8 text-primary-600" /> */}
                    <Image src={region.image} alt={region.name} width={64} height={64} className="object-contain w-full h-full"/>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{region.name}</h3>
                  <div className="text-sm text-gray-600 text-center">
                    <strong>Месторождения:</strong> {region.countries.join(", ")}
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
            {/* Правая полупрозрачная тень */}
  <div className="absolute top-0 right-0 h-full w-16 pointer-events-none bg-gradient-to-l from-gray-50 z-10"></div>

          {/* Кастомные стрелки */}
          <div
            ref={presencePrevRef}
            className={`absolute top-1/2 -translate-y-1/2 left-2 z-10 w-12 h-12 rounded-full
                        hidden sm:flex items-center justify-center shadow-lg transition-all duration-300 hover:cursor-pointer
                        `}
            aria-hidden
          >
            <FiChevronLeft className="w-6 h-6" />
          </div>

          <div
            ref={presenceNextRef}
            className={`absolute top-1/2 -translate-y-1/2 right-2 z-10 w-12 h-12 rounded-full
                        hidden sm:flex items-center justify-center shadow-lg transition-all duration-300 hover:cursor-pointer
                        `}
            aria-hidden
          >
            <FiChevronRight className="w-6 h-6" />
          </div>
        </div>
      </div>
    <WorkGeographySection/>

    </section>


      {/* Partners */}
<section id="partners" className="section-padding bg-gray-50">
  <div className="container-custom">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-gray-900 mb-4">
        Наши <span className="text-primary-600">Партнёры</span>
      </h2>
      <p className="text-lg text-gray-600 max-w-3xl mx-auto">
        Наши партнёры – это крупнейшие игроки отрасли, доверяющие нам реализацию стратегически важных проектов.
      </p>
    </div>

    {/* Контейнер слайдера */}
    <div className="relative overflow-hidden">
      {/* Левая полупрозрачная тень */}
      <div className="absolute top-0 left-0 h-full w-16 pointer-events-none bg-gradient-to-r from-gray-50 z-10"></div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
        watchOverflow={true}
        centerInsufficientSlides={true}
        onBeforeInit={(swiper) => {
              // привязываем DOM-элементы к навигации (React + swiper нюанс)
              // @ts-ignore
              swiper.params.navigation.prevEl = prevRef.current;
              // @ts-ignore
              swiper.params.navigation.nextEl = nextRef.current;
            }}
        onSwiper={(swiper) => {
              // обновляем состояние блокировки и подписываемся на ресайз/обновления
              const updateLocked = () => setIsLocked(!!swiper.isLocked);
              updateLocked();
              // @ts-ignore
              swiper.on("resize breakpoint update", updateLocked);
            }}
        className="!overflow-visible"
      >
        {companyData.company.partners.map((partner, index) => (
          <SwiperSlide key={partner.name}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 
                         hover:shadow-xl transition-shadow flex flex-col items-center min-h-[220px]"
            >
              <div className="w-20 h-20 flex items-center justify-center mb-4">
                <Image 
                  src={partner.image} 
                  alt={partner.name} 
                  width={80} 
                  height={80} 
                  className="object-fill w-full h-full" 
                />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">{partner.name}</h3>
              <p className="text-gray-600 text-sm text-center">{partner.description}</p>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Правая полупрозрачная тень */}
      <div className="absolute top-0 right-0 h-full w-16 pointer-events-none bg-gradient-to-l from-gray-50 z-10"></div>

      {/* Кастомные стрелки */}
       {/* стрелки: всегда рендерим DOM-элемент (чтобы Swiper мог их привязать),
              но скрываем через класс, когда слайдер 'locked' (т.е. не нужен) */}
          <div
            ref={prevRef}
            className={`absolute top-1/2 -translate-y-1/2 left-2 z-10 w-12 h-12 rounded-full
                        hidden sm:flex items-center justify-center shadow-lg transition-all duration-300 hover:cursor-pointer
                        ${isLocked ? "opacity-0 pointer-events-none" : "bg-white/20 backdrop-blur-md hover:scale-105"}`}
            aria-hidden
          >
            <FiChevronLeft className="w-6 h-6" />
          </div>

          <div
            ref={nextRef}
            className={`absolute top-1/2 -translate-y-1/2 right-2 z-10 w-12 h-12 rounded-full
                        hidden sm:flex items-center justify-center shadow-lg transition-all duration-300 hover:cursor-pointer
                        ${isLocked ? "opacity-0 pointer-events-none" : "bg-white/20 backdrop-blur-md hover:scale-105"}`}
            aria-hidden
          >
            <FiChevronRight className="w-6 h-6" />
          </div>
    </div>
  </div>
</section>

      {/* Achievements */}
      <section className="section-padding bg-primary-900 text-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-4xl font-bold mb-4">
              Наши <span className="text-accent-400">Достижения</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-200 max-w-3xl mx-auto">
              Мы гордимся тем, что наши усилия в области качества, безопасности и инноваций получают признание. Каждый шаг вперёд подтверждает нашу приверженность высоким стандартам и ответственности перед партнёрами и обществом.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyData.achievements.map((achievement, index) => (
              <motion.div
                key={achievement.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">{achievement.year}</span>
                </div>
                <h3 className="text-lg font-bold mb-2">{achievement.title}</h3>
                <p className="text-gray-300 text-sm">{achievement.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

