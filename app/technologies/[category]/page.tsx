import type { Metadata } from "next";
import technologiesData from "@/data/technologies.json";
import TechCategoryPage from "../../../components/TechCategoryPage";

interface Props {
  params: {
    category: string;
  };
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const category = technologiesData.realTechnologies.find(
    c => c.id === params.category
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

export default function Page({ params }: Props) {
  return <TechCategoryPage params={params} />;
}