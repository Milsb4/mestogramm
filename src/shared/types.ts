export interface Comment {
  id: string;
  text: string;
  createdAt: Date;
  ownerCommmentID: string;
}

export interface CardData {
  id: string;
  title: string;
  url: string;
  comments: Comment[];
  ownerCardId: string;
}
export type Card = CardData[];