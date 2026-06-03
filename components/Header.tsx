'use client'

import { useState } from 'react'
import { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi'
import Image from "next/image";

interface NavigationItem {
  name: string;
  href: string;
  dropdown?: { name: string; href: string }[];
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [productDropdown, setProductDropdown] = useState<{ name: string; href: string }[]>([
    { name: 'Хим.реагенты для цементных растворов', href: '/products/cementing' },
    { name: 'Хим.реагенты для буровых растворов', href: '/products/drilling' },
  ])
  const [technologyDropdown, setTechnologyDropdown] = useState<
    { name: string; href: string }[]
  >([
    { name: 'Системы буровых растворов на водной основе', href: '/technologies/1' },
    { name: 'Буровые растворы на углеводородной основе', href: '/technologies/2' },
    { name: 'Тампонажные составы', href: '/technologies/3' },
    { name: 'Вязко-упругие составы', href: '/technologies/4' },
    { name: 'Технологические жидкости', href: '/technologies/5' },
  ])
  const pathname = usePathname()

  useEffect(() => {
    const loadNavigation = async () => {
      try {
        const response = await fetch('/api/navigation', { cache: 'no-store' })
        if (!response.ok) return
        const data = await response.json()
        if (Array.isArray(data.productCategories) && data.productCategories.length > 0) {
          setProductDropdown(
            data.productCategories.map((cat: any) => ({ name: cat.title, href: cat.href }))
          )
        }
        if (Array.isArray(data.technologyCategories) && data.technologyCategories.length > 0) {
          setTechnologyDropdown(
            data.technologyCategories.map((cat: any) => ({ name: cat.title, href: cat.href }))
          )
        }
      } catch (error) {
        console.error('Failed to load navigation:', error)
      }
    }

    loadNavigation()
  }, [])

  const navigation: NavigationItem[] = [
    { name: 'Главная', href: '/' },
    { 
      name: 'О Нас', 
      href: '/about',
      // dropdown: [
      //   { name: 'Company History', href: '/about#history' },
      //   { name: 'Mission & Vision', href: '/about#mission' },
      //   { name: 'Leadership Team', href: '/about#team' },
      //   { name: 'Global Presence', href: '/about#presence' },
      //   { name: 'Certifications', href: '/about#certifications' }
      // ]
    },
    { 
      name: 'Продукты', 
      href: '/products',
      dropdown: productDropdown
    },
    { name: 'Технологии', 
      href: '/technologies',
      dropdown: technologyDropdown
     },
    { name: 'Новости', href: '/press' },
    { name: 'Контакты', href: '/contact' }
  ]

  const isActive = (href: string) => pathname === href

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container-custom px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative  h-16 sm:scale-[80%]"> 
              <img src="/images/logoF.svg" alt="main logo" className="object-contain"/>
            </div>
            <div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center lg:space-x-4 xl:space-x-8 whitespace-nowrap">
            {navigation.map((item) => (
              <div key={item.name} className="relative">
                {item.dropdown ? (
                  <div
                    className="flex items-center space-x-1 cursor-pointer group "
                    onMouseEnter={() => setActiveDropdown(item.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <Link
      href={item.href}
      className={`text-sm font-medium transition-colors ${
        isActive(item.href)
          ? "text-primary-600"
          : "text-gray-700 hover:text-primary-600"
      }`}
    >
      {item.name}
    </Link>
                    <FiChevronDown className="w-4 h-4 text-gray-500 group-hover:text-primary-600 transition-colors" />
                    
                    <AnimatePresence>
                      {activeDropdown === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2"
                        >
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`text-xs sm:text-sm font-medium transition-colors ${
                      isActive(item.href) ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block ">
            <Link href="/contact" className="btn-primary whitespace-nowrap ">
              Связаться с Нами
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden border-t border-gray-200"
            >
              <div className="py-4 space-y-2">
                {navigation.map((item) => (
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      className={`block px-4 py-2 text-base font-medium rounded-md transition-colors  ${
                        isActive(item.href) 
                          ? 'text-primary-600 bg-primary-50' 
                          : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                    {item.dropdown && (
                      <div className="ml-4 mt-2 space-y-1">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-4 py-2 text-sm text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="px-4 pt-4">
                  <Link href="/contact" className="btn-primary text-sm w-full text-center">
                    Связаться с Нами
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}

export default Header


