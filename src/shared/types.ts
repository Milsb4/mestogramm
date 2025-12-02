export interface Comment {
  id: string;
  text: string;
  createdAt: Date;
  ownerCommentID: string;
}

export interface CardData {
  id: string;
  title: string;
  url: string;
  comments: Comment[];
  ownerCardId: string;
}
export type Card = CardData[];