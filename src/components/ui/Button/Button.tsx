import Image from 'next/image'

type ButtonProps = {
   image: string 
}

export const Button = ({image}: ButtonProps) => {
    return(
       <button
       type="button"
        data-bs-toggle="modal" 
        data-bs-target="#addPhoto"
       className=" h-[50px] w-[150px] flex justify-center hover:opacity-60 items-center cursor-pointer border border-solid border-white"
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