describe('My different specs', () => {
  it('Example 2', () => {
    cy.visitLocal();
    cy.get('[data-cy="changeProfile"]').click();
    cy.get('[data-cy="inputName"]').type('Léopold');
    cy.get('[data-cy="inputAge"]').type('25');
    cy.get('[data-cy="inputProfilePic"]').should('exist');
    cy.get('[data-cy="inputCheck"]').click();
    cy.get('[data-cy="formValid"]').click();
    cy.wait(5000);
  });
});
