import type { Metadata } from "next";
import TechCategoryPage from "../../../components/TechCategoryPage";
import { getTechnologies } from "@/lib/dataManager";

export const revalidate = 60;

interface Props {
  params: {
    category: string;
  };
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const technologiesData = await getTechnologies();
  const category = (technologiesData.realTechnologies || []).find(
    (c: any) => c.id === params.category
  );

  if (!category) {
    return {
      title: "Технологии | ПСК Буртехнологии",
    };
  }

  return {
    title: `${category.title} | ПСК Буртехнологии`,
    description: category.descr,
    alternates: {
      canonical: `https://pskbt.ru/technologies/${category.id}`,
    },
  };
}

export default async function Page({ params }: Props) {
  const technologiesData = await getTechnologies();
  return (
    <TechCategoryPage
      params={params}
      categories={technologiesData.realTechnologies || []}
      systemsData={technologiesData.systems || []}
    />
  );
}