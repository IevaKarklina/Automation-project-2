describe('Issue details editing', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
      cy.visit(url + '/board');
      cy.contains('This is an issue of type: Task.').click();
    });
  });

  it('Should update type, status, assignees, reporter, priority successfully', () => {
    getIssueDetailsModal().within(() => {
      cy.get('[data-testid="select:type"]').click('bottomRight');
      cy.get('[data-testid="select-option:Story"]')
          .trigger('mouseover')
          .trigger('click');
      cy.get('[data-testid="select:type"]').should('contain', 'Story');

      cy.get('[data-testid="select:status"]').click('bottomRight');
      cy.get('[data-testid="select-option:Done"]').click();
      cy.get('[data-testid="select:status"]').should('have.text', 'Done');

      cy.get('[data-testid="select:assignees"]').click('bottomRight');
      cy.get('[data-testid="select-option:Lord Gaben"]').click();
      cy.get('[data-testid="select:assignees"]').click('bottomRight');
      cy.get('[data-testid="select-option:Baby Yoda"]').click();
      cy.get('[data-testid="select:assignees"]').should('contain', 'Baby Yoda');
      cy.get('[data-testid="select:assignees"]').should('contain', 'Lord Gaben');

      cy.get('[data-testid="select:reporter"]').click('bottomRight');
      cy.get('[data-testid="select-option:Pickle Rick"]').click();
      cy.get('[data-testid="select:reporter"]').should('have.text', 'Pickle Rick');

      cy.get('[data-testid="select:priority"]').click('bottomRight');
      cy.get('[data-testid="select-option:Medium"]').click();
      cy.get('[data-testid="select:priority"]').should('have.text', 'Medium');
    });
  });

  it('Should update title, description successfully', () => {
    const title = 'TEST_TITLE';
    const description = 'TEST_DESCRIPTION';

    getIssueDetailsModal().within(() => {
      cy.get('textarea[placeholder="Short summary"]')
        .clear()
        .type(title)
        .blur();

      cy.get('.ql-snow')
        .click()
        .should('not.exist');

      cy.get('.ql-editor').clear().type(description);

      cy.contains('button', 'Save')
        .click()
        .should('not.exist');

      cy.get('textarea[placeholder="Short summary"]').should('have.text', title);
      cy.get('.ql-snow').should('have.text', description);
    });
  });

  const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');

  // Bonus task (#1)

  it('Should check the dropdown for priority', () => {
    const expectedLength = 5;
    let issuePriorities = [];

    getIssueDetailsModal().within(() => {
      cy.get('[data-testid="select:priority"]').children().children().eq(1)
        .invoke('text')
        .then((initialPriority) => {
          issuePriorities.push(initialPriority);
        });

      cy.get('[data-testid="select:priority"]').click();

      cy.get('[data-select-option-value]').each(($option, index) => {
        cy.wrap($option).invoke('text').then((priorityText) => {
          issuePriorities.push(priorityText);
          cy.log(`Added value: ${priorityText}, Array length: ${issuePriorities.length}`);
        });
      });
    });
    cy.then(() => {
      expect(issuePriorities.length).to.equal(expectedLength);
    });
  });

  // Bonus task (#2)
  it('Should check that the reporters name has only characters in it', () => {
    const regex = /^[A-Za-z\s]+$/;
    cy.get('[data-testid="select:reporter"]').children().children().eq(1).invoke('text').then((reporterName) => {
      expect(reporterName).to.match(regex);
    });
  });

  
});
