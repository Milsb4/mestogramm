'use client'

import { useContext, createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { card } from "@/shared/data";

const CardContext = createContext();
const initialState = card;

export const CardProvider = ({ children }) => {
  const [card, setCard] = useState(initialState);

  const addCard = (newCard) => {
    setCard((prev) => [...prev, { ...newCard, id: uuidv4() }]);
  };
 
  const deleteCard = (id) => {
    setCard(prev => prev.filter(card => card.id !== id))
  }

  const value = {
    card,
    addCard,
    deleteCard
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
