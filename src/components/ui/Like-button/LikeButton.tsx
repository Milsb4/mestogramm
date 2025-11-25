import React from 'react'
import { useState } from 'react'
import Image from "next/image";
import likeActive from '../../../../public/like-active.svg';
import likeInactive from '../../../../public/like-inactive.svg';

export const LikeButton = () => {
  const [isLiked, setIsLiked] = useState(false)

  const handleLike = () => {
    if (isLiked == false) {
      setIsLiked(true)
    }
    else {setIsLiked(false)}
  }
  return (
        <button type="button"
        className='bg-transparent border-none'
        onClick={handleLike} 
        >
          <Image
        src={isLiked ? likeActive : likeInactive}
        alt="Like"
        width={21}
        height={18}
        className="cursor-pointer transition-opacity duration-300 hover:opacity-60"
    />
        </button>
  )
}

