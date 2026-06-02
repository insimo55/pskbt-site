import type { Metadata } from "next";
import CategoryPage from "../../../components/CategoryPage";
import { getProducts } from "@/lib/dataManager";

export const revalidate = 60;

interface Props {
  params: {
    category: string;
  };
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {

  const seoMap: Record<string, Metadata> = {
    drilling: {
      title: "Реагенты для буровых растворов",
      description:
        "Реагенты и химические добавки для приготовления и обработки буровых растворов. Ингибиторы, смазочные добавки, утяжелители, полимеры и специализированные материалы для строительства нефтяных и газовых скважин.",
      keywords: [
        "буровые растворы",
        "реагенты для буровых растворов",
        "ингибитор бурового раствора",
        "смазочная добавка",
        "полимер для бурения",
        "нефтесервис"
      ],
      openGraph: {
        title: "Реагенты для буровых растворов",
        description:
          "Современные реагенты и добавки для систем буровых растворов.",
        images: ["/images/og/drilling-products.jpg"],
      },
    },

    cementing: {
      title: "Добавки для цементирования скважин",
      description:
        "Материалы и химические добавки для цементирования нефтяных и газовых скважин. Замедлители, ускорители, понизители фильтрации и специализированные тампонажные составы.",
      keywords: [
        "тампонажный раствор",
        "цементирование скважин",
        "добавки для цементирования",
        "тампонажные материалы",
        "цементный раствор",
        "нефтесервис"
      ],
      openGraph: {
        title: "Добавки для цементирования скважин",
        description:
          "Решения для качественного цементирования нефтяных и газовых скважин.",
        images: ["/images/og/cementing-products.jpg"],
      },
    },
  };

  return (
    seoMap[params.category] || {
      title: "Продукция",
      description:
        "Продукция ООО ПСК Буртехнологии для бурения и цементирования скважин.",
    }
  );
}

export default async function Page({ params }: Props) {
  const data = await getProducts();
  return (
    <CategoryPage
      params={params}
      categories={data.categories || []}
      products={data.products || []}
    />
  );
}