import Link from 'next/link'
import { FiMail, FiPhone, FiMapPin, FiLinkedin, FiTwitter, FiFacebook, FiAlertCircle} from 'react-icons/fi'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 py-8 sm:py-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Link href="/" className="flex items-center space-x-3">
            <div className="relative w-auto h-16"> 
              <img src="/images/logoW.svg" alt="main logo" className="object-contain"/>
            </div>
            <div>
            </div>
          </Link>
              
            </div>
            <p className="text-gray-300 text-xs sm:text-sm">
              Надёжный партнёр в области буровых и цементных растворов, предлагающий инновационные решения для нефтегазовой промышленности.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <FiLinkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <FiTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <FiFacebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-base sm:text-lg font-semibold">Разделы сайта</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-primary-400 transition-colors text-sm">
                  О Нас
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-300 hover:text-primary-400 transition-colors text-sm">
                  Продукты
                </Link>
              </li>
              <li>
                <Link href="/technologies" className="text-gray-300 hover:text-primary-400 transition-colors text-sm">
                  Технологии
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-gray-300 hover:text-primary-400 transition-colors text-sm">
                  Новости
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-primary-400 transition-colors text-sm">
                  Контакты
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h4 className="text-base sm:text-lg font-semibold">Продукты</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/products/drilling" className="text-gray-300 hover:text-primary-400 transition-colors text-sm">
                  Для буровых растворов
                </Link>
              </li>
              <li>
                <Link href="/products/cementing" className="text-gray-300 hover:text-primary-400 transition-colors text-sm">
                  Для тампонажных растворов
                </Link>
              </li>
              
            </ul>
            <h4 className="text-base sm:text-lg font-semibold">Технологии</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/technologies/1" className="text-gray-300 hover:text-primary-400 transition-colors text-sm">
                  Буровые раствора на водной основе
                </Link>
              </li>
              <li>
                <Link href="/technologies/2" className="text-gray-300 hover:text-primary-400 transition-colors text-sm">
                  Буровые растворы на УВ основе
                </Link>
              </li>
              
              
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-base sm:text-lg font-semibold">Контакная информация</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <FiMapPin className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-xs sm:text-sm">614990 Пермский край, г.Пермь</p>
                  <p className="text-gray-300 text-xs sm:text-sm">ул. Советская, д.51А</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <FiPhone className="w-5 h-5 text-primary-400" />
                <a href="tel:+7-342-233-3999" className="text-gray-300 hover:text-primary-400 transition-colors text-sm">
                  +7-(342)-2-333-999
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <FiMail className="w-5 h-5 text-primary-400" />
                <a href="mailto:pskbt@mail.ru" className="text-gray-300 hover:text-primary-400 transition-colors text-sm">
                  pskbt@mail.ru
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <FiAlertCircle className="w-5 h-5 text-primary-400" />
                <div className="text-gray-300 hover:text-primary-400 transition-colors text-sm">
                  ИНН: 5908024608
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <FiAlertCircle className="w-5 h-5 text-primary-400" />
                <div className="text-gray-300 hover:text-primary-400 transition-colors text-sm">
                  КПП: 434501001
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-xs sm:text-sm">
            <p className="text-gray-400 text-sm">
              © {currentYear} Все права защищены. Сделано с <img src="/../images/Heart.svg" alt="" className='inline'/> от "Буртехнологии"
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-primary-400 transition-colors">
                Политика конфиденциальности
              </Link>
              {/* <Link href="/terms" className="text-gray-400 hover:text-primary-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="text-gray-400 hover:text-primary-400 transition-colors">
                Sitemap
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer


