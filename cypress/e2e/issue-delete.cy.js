describe('Issue deletion and cancellation', () => {
    const issueName = 'This is an issue of type: Task.'
    
    beforeEach(() => {
      cy.visit('/');
      cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
        cy.visit(url + '/board');
        cy.contains(issueName).click();
        cy.get('[data-testid="modal:issue-details"]').should('exist');
      });
    });

    it('Should delete an issue and validate its deletion', () => {
        cy.get('[data-testid="icon:trash"]').click();
        cy.get('[data-testid="modal:confirm"]').should('be.visible')+
            ('have.text', "Are you sure you want to delete this issue? Once you delete, it's gone for good.");
        cy.get('button').contains('Delete issue').should('be.visible')
            .click();
        cy.get('[data-testid="modal:confirm"]').should('not.exist');
        cy.reload();
        cy.contains(issueName).should('not.exist');
    });

    it('Should initate but cancel deletion of an issue', () => {
        cy.get('[data-testid="icon:trash"]').click();
        cy.get('[data-testid="modal:confirm"]').should('be.visible')+
            ('have.text', "Are you sure you want to delete this issue? Once you delete, it's gone for good.");
        cy.get('button').contains('Cancel').should('be.visible')
            .click();
        cy.get('[data-testid="modal:confirm"]').should('not.exist');
        cy.get('[data-testid="modal:issue-details"]').should('be.visible');
        cy.get('[data-testid="icon:close"]').eq(0).click();
        cy.contains(issueName).should('be.visible');
    });
})