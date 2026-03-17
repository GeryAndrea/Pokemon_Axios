beforeEach(() => {
  cy.intercept('GET', '**/pokeapi.co/**', {
    statusCode: 200,
    body: {}
  }).as('pokeAPI');
});
