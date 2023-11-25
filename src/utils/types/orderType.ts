export type TOrderInfo = {
  name: string;
  order: { number: number };
  success: boolean;
};

export type TOrderIngredientsId = Array<string>

export type TOrderFeed = {
  _id: string;
  ingredients: string[];
  name: string;
  number: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}