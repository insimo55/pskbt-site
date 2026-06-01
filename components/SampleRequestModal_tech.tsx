'use client';

import { useState, FormEvent, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiUser, FiPhone, FiBriefcase } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { createPortal } from 'react-dom';

interface SampleRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
}
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



export default function SampleRequestModal({ isOpen, onClose, productName }: SampleRequestModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phone, setPhone] = useState("+7");
  const [mounted, setMounted] = useState(false);
useEffect(() => {
  setMounted(true);
}, []);
  // Обработка ESC для закрытия модального окна
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isSubmitting) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Блокируем скролл body при открытом модальном окне
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, isSubmitting, onClose]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("formType", "Tech");
    formData.append("product", productName);
    // Проверяем обязательные поля
    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const message = formData.get('message') as string;

    if (!name || !phone || !message) {
      toast.error('Пожалуйста, заполните все обязательные поля ⚠️');
      setIsSubmitting(false);
      return;
    }

    // Имитация отправки (здесь позже добавим реальную отправку)
    try {
      const response = await fetch("/api/send-mail", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Ошибка сервера");
      }

      toast.success(
        "Запрос успешно отправлен! Мы свяжемся с вами в ближайшее время 🚀"
      );
      form.reset();
      onClose();
    } catch (error) {
      toast.error("Произошла ошибка при отправке. Попробуйте позже 😔");
    } finally {
      setIsSubmitting(false);
    }
  };
const modalContent = (
  <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl pointer-events-auto max-h-[80vh] overflow-y-auto"
            >
              {/* Animated background gradient */}
              <motion.div
                transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }}
                className="absolute inset-0 rounded-2xl opacity-50"
              />

              <div className="relative p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Запросить консультацию</h2>
                    <p className="text-sm text-gray-600 mt-1">{productName}</p>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-600/40"
                    aria-label="Закрыть"
                  >
                    <FiX className="w-6 h-6 text-gray-600" />
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Имя */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Имя <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center gap-3 border border-gray-300 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-primary-500 transition">
                    <FiUser className="text-gray-400 flex-shrink-0" />
                    <input
                      name="name"
                      type="text"
                      required
                      placeholder="Введите ваше имя"
                      className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
                    />
                  </div>
                  </div>

                  {/* Телефон */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Номер телефона <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center gap-3 border border-gray-300 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-primary-500 transition">
                      <FiPhone className="text-gray-400 flex-shrink-0" />
                      <input
                        name="phone"
                        type="tel"
                        required
                        value={phone}
                        placeholder="+7 (___) ___-__-__"
                        onChange={(e) => setPhone(formatPhone(e.target.value))}
                        className="w-full bg-transparent outline-none text-gray-700"
                      />
                    </div>
                  </div>

                  {/* Компания (опционально) */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Название организации
                      <span className="text-gray-500 text-xs font-normal ml-2">(необязательно)</span>
                    </label>
                    <div className="flex items-center gap-3 border border-gray-300 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-primary-500 transition">
                      <FiBriefcase className="text-gray-400 flex-shrink-0" />
                      <input
                        name="company"
                        type="text"
                        placeholder="Название вашей компании"
                        className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
                      />
                    </div>
                  </div>

                  {/* Сообщение */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Текст обращения <span className="text-red-500">*</span>
                    </label>
                    <div className="border border-gray-300 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-primary-500 transition">
                      <textarea
                        name="message"
                        required
                        rows={4}
                        placeholder="Напишите ваше сообщение..."
                        className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400 resize-none"
                      />
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 pt-4">
                    <motion.button
                      type="button"
                      onClick={onClose}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 px-6 py-3 border border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Отмена
                    </motion.button>
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Отправка...' : 'Отправить запрос'}
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
)
  if (!mounted) return null;

return createPortal(
  modalContent,
  document.body
);
}


