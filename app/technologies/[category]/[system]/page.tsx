import type { Metadata } from "next";
import technologiesData from "@/data/technologies.json";
import SystemPage from "../../../../components/SystemPage";

interface Props {
  params: {
    category: string;
    system: string;
  };
}

export async function generateStaticParams() {
  return technologiesData.systems.map((system) => ({
    category: system.categoryId,
    system: system.slug,
  }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const item = technologiesData.systems.find(
    (s) => s.slug === params.system
  );

  if (!item) {
    return {
      title: "Технология не найдена | ПСК Буртехнологии",
    };
  }

  const description =
    item.shortDescription ||
    item.subtitle ||
    item.fullDescription?.slice(0, 160);

  return {
    title: `${item.title} | Технологические решения | ПСК "Буртехнологии"`,

    description,

    keywords: [
      item.title,
      item.subtitle,
      "буровые растворы",
      "тампонажные растворы",
      "технологии бурения",
      "строительство скважин",
      "ПСК Буртехнологии",
    ],

    openGraph: {
      title: item.title,
      description,
      type: "article",
      images: item.heroImage
        ? [
            {
              url: item.heroImage,
              width: 1200,
              height: 630,
              alt: item.title,
            },
          ]
        : [],
    },

    alternates: {
      canonical: `/technologies/${params.category}/${params.system}`,
    },
  };
}

export default function Page({ params }: Props) {
  return <SystemPage params={params} />;
}