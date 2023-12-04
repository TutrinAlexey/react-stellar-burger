describe("Открываем сайт", () => {
  beforeEach("Открытие",() => {
    cy.visit("http://localhost:3000");
    cy.intercept("GET", "/ingredients", { fixtures: "ingredients.JSON" }).as("getIngredients");
  });
  it("Проверка что конструктор пустой", () => {
    cy.get(".mt-15").should(
      "have.text",
      "Перетащите ингредиенты для бургера0Оформить заказ"
    );
  });
  it("Собираем бургер", () => {
    cy.get("#buns > .ml-4 > :nth-child(1)").first().trigger("dragstart");
    cy.get(".mt-15 > .text_type_main-medium").trigger("drop");
    cy.get("#sauce > .ml-4 > :nth-child(1)")
      .first()
      .trigger("dragstart");
    cy.get(".mt-15 > .custom-scroll").trigger("drop");
    cy.get(".button").contains("Оформить заказ").invoke("attr", "disabled")
  });
  it("Оформляем заказ", () => {
    cy.get(".button").contains("Оформить заказ").invoke("attr", "disabled")
  })
});
