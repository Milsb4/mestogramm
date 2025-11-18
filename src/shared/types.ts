export interface Comment {
  id: string;
  text: string;
  createdAt: Date;
}

export interface CardData {
  id: string;
  title: string;
  url: string;
  comments: Comment[];
}
export type Card = CardData[];