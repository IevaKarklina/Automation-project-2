import { faker } from '@faker-js/faker';

describe('Issue comments creating, editing and deleting', () => {
    beforeEachVisitUrl();

    const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');
    const issueName = 'This is an issue of type: Task.'
    
    it('Should create a comment successfully', () => {
        const comment = 'TEST_COMMENT';

        getIssueDetailsModal().within(() => {
            cy.contains('Add a comment...')
                .click();

            cy.get('textarea[placeholder="Add a comment..."]').type(comment);

            cy.contains('button', 'Save')
                .click()
                .should('not.exist');

            cy.contains('Add a comment...').should('exist');
            cy.get('[data-testid="issue-comment"]').should('contain', comment);
        });
    });

    it('Should edit a comment successfully', () => {
        const previousComment = 'An old silent pond...';
        const comment = 'TEST_COMMENT_EDITED';

        getIssueDetailsModal().within(() => {
            cy.get('[data-testid="issue-comment"]')
                .first()
                .contains('Edit')
                .click()
                .should('not.exist');

            cy.get('textarea[placeholder="Add a comment..."]')
                .should('contain', previousComment)
                .clear()
                .type(comment);

            cy.contains('button', 'Save')
                .click()
                .should('not.exist');

            cy.get('[data-testid="issue-comment"]')
                .should('contain', 'Edit')
                .and('contain', comment);
        });
    });

    it('Should delete a comment successfully', () => {
        getIssueDetailsModal()
            .find('[data-testid="issue-comment"]')
            .contains('Delete')
            .click();

        cy.get('[data-testid="modal:confirm"]')
            .contains('button', 'Delete comment')
            .click()
            .should('not.exist');

        getIssueDetailsModal()
            .find('[data-testid="issue-comment"]')
            .should('not.exist');
    });

    it('Should add, update, and delete comment successfully', () => {
        const comment = faker.hacker.phrase();
        const newComment = faker.hacker.phrase();

        getIssueDetailsModal().within(() => {
            cy.contains('Add a comment...')
                .click();

            cy.get('textarea[placeholder="Add a comment..."]').type(comment);

            clickSaveButton();

            cy.contains('Add a comment...').should('exist');
            cy.get('[data-testid="issue-comment"]').should('contain', comment);

            cy.get('[data-testid="issue-comment"]')
                .first()
                .contains('Edit')
                .click()
                .should('not.exist');
    
            cy.get('textarea[placeholder="Add a comment..."]')
                .should('contain', comment)
                .clear()
                .type(newComment);
    
            clickSaveButton();
    
            cy.get('[data-testid="issue-comment"]')
                .should('contain', 'Edit')
                .and('contain', newComment);
            
            cy.get('[data-testid="issue-comment"]')
                .first()
                .contains('Delete')
                .click();
            });

        cy.get('[data-testid="modal:confirm"]')
            .contains('button', 'Delete comment')
            .click()
            .should('not.exist');
           
        cy.get('[data-testid="issue-comment"]')
            .should('not.contain', newComment);
    });

    function beforeEachVisitUrl() {
        beforeEach(() => {
            cy.visit('/');
            cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
                cy.visit(url + '/board');
                cy.contains(issueName).click();
            });
        });
    }
    
    function clickSaveButton() {
        cy.contains('button', 'Save')
            .click()
            .should('not.exist');
    }
});