// app/products/[category]/page.tsx
'use client';
import Image from "next/image";
import Link from "next/link";
import ProductsFilter from "@/components/ProductsFilter"; // client component for search
import { motion } from "framer-motion";

interface ProductCategory {
  id: string;
  title: string;
  description: string;
}

interface ProductItem {
  id: string;
  slug: string;
  name: string;
  image: string;
  shortDescription: string;
  category: string;
}

interface Props {
  params: { category: string };
  categories: ProductCategory[];
  products: ProductItem[];
}

export default function CategoryPage({ params, categories, products }: Props) {
  const categoryId = params.category;
  const category = categories.find(c => c.id === categoryId);
  const items = products.filter(p => p.category === categoryId);

  const handleCardClick = (productId: string) => {
    // Replace with your analytics/logic as needed
    // e.g., analytics.track('product_card_click', { productId });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } }
  };

  if (!category) return <div className="p-20 text-center">Категория не найдена</div>;

  return (
    <main className="py-12 sm:py-8 sm:py-12 lg:py-16 lg:py-20">
      <div className="container-custom">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold">{category.title}</h1>
          <p className="text-gray-600">{category.description}</p>
        </div>

        {/* Optional client-side filter/search */}
        <div className="mb-6">
          <ProductsFilter initialItems={items} />
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {items.map(item => (
            <Link
              key={item.id}
              href={`/products/${categoryId}/${item.slug}`}
              onClick={() => handleCardClick(item.id)}
              aria-label={`Открыть страницу продукта: ${item.name}`}
              className="group block bg-white rounded-lg shadow p-4 transition duration-200 ease-out hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary-600/40"
            >
              <motion.article variants={itemVariants}>
                <div className="relative h-40 mb-4 overflow-hidden rounded">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-1 group-hover:text-primary-700 transition-colors">
                  {item.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-3">{item.shortDescription}</p>
                <span className="inline-flex items-center gap-1 text-primary-600 font-medium">
                  Подробнее →
                </span>
              </motion.article>
            </Link>
          ))}
        </motion.div>
      </div>
    </main>
  );
}

