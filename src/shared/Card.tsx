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
  const [imageLoaded, setImageLoaded] = useState(false);
  

  const handleAddComment = (commentText: string) => {
    onAddComment(card.id, commentText);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error('Error loading image:', card.url);
    const target = e.target as HTMLImageElement;
    target.style.display = 'none';
  };

  return (
    <>
      <li
        key={card.id}
        className="w-[200px] h-[260px] relative bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group"
      >
        {/* Контейнер для изображения с фиксированными размерами */}
        <div
          className="cursor-pointer w-full h-[200px] relative bg-gray-100 overflow-hidden"
          onClick={() => setShowModal(true)}
        >
          <Image
            alt={card.title}
            src={card.url}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`
              object-cover transition-opacity duration-300
              ${imageLoaded ? 'opacity-100' : 'opacity-0'}
              group-hover:scale-105 transition-transform duration-300
            `}
            onLoad={handleImageLoad}
            onError={handleImageError}
            priority={false}
          />
          
          {/* Плейсхолдер пока изображение загружается */}
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
              <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

        {card.comments?.length > 0 && (
  <span className="absolute top-2 right-2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium shadow-sm z-10">
    {card.comments.length}
  </span>
)}
        </div>

        {/* Нижняя часть карточки с заголовком и лайком */}
        <div className="flex items-center justify-between p-3 h-[60px]">
          <h3 className="text-black font-inter-medium text-sm leading-tight line-clamp-2 flex-1 mr-2">
            {card.title}
          </h3> 
          <LikeButton />
        </div>
      </li>

      {/* Модальное окно */}
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