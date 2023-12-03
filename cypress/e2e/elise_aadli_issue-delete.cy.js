

describe('Issue delete', () => {
  beforeEach(() => {
      cy.visit('/');
      cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
        cy.visit(url + '/board');
        cy.contains('This is an issue of type: Task.').click();
        getIssueDetailsModal
      });
  });
  
  it('Should delete the issue', () => {
    cy.get('[data-testid="icon:trash"]').click();
    cy.get('.dIxFno > .sc-bxivhb').click();
    cy.get('[data-testid="modal:confirm"]').should('not.exist');
    cy.contains('This is an issue of type: Task.').should('not.exist');

  });

  it('Should cancel the issue deletion', () => {
    cy.get('[data-testid="icon:trash"]').click();
    cy.get('.sc-kgoBCf > .ewzfNn > .sc-bxivhb').click();
    cy.get('[data-testid="modal:confirm"]').should('not.exist');
    cy.contains('This is an issue of type: Task.').should('exist');
  });




  const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');
});











