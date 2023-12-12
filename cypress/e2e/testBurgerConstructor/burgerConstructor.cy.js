import { BASE_URL } from "../../../src/utils/constants";

const testUrl = "http://localhost:3000"

describe("Открываем сайт", () => {
  beforeEach("Открытие", () => {
    cy.intercept("POST", `${BASE_URL}/orders`).as("postOrders");

    const loginForm = "[class^=Login_form__]"
    
    //Заходим в аккаунт
    cy.visit(testUrl);
    cy.get(`[href="/profile/user"]`).click();


    cy.get(`${loginForm} > :nth-child(1)`).type(
      "test@test.tes"
    );
    cy.get(`${loginForm} > :nth-child(2)`).type("testtest");
    cy.get(`${loginForm} > .button`).click();

    cy.get(`[class^=AppHeader_container__] > [href="/"]`).click();
  });

  it("Оформляем заказ", () => {
    cy.get(".button").contains("Оформить заказ").as("submitButton")
    //Проверяем что конструктор пустой
    cy.get(".mt-15").should(
      "have.text",
      "Перетащите ингредиенты для бургера0Оформить заказ"
    );
    cy.get("@submitButton").should("be.disabled")
    //Создаем бургер
    cy.get("#buns > .ml-4 > :nth-child(1)").first().trigger("dragstart");
    cy.get("@submitButton").should("be.disabled")
    cy.get(".mt-15 > .text_type_main-medium").trigger("drop");
    cy.get("#sauce > .ml-4 > :nth-child(1)").first().trigger("dragstart");
    cy.get(".mt-15 > .custom-scroll").trigger("drop");

    //Оформляем заказ
    cy.get("@submitButton").click().wait("@postOrders");
    
    //Закрываем модалку с готовым заказом по клику на крестик 
    cy.get("[class^=ModalCloseIcon_icon__]").click();
  });

  it("Проверка модального окна ингредиента", () => {
    //Открываем модалку по клику на картинку ингредиента
    cy.get(
      `#buns > .ml-4 > :nth-child(1) > .ml-4`
    ).click();

    //Закрываем модалку с ингредиентом по клику на крестик 
    cy.get("[class^=ModalCloseIcon_icon__]").click();
  });
});
