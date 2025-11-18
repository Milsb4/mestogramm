'use client'

import { useContext, createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { card } from "@/shared/data";

// Создаем тип для контекста
const CardContext = createContext();
const initialState = card;

export const CardProvider = ({ children }) => {
  const [card, setCard] = useState(initialState);

  const addCard = (newCard) => {
    setCard((prev) => [...prev, { 
      ...newCard, 
      id: uuidv4(),
      comments: [] // Добавляем пустой массив комментариев
    }]);
  };
 
  const deleteCard = (id) => {
    setCard(prev => prev.filter(card => card.id !== id))
  }

  // Функция для добавления комментария
  const addComment = (cardId, commentText) => {
    const newComment = {
      id: uuidv4(),
      text: commentText,
      createdAt: new Date()
    };

    setCard(prevCards => 
      prevCards.map(card => 
        card.id === cardId 
          ? { 
              ...card, 
              comments: [...(card.comments || []), newComment] 
            }
          : card
      )
    );
  };

  // Функция для удаления комментария
  const deleteComment = (cardId, commentId) => {
    setCard(prevCards =>
      prevCards.map(card =>
        card.id === cardId
          ? {
              ...card,
              comments: card.comments?.filter(comment => comment.id !== commentId) || []
            }
          : card
      )
    );
  };

  // Функция для редактирования комментария
  const editComment = (cardId, commentId, newText) => {
    setCard(prevCards =>
      prevCards.map(card =>
        card.id === cardId
          ? {
              ...card,
              comments: card.comments?.map(comment =>
                comment.id === commentId
                  ? { ...comment, text: newText, updatedAt: new Date() }
                  : comment
              ) || []
            }
          : card
      )
    );
  };

  const value = {
    card,
    addCard,
    deleteCard,
    addComment,
    deleteComment,
    editComment
  };

  return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
};

export const useCardContext = () => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error('useCard must be used within a CardProvider');
  }
  return context
};