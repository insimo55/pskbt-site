"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiUser,
  FiBriefcase,
  FiUpload,
  FiCheckCircle,
} from "react-icons/fi";

function formatPhone(value: string) {
  // оставляем только цифры
  let digits = value.replace(/\D/g, '');

  // если начали с 8 или 7 — убираем
  if (digits.startsWith('8')) digits = digits.slice(1);
  if (digits.startsWith('7')) digits = digits.slice(1);

  // ограничим длину (10 цифр после +7)
  digits = digits.slice(0, 10);

  let formatted = '+7';

  if (digits.length > 0) formatted += ' (' + digits.slice(0, 3);
  if (digits.length >= 4) formatted += ') ' + digits.slice(3, 6);
  if (digits.length >= 7) formatted += '-' + digits.slice(6, 8);
  if (digits.length >= 9) formatted += '-' + digits.slice(8, 10);

  return formatted;
}

export default function ContactPage() {
  const [tab, setTab] = useState<"client" | "candidate">("client");
  
  // Состояния для переключателей способа связи
  const [clientContactMethod, setClientContactMethod] = useState<"email" | "phone">("email");
  const [candidateContactMethod, setCandidateContactMethod] = useState<"email" | "phone">("email");
  const [formValues, setFormValues] = useState<Record<string, string>>({
    name: "",
    company: "",
    email: "",
    phone: "+7",
    position: "",
    message: "",
  });
  // Состояние отправки
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [phone, setPhone] = useState("+7");
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const handleInputChange = (name: string, value: string) => {
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.currentTarget;
    const formData = new FormData(form);

    // 1. Добавляем тип формы для бэкенда
    formData.append("formType", tab); 

    // 2. Проверка обязательных полей (простая валидация)
    // Для файла резюме проверка отдельная, если нужно
    const requiredKeys = ["name", "fullname", "company", "position", "email", "phone", "message"];
    let hasError = false;

    // Проходимся только по полям, которые есть в этой форме
    formData.forEach((value, key) => {
       if (requiredKeys.includes(key) && !value) {
         hasError = true;
       }
    });

    if (hasError) {
      toast.error("Пожалуйста, заполните обязательные поля ⚠️");
      setIsSubmitting(false);
      return;
    }

    try {
      // 3. Отправка на API
      const response = await fetch("/api/send-mail", {
        method: "POST",
        body: formData, // FormData сама выставит нужные заголовки (в т.ч. для файла)
      });

      if (response.ok) {
        toast.success(
            tab === "client" 
            ? "Сообщение отправлено! Мы свяжемся с вами." 
            : "Заявка отправлена! Удачи!"
        );
        form.reset();
        // Сброс переключателей на дефолт, если нужно
        setClientContactMethod("email");
        setCandidateContactMethod("email");
      } else {
        toast.error("Ошибка сервера. Попробуйте позже.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Произошла ошибка при отправке.");
    } finally {
      setIsSubmitting(false);
    }

    
  };

  return (
    <main className="bg-gray-50 min-h-screen">
      <Toaster position="top-right" />

      {/* Hero Section */}
      <section className="relative h-[300px] flex items-center justify-center overflow-hidden">
        <motion.div
          animate={{
            background: [
              "linear-gradient(135deg, #2563eb, #9333ea)",
              "linear-gradient(135deg, #9333ea, #f43f5e)",
              "linear-gradient(135deg, #f43f5e, #2563eb)",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-black/40" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center text-white px-4"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Контакты</h1>
          <p className="text-lg text-gray-200">
            Свяжитесь с нами — мы всегда рады сотрудничеству
          </p>
        </motion.div>
      </section>

      <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-20 max-w-7xl">
        {/* Контакты + Карта */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-8 mb-16"
        >
          {/* Инфо-карточка */}
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-8 space-y-8 hover:shadow-xl transition h-full flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-gray-900">Наши контакты</h2>
            <div className="space-y-6 text-gray-700 flex flex-col">
              <ContactItem 
                icon={<FiPhone className="w-5 h-5" />} 
                text="+7 (342) 2-333-999" 
                href="tel:+73422333999" 
              />
              <ContactItem 
                icon={<FiMail className="w-5 h-5" />} 
                text="pskbt@mail.ru" 
                href="mailto:pskbt@mail.ru" 
              />
              <ContactItem 
                icon={<FiMapPin className="w-5 h-5" />} 
                text="614990 Пермский край, г.Пермь, ул. Советская, д.51А"
              />
              
            </div>
          </div>

          {/* Карта */}
          <div className="relative rounded-2xl overflow-hidden shadow-lg h-[300px] bg-gray-200">
            <iframe
              src="https://yandex.ru/map-widget/v1/?ll=56.238240%2C58.013924&mode=whatshere&whatshere%5Bpoint%5D=56.238397%2C58.013873%5Bzoom%5D=17&z=18.93"
              width="100%"
              height="300"
              frameBorder="0"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </motion.div>

        {/* Табы переключения форм */}
        <div className="flex justify-center gap-4 sm:gap-8 mb-10">
          {[
            { id: "client", label: "Я заказчик" },
            { id: "candidate", label: "Хочу работать у вас" },
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setTab(btn.id as "client" | "candidate")}
              className={`relative px-4 py-2 text-lg font-medium transition-colors ${
                tab === btn.id
                  ? "text-blue-600"
                  : "text-gray-500 hover:text-blue-600"
              }`}
            >
              {btn.label}
              {tab === btn.id && (
                <motion.div
                  layoutId="underline"
                  className="absolute left-0 bottom-0 w-full h-[2px] bg-blue-600 rounded"
                />
              )}
            </button>
          ))}
        </div>

        {/* Формы */}
        <motion.div
          key={tab}
          initial={{ opacity: 0, x: tab === 'client' ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-2xl mx-auto"
        >
          {tab === "client" ? (
            /* --- ФОРМА ЗАКАЗЧИКА --- */
            <form
              onSubmit={handleSubmit}
              className="bg-white shadow-xl rounded-3xl p-8 sm:p-10 space-y-6 border border-gray-100"
            >
              <InputField
                name="name"
                label="Ваше имя"
                placeholder="Иван Иванов"
                value={formValues.name}
                icon={<FiUser className="text-gray-400" />}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
              <InputField
                name="company"
                label="Компания"
                placeholder="Название организации"
                value={formValues.company}

                icon={<FiBriefcase className="text-gray-400" />}
                onChange={(e) => handleInputChange("company", e.target.value)}
              />
              
              {/* Выбор способа связи */}
              <ContactMethodSelector 
                method={clientContactMethod} 
                setMethod={setClientContactMethod} 
              />
              
              {/* Динамический инпут */}
              {clientContactMethod === 'email' ? (
                <InputField
                  name="email"
                  type="email"
                  label="Email для связи"
                  placeholder="example@mail.ru"
                  value={formValues.email}

                  icon={<FiMail className="text-gray-400" />}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              ) : (
                <InputField
                  name="phone"
                  type="tel"
                  label="Телефон для связи"
                  placeholder="+7 (999) 000-00-00"
                  icon={<FiPhone className="text-gray-400" />}
                  value={formValues.phone}
                  onChange={(e) =>
                    handleInputChange("phone", formatPhone(e.target.value))
                  }
                  
                />
              )}

              <TextareaField
                name="message"
                label="Сообщение"
                placeholder="Расскажите о вашей задаче..."
                
              />
              <SubmitButton isLoading={isSubmitting}>Отправить запрос</SubmitButton>
            </form>
          ) : (
             /* --- ФОРМА КАНДИДАТА --- */
            <form
              onSubmit={handleSubmit}
              className="bg-white shadow-xl rounded-3xl p-8 sm:p-10 space-y-6 border border-gray-100"
            >
              <InputField
                name="name"
                label="ФИО"
                placeholder="Иванов Иван Иванович"
                value={formValues.name}
                icon={<FiUser className="text-gray-400" />}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
              <InputField
                name="position"
                label="Желаемая должность"
                placeholder="Например: Инженер-технолог"
                value={formValues.position}
                onChange={(e) => handleInputChange("position", e.target.value)}
                icon={<FiBriefcase className="text-gray-400" />}
              />
              
              {/* Выбор способа связи */}
              <ContactMethodSelector 
                method={candidateContactMethod} 
                setMethod={setCandidateContactMethod} 
              />
              
               {/* Динамический инпут */}
               {candidateContactMethod === 'email' ? (
                <InputField
                  name="email"
                  type="email"
                  label="Email для связи"
                  placeholder="example@mail.ru"
                  value={formValues.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  icon={<FiMail className="text-gray-400" />}
                />
              ) : (
                <InputField
                  name="phone"
                  type="tel"
                  label="Телефон для связи"
                  placeholder="+7 (999) 000-00-00"
                  icon={<FiPhone className="text-gray-400" />}
                  value={formValues.phone}
                  onChange={(e) =>
                    handleInputChange("phone", formatPhone(e.target.value))
                  }
                  
                />
              )}

              {/* Загрузка файла */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Резюме (файл)
                </label>
                <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-500 transition group cursor-pointer bg-gray-50 hover:bg-blue-50">
                  <input 
                    name="resume"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) setResumeFile(file);
                    }}
                  />
                  <FiUpload className="w-8 h-8 text-gray-400 mx-auto mb-2 group-hover:text-blue-500 transition" />
                  {resumeFile ? (
  <p className="text-sm text-green-600 font-medium break-all">
    📎 {resumeFile.name}
  </p>
) : (
  <>
    <p className="text-sm text-gray-500 group-hover:text-blue-600 font-medium">
      Нажмите для загрузки файла
    </p>
    <p className="text-xs text-gray-400 mt-1">
      PDF, DOC, DOCX до 10Мб
    </p>
  </>
)}
                  <p className="text-xs text-gray-400 mt-1">PDF, DOC, DOCX до 10Мб</p>
                </div>
              </div>

              <SubmitButton isLoading={isSubmitting}>Отправить отклик</SubmitButton>
            </form>
          )}
        </motion.div>
      </div>
    </main>
  );
}

/* --- Вспомогательные компоненты --- */

// Компонент переключения способа связи
function ContactMethodSelector({ 
  method, 
  setMethod 
}: { 
  method: "email" | "phone"; 
  setMethod: (m: "email" | "phone") => void 
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Как с вами удобнее связаться?
      </label>
      <div className="flex gap-4">
        <label className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${method === 'email' ? 'border-blue-500 bg-blue-50 text-blue-700 font-medium' : 'border-gray-200 hover:border-blue-300'}`}>
          <input 
            type="radio" 
            name="contact_method_dummy" // dummy имя, чтобы не шло в форму
            className="hidden" 
            checked={method === 'email'} 
            onChange={() => setMethod('email')} 
          />
          <FiMail /> Email
          {method === 'email' && <FiCheckCircle className="ml-auto" />}
        </label>
        
        <label className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${method === 'phone' ? 'border-blue-500 bg-blue-50 text-blue-700 font-medium' : 'border-gray-200 hover:border-blue-300'}`}>
          <input 
            type="radio" 
            name="contact_method_dummy"
            className="hidden" 
            checked={method === 'phone'} 
            onChange={() => setMethod('phone')} 
          />
          <FiPhone /> Телефон
          {method === 'phone' && <FiCheckCircle className="ml-auto" />}
        </label>
      </div>
    </div>
  );
}

function ContactItem({ icon, text, href }: { icon: React.ReactNode; text: string; href?: string }) {
  const content = (
    <div className="flex items-center gap-4 group">
      <div className="w-10 h-10 shrink-0 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
        {icon}
      </div>
      <span className="text-m sm:text-lg font-medium group-hover:text-blue-600 transition-colors">
        {text}
      </span>
    </div>
  );

  return href ? <a href={href}>{content}</a> : content;
}

function InputField({
  name,
  label,
  placeholder,
  icon,
  type = "text",
  value,
  onChange,
}: {
  name: string;
  label: string;
  placeholder?: string;
  icon?: React.ReactNode;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500 transition">
        {icon}
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required
          className="w-full bg-transparent outline-none"
        />
      </div>
    </div>
  );
}

function TextareaField({
  name,
  label,
  placeholder,
}: {
  name: string;
  label: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label} <span className="text-red-500">*</span>
      </label>
      <textarea
        name={name}
        placeholder={placeholder}
        required
        className="w-full border border-gray-200 rounded-xl px-4 py-3 h-32 resize-none bg-gray-50 focus:bg-white outline-none text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
      />
    </div>
  );
}

function SubmitButton({ children, isLoading }: { children: React.ReactNode; isLoading: boolean }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type="submit"
      disabled={isLoading}
      className={`w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg py-4 rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2`}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Отправка...
        </>
      ) : (
        children
      )}
    </motion.button>
  );
}
