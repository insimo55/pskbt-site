import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getNews } from '@/lib/dataManager';
import { getNewsContent } from '@/lib/newsContent';
import NewsView from "@/components/NewsView";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface NewsMeta {
  id: string;
  title: string;
  description: string;
  date: string;
  image: string;
  category: string;
  readTime?: string;
}

// Эта функция нужна для генерации статических страниц (SSG) при билде - круто для SEO
export async function generateStaticParams() {
  const news = (await getNews()) as NewsMeta[];
  return news.map((post: NewsMeta) => ({
    id: post.id,
  }));
}
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const news = (await getNews()) as NewsMeta[];
  const post = news.find((p: NewsMeta) => p.id === params.id);

  if (!post) {
    return {
      title: "Новость не найдена | ПСК Буртехнологии",
    };
  }

  return {
    title: `${post.title} | ПСК Буртехнологии`,
    description: post.description,
    keywords: [
      post.category,
      "буровые растворы",
      "тампонажные растворы",
      "нефтегазовый сервис",
      "строительство скважин",
      "ПСК Буртехнологии",
    ],
    alternates: {
      canonical: `https://pskbt.ru/press/${post.id}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://pskbt.ru/press/${post.id}`,
      siteName: "ПСК Буртехнологии",
      type: "article",
      locale: "ru_RU",
      images: [
        {
          url: `https://pskbt.ru${post.image}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [`https://pskbt.ru${post.image}`],
    },
  };
}

// Сам компонент страницы
export default async function Page({ params }: { params: { id: string } }) {
  const news = (await getNews()) as NewsMeta[];
  const post = news.find((p: NewsMeta) => p.id === params.id);

  if (!post) {
    notFound(); // Покажет стандартную страницу 404
  }

  const markdown = await getNewsContent(post.id);
  const content = markdown ?? "Текст новости временно недоступен.";

  // 3. Передаем всё в клиентский компонент
  return <NewsView post={post} content={content} />;
}