'use client'

import { Card } from "@/shared/Card";
import { CardData } from "@/shared/types";
import { card } from "@/shared/data";
import FlatList from 'flatlist-react';

export const List = () => {
  const renderCard = (card: CardData, idx: string) => {
    return <Card key={card.id} card={card}/>
  }

  return ( 
        <ul 
        className="grid m-0 p-0 list-none gap-[20px] grid-cols-[repeat(auto-fit,180px)] justify-center">
           <FlatList
           list={card}
           renderItem={renderCard}
           renderWhenEmpty={() => <div>Оххх.. Этот список пуст</div>}
           >
           </FlatList>
        </ul>
  );
};
