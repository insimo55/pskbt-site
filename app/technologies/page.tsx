import type { Metadata } from "next";
import TechnologiesPage from '../../components/TechnologiesPage';

export const metadata: Metadata = {
  title: "Технологические решения | ПСК «Буртехнологии»",
  description:
    "Современные технологии и инженерные решения для строительства скважин. Буровые растворы, тампонажные системы, технологические жидкости и сопровождение буровых работ.",

  keywords: [
    "технологии бурения",
    "буровые растворы",
    "тампонажные растворы",
    "строительство скважин",
    "технологическое сопровождение",
    "инженерные решения",
    "нефтегазовый сервис",
    "бурение нефтяных скважин",
    "бурение газовых скважин",
    "ПСК Буртехнологии",
  ],

  openGraph: {
    title: "Технологические решения | ПСК «Буртехнологии»",
    description:
      "Инновационные технологии для эффективного строительства нефтяных и газовых скважин.",
    url: "https://pskbt.ru/technologies",
    siteName: "ПСК Буртехнологии",
    type: "website",
    locale: "ru_RU",
    images: [
      {
        url: "/images/tech-bg.jpg",
        width: 1200,
        height: 630,
        alt: "Технологические решения ПСК Буртехнологии",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Технологические решения | ПСК «Буртехнологии»",
    description:
      "Буровые растворы, тампонажные системы и инженерные решения для строительства скважин.",
    images: ["/images/tech-bg.jpg"],
  },

  alternates: {
    canonical: "https://pskbt.ru/technologies",
  },
};

export default function Page() {
  return <TechnologiesPage />;
}