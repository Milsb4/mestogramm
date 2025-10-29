import { Footer } from "../components/layout/footer/Footer"
import { Header } from "../components/layout/header"
import { List } from "../components/layout/List/LIst"

export const Stocks = () => {
    return(
        <div
        className="flex flex-col gap-[20px]"
        >
        <Header/>
        <List/>
        <Footer/>
        </div>
    )
}