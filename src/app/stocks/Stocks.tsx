import { Footer } from "../components/layout/footer/Footer"
import { Header } from "../components/layout/header"
import { MainContent } from "../components/layout/MainContent/MainContent"

export const Stocks = () => {
    return(
        <div
        className="flex flex-col gap-[20px]"
        >
        <Header/>
        <MainContent/>
        <Footer/>
        </div>
    )
}