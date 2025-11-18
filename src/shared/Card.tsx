'use client';
import Image from "next/image";
import { CardData } from "./types";
import { LikeButton } from "@/components/ui/Like-button/LikeButton";
import { useState } from "react";
import OpenCardModal from "@/components/forms/OpenCardModal/OpenCardModal";

interface CardProps {
  card: CardData;
  onAddComment: (cardId: string, commentText: string) => void;
  onDeleteComment?: (cardId: string, commentId: string) => void;
}

export const Card: React.FC<CardProps> = ({ card, onAddComment, onDeleteComment }) => {
  const [showModal, setShowModal] = useState(false);

  const handleAddComment = (commentText: string) => {
    onAddComment(card.id, commentText);
  };

  return (
    <>
      <li
        key={card.id}
        className="max-h-[240px] w-[180px] relative"
       
      >
        <div
        className="cursor-pointer"
         onClick={() => setShowModal(true)}
        >
        <Image
          alt={card.title}
          src={card.url}
          width={180}
          height={200}
          className="pb-1 object-cover rounded-[4px]"
        />
        </div >
        <div className="flex p-2 justify-between bg-white rounded-[4px]">
          <h3 className="text-black font-inter-medium">{card.title}</h3> 
          <LikeButton />
        </div>
        
        {(card.comments && card.comments.length > 0) && (
          <span className="absolute top-2 right-2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
            {card.comments.length}
          </span>
        )}
      </li>

      {showModal && (
        <OpenCardModal 
          card={card} 
          onClose={() => setShowModal(false)} 
          onAddComment={handleAddComment}
          onDeleteComment={onDeleteComment}
        />
      )}
    </>
  );
};