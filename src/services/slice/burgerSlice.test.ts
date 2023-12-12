import { TConstructorIngredient } from "../../utils/types/ingredientType";
import burgerSlice, {
  addIngredients,
  swapIngredients,
  deleteIngredients,
  clearIngredients,
  initialState,
} from "./burgerSlice";

const ingredient = {
  _id: "60666c42cc7b410027a1a9b6",
  _constId: "60666c42cc7b410027asdaas",
  name: "Биокотлета из марсианской Магнолии",
  type: "main",
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: "https://code.s3.yandex.net/react/code/meat-01.png",
  image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
  __v: 0,
};

describe("Тестируем слайс бургера", () => {
  test("test addIngredients", () => {
    expect(burgerSlice(initialState, addIngredients(ingredient))).toEqual(
      ingredient.type === "bun"
        ? { ...initialState, bunsBurger: [ingredient] }
        : {
            ...initialState,
            ingredientsBurger: [...initialState.ingredientsBurger, ingredient],
          }
    );
    expect(burgerSlice(undefined, addIngredients(ingredient))).toEqual(
      ingredient.type === "bun"
        ? { ...initialState, bunsBurger: [ingredient] }
        : {
            ...initialState,
            ingredientsBurger: [...initialState.ingredientsBurger, ingredient],
          }
    );
  });

  test("test swapIngredients", () => {
    const indexTo = 2;
    const newState = {
      bunsBurger: [],
      ingredientsBurger: [
        {
          _id: "60666c42cc7b410027a1a9b7",
          _constId: "60666c42cc7b410027a1a9asd",
          name: "Соус Spicy-X",
          type: "sauce",
          proteins: 30,
          fat: 20,
          carbohydrates: 40,
          calories: 30,
          price: 90,
          image: "https://code.s3.yandex.net/react/code/sauce-02.png",
          image_mobile:
            "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
          image_large:
            "https://code.s3.yandex.net/react/code/sauce-02-large.png",
          __v: 0,
        },
        ingredient,
      ],
    };
    const indexFrom = newState.ingredientsBurger.indexOf(ingredient);
    expect(
      burgerSlice(
        newState,
        swapIngredients({
          indexFrom: indexFrom,
          indexTo: indexTo,
          ingredient: ingredient,
        })
      )
    ).toEqual({
      ...newState,
    });
    expect(
      burgerSlice(
        undefined,
        swapIngredients({
          indexFrom: indexFrom,
          indexTo: indexTo,
          ingredient: ingredient,
        })
      )
    ).toEqual({
      ...initialState,
      ingredientsBurger: [ingredient],
    });
  });

  test("test deleteIngredients", () => {
    const arrayAfterDelete = initialState.ingredientsBurger.filter(
      (item: TConstructorIngredient) => item._constId !== ingredient._constId
    );
    expect(
      burgerSlice(initialState, deleteIngredients(ingredient._constId))
    ).toEqual({ ...initialState, ingredientsBurger: arrayAfterDelete });
    expect(
      burgerSlice(undefined, deleteIngredients(ingredient._constId))
    ).toEqual({ bunsBurger: [], ingredientsBurger: arrayAfterDelete });
  });
  test("test clearIngredients", () => {
    expect(burgerSlice(initialState, clearIngredients())).toEqual({
      bunsBurger: [],
      ingredientsBurger: [],
    });
    expect(burgerSlice(undefined, clearIngredients())).toEqual({
      bunsBurger: [],
      ingredientsBurger: [],
    });
  });
});
