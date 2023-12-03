describe('Issue task deletion', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
        cy.visit(url + '/board');
        cy.contains('This is an issue of type: Task.').click();
        cy.get('[data-testid="modal:issue-details"]').should('be.visible')
      });
    });
    it('Test Case 1: Issue Deletion:', () => {
        cy.get('[data-testid="icon:trash"]').click();
        cy.get('[data-testid="modal:confirm"]').should('be.visible');
        cy.get('[data-testid="modal:confirm"]').within(() => {
            cy.contains('Are you sure you want to delete this issue?').should('be.visible');
            cy.contains("Once you delete, it's gone for good.").should('be.visible');
        cy.contains('Delete issue').click();
        cy.get('[data-testid="modal:confirm"]').should('not.exist');
        cy.contains('This is an issue of type: Task.').should('not.exist');
        
    });
});
    it('Test Case 2: Issue Deletion Cancellation', () => {
        cy.get('[data-testid="icon:trash"]').click();
        cy.get('[data-testid="modal:confirm"]').should('be.visible');
            cy.contains('Are you sure you want to delete this issue?').should('be.visible');
            cy.contains("Once you delete, it's gone for good.").should('be.visible');
        cy.contains('Cancel').click();
        cy.get('[data-testid="modal:confirm"]').should('not.exist');
     cy.get('[data-testid="modal:issue-details"]').should('be.visible');
     cy.get('[data-testid="icon:close"]').first().click();
     cy.get('[data-testid="modal:issue-details"]').should('not.exist')
     cy.contains('This is an issue of type: Task.').should('be.visible');
     cy.get('[data-testid="board-list:backlog').should('be.visible').and('have.length', '1').within(() => {
        cy.get('[data-testid="list-issue"]')
          .should('have.length', '4')
          .first()
          .find('p')
          .contains('Task');
          cy.get('[data-testid="icon:task"]').should('be.visible');
        });
    });
});