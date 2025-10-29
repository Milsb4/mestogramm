import Image from "next/image";
import { CardData } from "./types";

interface CardProps{
card: CardData
}


export const Card:React.FC<CardProps> = ({card}) => {
    return(
        <li
        key={card.id}
        className="h-[240px] w-[180px] cursor-pointer"
        >
            <Image
            alt={card.name}
            src={card.image}
            width={180}
            height={200}
            className="pb-[2px] rounded-[4px]">    
            </Image>
            <div
            className="bg-[#ffffff] rounded-[4px]">
                <h3
                className="text-[#000000] m-[0] p-[10px]"
                >{card.name}</h3>
            </div>
            
        </li>
    )
}