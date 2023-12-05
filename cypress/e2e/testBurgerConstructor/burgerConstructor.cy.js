import { BASE_URL } from "../../../src/utils/constants";

describe("Открываем сайт", () => {
  beforeEach("Открытие", () => {
    cy.intercept("POST", `${BASE_URL}/orders`).as("postOrders");


    //Заходим в аккаунт
    cy.visit("http://localhost:3000");
    cy.get(`[href="/profile/user"]`).click();
    cy.get("[class^=Login_form__] > :nth-child(1)").type(
      "test@test.tes"
    );
    cy.get("[class^=Login_form__] > :nth-child(2)").type("testtest");
    cy.get("[class^=Login_form__] > .button").click();
    cy.get(`.AppHeader_container__v5aMf > [href="/"]`).click();
  });

  it("Оформляем заказ", () => {
    //Проверяем что конструктор пустой
    cy.get(".mt-15").should(
      "have.text",
      "Перетащите ингредиенты для бургера0Оформить заказ"
    );

    //Создаем бургер
    cy.get("#buns > .ml-4 > :nth-child(1)").first().trigger("dragstart");
    cy.get(".mt-15 > .text_type_main-medium").trigger("drop");
    cy.get("#sauce > .ml-4 > :nth-child(1)").first().trigger("dragstart");
    cy.get(".mt-15 > .custom-scroll").trigger("drop");

    //Оформляем заказ
    cy.get(".button").contains("Оформить заказ").click().wait("@postOrders");
    
    //Закрываем модалку с готовым заказом по клику на крестик 
    cy.get("[class^=ModalCloseIcon_icon__]").click();
  });

  it("Проверка модального окна ингредиента", () => {
    //Открываем модалку по клику на картинку ингредиента
    cy.get(
      `#buns > .IngredientsContainer_list__r7LSr > :nth-child(1) > .ml-4`
    ).click();

    //Закрываем модалку с ингредиентом по клику на крестик 
    cy.get("[class^=ModalCloseIcon_icon__]").click();
  });
});
