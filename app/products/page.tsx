// app/products/page.tsx
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { getProducts } from "@/lib/dataManager";

export const metadata: Metadata = {
  title: "Продукция",
  description:
    "Реагенты для буровых растворов и тампонажных составов собственного производства.",
};

export default async function ProductsIndexPage() {
  const productsData = await getProducts();
  const categories = (productsData.categories || []) as Array<{
    id: string;
    title: string;
    description: string;
    image: string;
  }>;

  return (
    <main className="py-20">
      <div className="container-custom text-center">
        <h1 className="text-4xl font-bold mb-4">Наши продукты</h1>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Выберите категорию продукции, чтобы ознакомиться с реагентами и техническими решениями.
        </p>

        <div className="flex flex-wrap justify-center gap-8">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/products/${cat.id}`}
              className="group block sm:w-[250px] md:w-[320px] lg:w-[400px] rounded-2xl overflow-hidden shadow hover:shadow-xl transition"
            >
              <div className="relative h-48">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <div className="p-6 text-left">
                <h3 className="text-xl font-semibold mb-2">{cat.title}</h3>
                <p className="text-gray-600">{cat.description}</p>
                <div className="mt-4 text-sm text-primary-600 font-medium">Перейти →</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
