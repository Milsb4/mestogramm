'use client';
import Image from "next/image";
import { CardData } from "./types";
import { LikeButton } from "@/components/ui/Like-button/LikeButton";
import { useState } from "react";
import OpenCardModal from "@/components/forms/OpenCardModal/OpenCardModal";
import { useUserContext } from "@/utils/context/UserContext";
import { useToast } from "@/components/ui/toast/ToastProvider";
import deleteIcon from "../../public/delete-icon.svg";

interface CardProps {
  card: CardData;
  onAddComment: (cardId: string, commentText: string) => Promise<void>;
  onDeleteComment?: (cardId: string, commentId: string) => Promise<void>;
  onDeleteCard?: (cardId: string) => Promise<void>;
}

export const Card: React.FC<CardProps> = ({ card, onAddComment, onDeleteComment, onDeleteCard }) => {
  const { profileInfo, isAuth } = useUserContext();
  const { showToast } = useToast();
  const [showModal, setShowModal] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState(card.url);
  

  const handleAddComment = async (commentText: string) => {
    await onAddComment(card.id, commentText);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (imageSrc !== "/avatar.jpg") {
      setImageSrc("/avatar.jpg");
      setImageLoaded(false);
    }
  };

  const canDelete = isAuth && String(profileInfo.id) === card.ownerCardId;

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
          {onDeleteCard && canDelete && (
            <button
              type="button"
              className="absolute top-2 left-2 z-20 bg-black/70 text-white rounded p-2"
              onClick={async (e) => {
                e.stopPropagation();
                try {
                  await onDeleteCard(card.id);
                } catch (error: any) {
                  showToast(error?.message || "Не удалось удалить карточку", "error");
                }
              }}
              aria-label="Удалить карточку"
              title="Удалить"
            >
              <Image src={deleteIcon} alt="Удалить" width={12} height={12} />
            </button>
          )}
          <Image
            alt={card.title}
            src={imageSrc}
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
          <LikeButton cardId={card.id} />
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