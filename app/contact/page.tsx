import { Metadata } from "next";
import ContactPage from "../../components/ContactPage";

export const metadata: Metadata = {
  title: "Контакты",
  description:
    "Свяжитесь со специалистами ООО ПСК Буртехнологии.",
};

export default function Page() {
  return <ContactPage />;
}