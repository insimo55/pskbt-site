'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';

interface BackButtonProps {
  fallbackHref?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function BackButton({ fallbackHref = '/', className, children }: BackButtonProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // history.length > 2 надежнее, так как пустая новая вкладка браузера имеет length = 1
    if (typeof window !== 'undefined' && window.history.length > 2) {
      router.back();
    } else {
      router.push(fallbackHref);
    }
  };

  // Базовые стили + возможность их переопределить через className
  // Если className не передан, используем стандартные серые цвета.
  const buttonStyles = `inline-flex items-center gap-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-600/40 rounded transition-colors ${
    className ? className : 'text-gray-500 hover:text-primary-700'
  }`;

  return (
    <>
      <button
        onClick={handleClick}
        className={buttonStyles}
        aria-label="Назад"
      >
        <FiArrowLeft className="w-4 h-4 shrink-0" />
        {children ?? 'Назад'}
      </button>

      {/* Фолбэк для отключенного JS или краулеров */}
      <noscript>
        <Link href={fallbackHref} className={buttonStyles}>
          <FiArrowLeft className="w-4 h-4 shrink-0" />
          {children ?? 'Назад'}
        </Link>
      </noscript>
    </>
  );
}
