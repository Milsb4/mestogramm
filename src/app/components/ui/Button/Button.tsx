import Image from 'next/image'

type ButtonProps = {
   image: string 
}


export const Button = ({image}: ButtonProps) => {
    return(
       <button
       type="button"
       className="mr-[20px] h-[50px] w-[150px] flex justify-center items-center bg-[#000000] cursor-pointer border border-solid border-[#ffffff]"
       >
        <Image
        alt={image}
        src={image}
        width={30}
        height={30}
        />    
       </button>
    )
}