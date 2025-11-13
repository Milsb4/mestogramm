import Image from "next/image";
import { CardData } from "./types";
import { LikeButton } from "@/components/ui/Like-button/LikeButton";


interface CardProps{
card: CardData
}


export const Card:React.FC<CardProps> = ({card}) => {
    return(
        <li
        key={card.id}
        className="max-h-[240px] w-[180px] cursor-pointer"
        >   
            <Image
            alt={card.title}
            src={card.url}
            width={180}
            height={200}
            className="pb-1 object-cover rounded-[4px]">    
            </Image>
            <div
            className="flex p-2 justify-between bg-white rounded-[4px]">
                <h3
                className="text-black font-inter-medium"
                >{card.title}</h3>
                <LikeButton/>
            </div>
        </li>
    )
}