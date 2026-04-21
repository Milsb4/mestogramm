'use client'

import { useContext, createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { cardsApi, commentsApi, likesApi } from "@/utils/api";
import { API_ORIGIN } from "@/utils/api";
import { useUserContext } from "@/utils/context/UserContext";

// Создаем тип для контекста
const CardContext = createContext();
const initialState = [];
export const CardProvider = ({ children }) => {
  const { profileInfo, reloadMe, isAuth } = useUserContext();
  const [card, setCard] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [likedCardIds, setLikedCardIds] = useState([]);

  const mapCard = (item) => ({
    id: String(item.id),
    title: item.title || "Карточка",
    url: item.imageUrl?.startsWith("/uploads") ? `${API_ORIGIN}${item.imageUrl}` : item.imageUrl,
    comments: [],
    ownerCardId: String(item.userId ?? "unknown"),
  });

  const loadCards = async () => {
    try {
      setIsLoading(true);
      const items = await cardsApi.getAll();
      const cardsWithComments = await Promise.all(
        items.map(async (item) => {
          try {
            const comments = await commentsApi.getByCardId(String(item.id));
            return {
              ...mapCard(item),
              comments: (comments || []).map((comment) => ({
                id: String(comment.id),
                text: comment.content,
                createdAt: new Date(comment.createdAt),
                ownerCommentID: String(comment.user?.id || comment.userId || "unknown"),
                ownerName: comment.user?.name || "Пользователь",
                ownerAvatarUrl: comment.user?.avatarUrl
                  ? comment.user.avatarUrl.startsWith("/uploads")
                    ? `${API_ORIGIN}${comment.user.avatarUrl}`
                    : comment.user.avatarUrl
                  : null,
              })),
            };
          } catch {
            return mapCard(item);
          }
        })
      );
      setCard(cardsWithComments);
      try {
        const likes = await likesApi.mine();
        setLikedCardIds(likes.likedCardIds?.map(String) || []);
      } catch {
        setLikedCardIds([]);
      }
    } catch (error) {
      console.error("Не удалось загрузить карточки:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCards();
  }, []);

  useEffect(() => {
    if (!isAuth) {
      setLikedCardIds([]);
    }
  }, [isAuth]);

  const addCard = async (newCard) => {
    try {
      const created = newCard.file
        ? await cardsApi.createWithFile({
            title: newCard.title || "Новая карточка",
            content: newCard.title || "Новая карточка",
            image: newCard.file,
          })
        : await cardsApi.create({
            title: newCard.title || "Новая карточка",
            imageUrl: newCard.url,
            content: newCard.title || "Новая карточка",
          });
      setCard((prev) => [...prev, mapCard(created)]);
      await reloadMe();
    } catch (error) {
      if (error?.message === "Unauthorized") {
        throw new Error("Чтобы добавить карточку, сначала войдите на /auth-page");
      }
      throw error;
    }
  };
 
  const deleteCard = async (id) => {
    try {
      await cardsApi.delete(id);
      setCard(prev => prev.filter(card => card.id !== id));
      await reloadMe();
    } catch (error) {
      if (error?.message === "Unauthorized") {
        throw new Error("Чтобы удалить карточку, сначала войдите на /auth-page");
      }
      if (error?.message === "Forbidden") {
        throw new Error("Можно удалять только свои карточки");
      }
      throw error;
    }
  };

  // Функция для добавления комментария
  const addComment = async (cardId, commentText) => {
    let created;
    try {
      created = await commentsApi.create(cardId, { content: commentText });
    } catch (error) {
      if (error?.message === "Unauthorized") {
        throw new Error("Чтобы оставить комментарий, сначала войдите на /auth-page");
      }
      throw error;
    }
    const newComment = {
      id: String(created.id || uuidv4()),
      text: created.content || commentText,
      createdAt: new Date(created.createdAt || Date.now()),
      ownerCommentID: String(created.userId || "me"),
      ownerName: created.user?.name || profileInfo.name || "Вы",
      ownerAvatarUrl: created.user?.avatarUrl
        ? created.user.avatarUrl.startsWith("/uploads")
          ? `${API_ORIGIN}${created.user.avatarUrl}`
          : created.user.avatarUrl
        : profileInfo.avatarUrl,
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
    await reloadMe();
  };

  // Функция для удаления комментария
  const deleteComment = async (cardId, commentId) => {
    try {
      await commentsApi.delete(commentId);
    } catch (error) {
      if (error?.message === "Unauthorized") {
        throw new Error("Чтобы удалить комментарий, сначала войдите на /auth-page");
      }
      throw error;
    }
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
    await reloadMe();
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
    editComment,
    isLoading,
    reloadCards: loadCards,
    likedCardIds,
    toggleLike: async (cardId) => {
      try {
        const result = await likesApi.toggle(cardId);
        setLikedCardIds((prev) =>
          result.liked ? [...new Set([...prev, cardId])] : prev.filter((id) => id !== cardId)
        );
      } catch (error) {
        if (error?.message === "Unauthorized") {
          throw new Error("Лайк доступен только после входа. Перейдите на /auth-page");
        }
        throw error;
      }
    },
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