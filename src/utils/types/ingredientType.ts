export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};

export type TConstructorIngredient = TIngredient & {
  _constId: string;
}
export type TIngredientSort = TIngredient & {
  amount: number;
}

export type TGetIngredient = {data: Array<TIngredient>}