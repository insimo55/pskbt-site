// app/products/[category]/[product]/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import { StaggerContainer, FadeInUp } from "@/components/animations/Motion";
import BackButton from "@/components/BackButton";
import SampleRequestButton from "@/components/SampleRequestButton";
import { getProducts } from "@/lib/dataManager";

interface ProductItem {
  id: string;
  slug: string;
  name: string;
  category: string;
  image: string;
  longDescription?: string;
  technical?: Record<string, unknown>;
  pack?: string;
  safety_req?: string;
  transport?: string;
  application?: string;
  safety?: { msds?: string };
}


interface Props { params: { category: string, product: string } }

export async function generateStaticParams() {
  const data = await getProducts();
  return (data.products || []).map((p: any) => ({ category: p.category, product: p.slug }));
}


interface MetadataProps {
  params: {
    category: string;
    product: string;
  };
}

export async function generateMetadata(
  { params }: MetadataProps
): Promise<Metadata> {
  const productsData = await getProducts();
  const item = ((productsData.products || []) as ProductItem[]).find(
    (p: ProductItem) => p.category === params.category && p.slug === params.product
  );

  if (!item) {
    return {
      title: "Продукт не найден | ПСК Буртехнологии",
    };
  }

  const categoryName =
    params.category === "cementing"
      ? "Тампонажные растворы"
      : "Буровые растворы";

  const description =
    item.longDescription?.slice(0, 160) ||
    `${item.name} от ПСК «Буртехнологии». Технологические решения для нефтегазовой отрасли.`;

  return {
    title: `${item.name} | ${categoryName} | ПСК Буртехнологии`,
    description,
    keywords: [
      item.name,
      categoryName,
      "буровые растворы",
      "тампонажные растворы",
      "нефтегазовый сервис",
      "реагенты для бурения",
      "ПСК Буртехнологии",
    ],
    openGraph: {
      title: item.name,
      description,
      type: "article",
      images: [
        {
          url: item.image,
          width: 1200,
          height: 630,
          alt: item.name,
        },
      ],
    },
    alternates: {
      canonical: `/products/${params.category}/${params.product}`,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const productsData = await getProducts();
  const { category, product } = params;
  const item = ((productsData.products || []) as ProductItem[]).find(
    (p: ProductItem) => p.category === category && p.slug === product
  );
  if (!item) return <div className="p-20 text-center">Продукт не найден</div>;

  return (
    <main className="py-20">
      <div className="container-custom">
        <div className="mb-4">
          <BackButton fallbackHref={`/products/${category}`}/>
        </div>
        <StaggerContainer className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <StaggerContainer>
              <FadeInUp>
                <div className="relative h-80 mb-6">
                  <Image src={item.image} alt={item.name} fill className="object-cover rounded" />
                </div>
              </FadeInUp>
              <FadeInUp>
                <h1 className="text-2xl font-bold mb-4">{item.name}</h1>
              </FadeInUp>
              <FadeInUp>
                <p className="text-gray-700 mb-6 whitespace-pre-line">{item.longDescription}</p>
              </FadeInUp>
              {/* technical, properties, applications */}
              <FadeInUp>
                <div className="bg-white p-0 sm:p-6 rounded sm:shadow">
                  <h3 className="font-semibold mb-4 text-xl">Физико-химические свойства</h3>

              {(() => {
                // Собираем все подкатегории, если где-то в technical попадается объект
                const subCols = new Set<string>();
                Object.values(item.technical || {}).forEach((val: any) => {
                  if (val && typeof val === "object" && !Array.isArray(val)) {
                    Object.keys(val).forEach((subKey) => subCols.add(subKey));
                  }
                });
                const subColHeaders = Array.from(subCols);

                return (
                  <table className="w-full border-collapse text-xs sm:text-sm text-gray-700">
                    <thead>
                      <tr className="bg-gray-100 text-left">
                        <th
                          rowSpan={subColHeaders.length > 0 ? 2 : 1}
                          className="p-1 sm:p-2 border align-middle"
                        >
                          Наименование показателя
                        </th>

                        {subColHeaders.length > 0 ? (
                          <th colSpan={subColHeaders.length} className="p-2 border text-center">
                            Норма
                          </th>
                        ) : (
                          <th className="p-2 border text-center">Норма</th>
                        )}
                      </tr>

                      {subColHeaders.length > 0 && (
                        <tr className="bg-gray-50 text-left">
                          {subColHeaders.map((col) => (
                            <th key={col} className="p-2 border text-center">
                              {col}
                            </th>
                          ))}
                        </tr>
                      )}
                    </thead>

                    <tbody>
                      {Object.entries(item.technical || {}).map(([k, v]) => (
                        <tr key={k} className="hover:bg-gray-50">
                          <td className="p-2 border font-medium">{k}</td>

                          {/* Если объект с подкатегориями */}
                          {typeof v === "object" && v !== null && !Array.isArray(v) ? (
                            (() => {
                              const valueMap = v as Record<string, string>;
                              const entries = subColHeaders.map((col) => ({
                                col,
                                value: valueMap[col] || "-",
                              }));

                              const cells: JSX.Element[] = [];
                              let i = 0;

                              while (i < entries.length) {
                                const current = entries[i].value;
                                let span = 1;

                                // ищем подряд одинаковые значения
                                while (
                                  i + span < entries.length &&
                                  entries[i + span].value === current
                                ) {
                                  span++;
                                }

                                cells.push(
                                  <td
                                    key={entries[i].col}
                                    colSpan={span}
                                    className="p-2 border text-center"
                                  >
                                    {current}
                                  </td>
                                );

                                i += span;
                              }

                              return cells;
                            })()
                          ) : (
                            <td className="p-2 border text-center">
                              {Array.isArray(v) ? v.join(", ") : String(v ?? "-")}
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                );
              })()}
                </div>
              </FadeInUp>
              <FadeInUp>
                <div className="mb-2 mt-5">
                  <h3 className="font-semibold  text-xl">Упаковка</h3>
                  <div className="text-gray-700 mb-6 mt-2 whitespace-pre-line">{item.pack}</div>
                </div>
              </FadeInUp>
              <FadeInUp>
                <div className="mb-2 mt-5">
                  <h3 className="font-semibold  text-xl">Требования безопасности</h3>
                  <div className="text-gray-700 mb-6 mt-2 whitespace-pre-line">{item.safety_req}</div>
                </div>
              </FadeInUp>
              <FadeInUp>
                <div className="mb-2 mt-5">
                  <h3 className="font-semibold  text-xl">Транспортировка и хранение</h3>
                  <div className="text-gray-700 mb-6 mt-2 whitespace-pre-line">{item.transport}</div>
                </div>
              </FadeInUp>
              <FadeInUp>
                <div className="mb-2 mt-5">
                  <h3 className="font-semibold  text-xl">Применение</h3>
                  <div className="text-gray-700 mb-6 mt-2 whitespace-pre-line">{item.application}</div>
                </div>
              </FadeInUp>
            </StaggerContainer>
          </div>

          <FadeInUp>
            <aside className="p-6 bg-white rounded shadow">
              <h4 className="font-semibold mb-2">Документы</h4>
              {item.safety?.msds && (
                <a className="block text-primary-600 mb-2" href={item.safety.msds} target="_blank" rel="noreferrer">Скачать MSDS</a>
              )}
              <div className="mt-6">
                <h4 className="font-semibold mb-2">Упаковки</h4>
                <div className="text-sm text-gray-700">{(item as any).technical?.pack?.join(", ")}</div>
              </div>
              <div className="mt-6">
                <SampleRequestButton 
                  productName={item.name}
                  className="btn-primary w-full text-center"
                />
              </div>
            </aside>
          </FadeInUp>
        </StaggerContainer>
      </div>
    </main>
  );
}
