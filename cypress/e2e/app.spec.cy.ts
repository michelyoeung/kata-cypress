describe('empty spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:4200');
    cy.contains('Ça part en prod!!!').click();
    cy.contains('Vegan').click();
    cy.contains('Junk Food').click();
  });
});
