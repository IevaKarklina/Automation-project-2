describe('Time tracking functionality - time estimation and logging', () => {
    beforeEachvisitUrlAndClearEstimatedAndTrackedTime();

const issueTitle = 'This is an issue of type: Task.'
const estimatedTime = 10
const updatedEstimatedTime = 20
const timeSpent = 2
const timeRemaining = 5
const closeIssueDetailModal = () => cy.get('[data-testid="icon:close"]').eq(0).click();
const openIssue = () => cy.contains(issueTitle).click();

    it('Should add, update and remove time estimation', () => {
    // Time estimation
        setEstimatedTime();
        closeIssueDetailModal();
        openIssue();
        cy.get('[data-testid="modal:issue-details"]').within(() => {
        cy.get('[placeholder="Number"]').should('have.value', estimatedTime);
        cy.contains(`${estimatedTime}h estimated`).should('be.visible');    
    // Time estimation update
        cy.get('[placeholder="Number"]').clear()
            .type(updatedEstimatedTime)
            .should('have.value', updatedEstimatedTime);
        cy.contains(`${updatedEstimatedTime}h estimated`).should('be.visible');
        closeIssueDetailModal();
        });  
        openIssue();
        cy.get('[data-testid="modal:issue-details"]').within(() => {
        cy.get('[placeholder="Number"]').should('have.value', updatedEstimatedTime);
        cy.contains(`${updatedEstimatedTime}h estimated`).should('be.visible');
    // Time estimation deletion
        cy.get('[placeholder="Number"]').clear();
        cy.contains('No time logged').should('be.visible');
        cy.contains(`${updatedEstimatedTime}h estimated`).should('not.exist');
        closeIssueDetailModal();
        });
        openIssue();
        cy.get('[data-testid="modal:issue-details"]').within(() => {
        cy.get('[placeholder="Number"]').should('have.value', '');
        cy.contains(`${updatedEstimatedTime}h estimated`).should('not.exist');   
        });
    });

    it('Should log and remove logged time', () => {
    // Logging time
        setEstimatedTime();
        cy.get('[data-testid="icon:stopwatch"]').click();
        cy.get('[data-testid="modal:tracking"]').should('be.visible').within(() => {
            cy.contains('Time tracking').should('be.visible');
            cy.contains('Time spent (hours)').should('be.visible');
            cy.get('[placeholder="Number"]').eq(0).should('be.visible')
                .click()
                .type(timeSpent)
                .should('have.value', timeSpent);
            cy.contains(`${timeSpent}h logged`).should('be.visible');
            cy.contains('Time remaining (hours)').should('be.visible');
            cy.get('[placeholder="Number"]').eq(1).should('be.visible')
                .click()
                .type(timeRemaining)
                .should('have.value', timeRemaining);
            cy.contains(`${timeRemaining}h remaining`).should('be.visible');
            cy.contains('Done').click();
            });
        cy.get('[data-testid="modal:tracking"]').should('not.exist');
    // Remove logged time
        cy.get('[data-testid="icon:stopwatch"]').click();
        cy.get('[data-testid="modal:tracking"]').should('be.visible').within(() => {
            cy.get('[placeholder="Number"]').eq(0).clear()
                .should('have.value', '')
            cy.contains(`${timeSpent}h logged`).should('not.exist');
            cy.contains('No time logged').should('be.visible');
            cy.get('[placeholder="Number"]').eq(1).clear()
                .should('have.value', '')
            cy.contains(`${timeRemaining}h remaining`).should('not.exist');
            cy.contains('Done').click();
            }); 
        cy.get('[data-testid="modal:tracking"]').should('not.exist');
        cy.get('[data-testid="modal:issue-details"]').within(() => {
            cy.contains('No time logged').should('be.visible'); 
            cy.contains(`${timeSpent}h logged`).should('not.exist');
            cy.contains(`${timeRemaining}h remaining`).should('not.exist'); 
            });
        });


function beforeEachvisitUrlAndClearEstimatedAndTrackedTime() {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
            cy.visit(url + '/board');
        openIssue();
        cy.get('[placeholder="Number"]').clear();
        cy.get('[data-testid="icon:stopwatch"]').click();
        cy.get('[placeholder="Number"]').eq(1).clear();
        cy.get('[placeholder="Number"]').eq(2).clear();
        cy.get('button').contains('Done').click();
        closeIssueDetailModal();
        openIssue();
        });
    });
}

function setEstimatedTime(){
    cy.get('[data-testid="modal:issue-details"]').within(() => {
        cy.contains('No time logged').should('be.visible');
        cy.get('[placeholder="Number"]').click()
            .type(estimatedTime)
            .should('have.value', estimatedTime);
        cy.contains(`${estimatedTime}h estimated`).should('be.visible');
        });
}
});