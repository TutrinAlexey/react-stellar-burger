export type TOrderInfo = {
  name: string;
  order: { number: number };
  success: boolean;
};

export type TOrderIngredientsId = Array<string>;

export type TOrderFeed = {
  readonly _id: string;
  readonly ingredients: string[];
  readonly name: string;
  readonly number: number;
  readonly status: string;
  readonly createdAt: string;
  readonly updatedAt: string;
};
