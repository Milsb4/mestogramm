"use client";

import { Card } from "@/shared/Card";
import { CardData } from "@/shared/types";
import FlatList from "flatlist-react";
import { useCardContext } from "@/utils/context/CardContext";

export const CardList = () => {
  const { card, deleteCard } = useCardContext();

  const renderCard = (card: CardData, idx: string) => {
    console.log(card)
    return <Card key={card.id} card={card} />;
  };

  console.log(card)
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
