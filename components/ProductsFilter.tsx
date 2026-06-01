// components/ProductsFilter.tsx
"use client";
import { useEffect, useState } from "react";

// Тип для продукта (можно вынести в types.ts)
export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  shortDescription?: string;
  longDescription?: string;
  image?: string;
  [key: string]: any; // чтобы не ругался на другие поля
}

interface ProductsFilterProps {
  initialItems: Product[];
}

export default function ProductsFilter({ initialItems }: ProductsFilterProps) {
  const [q, setQ] = useState("");
  const [items, setItems] = useState<Product[]>(initialItems);

  useEffect(() => {
    const t = q.trim().toLowerCase();
    if (!t) {
      setItems(initialItems);
      return;
    }
    setItems(
      initialItems.filter((i) =>
        i.name.toLowerCase().includes(t) ||
        (i.shortDescription ?? "").toLowerCase().includes(t)
      )
    );
  }, [q, initialItems]);

  return (
    <div className="hidden flex items-center gap-2 sm:gap-4">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Поиск по продуктам..."
        className="border rounded px-4 py-2 w-full max-w-md"
      />
      {/* Пример: сюда можно добавить фильтры по категориям, тегам и т.д. */}
    </div>
  );
}

