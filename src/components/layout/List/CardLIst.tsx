"use client";

import { Card } from "@/shared/Card";
import { CardData, Comment } from "@/shared/types";
import FlatList from "flatlist-react";
import { useCardContext } from "@/utils/context/CardContext";

export const CardList = () => {
  const { card, deleteCard, addComment, deleteComment } = useCardContext(); // Добавляем функции в контекст

  const renderCard = (card: CardData, idx: string) => {
    return (
      <Card 
        key={card.id} 
        card={card} 
        onAddComment={addComment} // Используем функцию из контекста
        onDeleteComment={deleteComment} // Используем функцию из контекста
      />
    );
  };

  console.log('CardList - cards:', card);
  
  return (
    <ul className="grid m-0 p-0 list-none gap-4 grid-cols-[repeat(auto-fit,180px)] justify-center">
      <FlatList
        list={card}
        renderItem={renderCard}
        extraData={card}
        renderWhenEmpty={() => <div>Оххх.. Этот список пуст</div>}
      ></FlatList>
    </ul>
  );
};