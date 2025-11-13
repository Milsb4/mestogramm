import { Footer } from "@/components/layout/footer/Footer";
import { Header } from "@/components/layout/header";
import { CardList } from "@/components/layout/List/CardLIst";
import { CardProvider } from "@/utils/context/CardContext";

export function Stocks() {
  return (
    <CardProvider>
      <div className="flex flex-col gap-5">
        <Header/>
        <CardList/>
        <Footer/>
      </div>
    </CardProvider>
  );
};
