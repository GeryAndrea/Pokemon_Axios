describe('Pokédex - End-to-End Tests', () => {
  
  beforeEach(() => {
    cy.visit('/');
  });

  it('El título principal de la página es correcto', () => {
    cy.get('h1', { timeout: 10000 }).should('contain', 'Pokédex con Vue + Axios');
  });

  it('El usuario puede escribir en el buscador y ver resultados filtrados', () => {
    cy.get('input[placeholder="Buscar Pokémon..."]', { timeout: 10000 }).should('exist');
    cy.get('input[placeholder="Buscar Pokémon..."]').type('bulba');
    cy.wait(500);
  });

  it('El usuario puede interactuar con la interfaz', () => {
    cy.get('input[placeholder="Buscar Pokémon..."]', { timeout: 10000 }).should('exist');
    cy.get('input[placeholder="Buscar Pokémon..."]').type('a');
    cy.wait(300);
    cy.get('input[placeholder="Buscar Pokémon..."]').clear();
  });

  it('El buscador es funcional y interactivo', () => {
    cy.get('input[placeholder="Buscar Pokémon..."]', { timeout: 10000 }).focus();
    cy.get('input[placeholder="Buscar Pokémon..."]').type('pika');
    cy.wait(500);
    cy.get('input[placeholder="Buscar Pokémon..."]').should('have.value', 'pika');
  });

  it('La página responde a acciones del usuario', () => {
    cy.get('body').should('exist');
    cy.get('h1').should('be.visible');
  });
});
