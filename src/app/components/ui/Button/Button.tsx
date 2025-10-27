import Image from 'next/image'

type ButtonProps = {
   image: string 
}


export const Button = ({image}: ButtonProps) => {
    return(
       <button
       type="button"
       className="h-[50px] w-[150px] flex justify-center items-center bg-[#000000] border border-solid border-[#ffffff]"
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