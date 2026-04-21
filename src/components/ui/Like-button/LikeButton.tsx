"use client";
import Image from "next/image";
import likeActive from '../../../../public/like-active.svg';
import likeInactive from '../../../../public/like-inactive.svg';
import { useCardContext } from "@/utils/context/CardContext";
import { useToast } from "@/components/ui/toast/ToastProvider";

export const LikeButton = ({ cardId }: { cardId: string }) => {
  const { likedCardIds, toggleLike } = useCardContext();
  const { showToast } = useToast();
  const isLiked = likedCardIds.includes(cardId);
  return (
        <button type="button"
        className='bg-transparent border-none'
        onClick={async () => {
          try {
            await toggleLike(cardId);
          } catch (error: any) {
            showToast(error?.message || "Сначала выполните вход на /auth-page", "error");
          }
        }} 
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

