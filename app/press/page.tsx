import type { Metadata } from "next";
import PressPage from "../../components/PressPage";

export const metadata: Metadata = {
  title: "Новости компании | ПСК Буртехнологии",
  description:
    "Новости компании ПСК «Буртехнологии». Новые технологии буровых и тампонажных растворов, реализованные проекты, участие в отраслевых мероприятиях и развитие нефтесервисных решений.",
  keywords: [
    "новости нефтегазовой отрасли",
    "буровые растворы",
    "тампонажные растворы",
    "новости компании",
    "ПСК Буртехнологии",
    "нефтесервис",
    "бурение скважин",
    "цементирование скважин",
  ],
  alternates: {
    canonical: "https://pskbt.ru/press",
  },
  openGraph: {
    title: "Новости компании | ПСК Буртехнологии",
    description:
      "Актуальные новости компании, реализованные проекты и технологические решения для строительства нефтяных и газовых скважин.",
    url: "https://pskbt.ru/press",
    siteName: "ПСК Буртехнологии",
    type: "website",
    locale: "ru_RU",
    images: [
      {
        url: "https://pskbt.ru/images/og/news.jpg",
        width: 1200,
        height: 630,
        alt: "Новости ПСК Буртехнологии",
      },
    ],
  },
};

export default function Page() {
  return <PressPage />;
}