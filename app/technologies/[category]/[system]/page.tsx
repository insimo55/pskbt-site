import type { Metadata } from "next";
import SystemPage from "../../../../components/SystemPage";
import { getTechnologies } from "@/lib/dataManager";

export const revalidate = 60;

interface Props {
  params: {
    category: string;
    system: string;
  };
}

export async function generateStaticParams() {
  const technologiesData = await getTechnologies();
  return (technologiesData.systems || []).map((system: any) => ({
    category: system.categoryId,
    system: system.slug,
  }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const technologiesData = await getTechnologies();
  const item = (technologiesData.systems || []).find(
    (s: any) => s.slug === params.system
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

export default async function Page({ params }: Props) {
  const technologiesData = await getTechnologies();
  const systemData =
    (technologiesData.systems || []).find((s: any) => s.slug === params.system) || null;
  return <SystemPage params={params} systemData={systemData} />;
}