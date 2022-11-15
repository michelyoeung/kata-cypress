describe('empty spec', () => {
  it('Create profile', () => {
    cy.visit('http://localhost:4200');
    cy.get('[data-cy="changeProfile"]').click();
    cy.get('[data-cy="inputName"]').type("Léopold")
    cy.get('[data-cy="inputAge"]').type("25")
    cy.get('[data-cy="inputProfilePic"]').should('exist')
    cy.get('[data-cy="inputCheck"]').click()
    cy.get('[data-cy="formValid"]').click()
    cy.wait(5000);
    // Add profile pic and Check profile into and toatsr info
  });

  it('passes', () => {
    cy.visit('http://localhost:4200');
    cy.contains('Ça part en prod!!!').click();
    cy.contains('Vegan').click();
    cy.contains('Junk Food').click();
    cy.contains('ALL').click();
    cy.contains('GO').click();
    cy.wait(5000);
  });
});
