"use client";

import { motion } from "framer-motion";
import {
  FiShield,
  FiDatabase,
  FiMail,
  FiPhone,
} from "react-icons/fi";

const sections = [
  {
    icon: <FiDatabase />,
    title: "Какие данные мы собираем",
    text: "Мы можем собирать следующие данные: ФИО, название компании, адрес электронной почты и номер телефона, которые пользователь добровольно предоставляет через формы обратной связи на сайте.",
  },
  {
    icon: <FiShield />,
    title: "Цели обработки данных",
    text: "Персональные данные используются исключительно для обработки обращений, обратной связи, консультаций, рассмотрения заявок и улучшения качества обслуживания.",
  },
  {
    icon: <FiMail />,
    title: "Передача данных",
    text: "Мы не передаем персональные данные третьим лицам, за исключением случаев, предусмотренных законодательством Российской Федерации.",
  },
  {
    icon: <FiPhone />,
    title: "Контактная информация",
    text: "Если у вас возникли вопросы, связанные с обработкой персональных данных, вы можете связаться с нами по указанным контактным данным.",
  },
];

export default function PrivacyPage() {
  return (
    <main className="bg-gray-50 min-h-screen">
      {/* HERO */}
      <section className="relative h-[300px] flex items-center justify-center overflow-hidden">
        <motion.div
          animate={{
            background: [
              "linear-gradient(135deg, #2563eb, #9333ea)",
              "linear-gradient(135deg, #9333ea, #2563eb)",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0"
        />

        <div className="absolute inset-0 bg-black/40" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center text-white px-4"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Политика конфиденциальности
          </h1>

          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Мы внимательно относимся к защите и обработке персональных данных пользователей сайта.
          </p>
        </motion.div>
      </section>

      {/* CONTENT */}
      <section className="container mx-auto px-4 py-20 max-w-5xl">
        <div className="grid gap-8">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition"
            >
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl shrink-0">
                  {section.icon}
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    {section.title}
                  </h2>

                  <p className="text-gray-600 leading-relaxed text-lg">
                    {section.text}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 text-center text-gray-500 text-sm"
        >
          © {new Date().getFullYear()} Буртехнологии. Все права защищены.
        </motion.div>
      </section>
    </main>
  );
}