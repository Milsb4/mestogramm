import Image from "next/image";

export const Card = () => {
    return(
        <div
        className="h-[430px] w-[280px] border border-solid border-[#ffffff]"
        >
            <Image
            alt=""
            src={''}
            width={270}
            height={180}
            className="p-[5px]">    
            </Image>
            <h3>Название</h3>
            <p>Описание</p>
        </div>
    )
}