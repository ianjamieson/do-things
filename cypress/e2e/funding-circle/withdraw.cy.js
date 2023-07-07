describe('funding circle', () => {
    it('should withdraw money', () => {
        const conf = Cypress.env('funding-circle');
        cy.visit('https://www.fundingcircle.com/login')
        cy.get('#user_username').type(Cypress.env('email'))
        cy.get('#user_password').type(conf.password)
        cy.get('#submit-button').click()

        cy.get('label[for="user_input"]')
            .invoke('text')
            .then((text) => {
                // do more work here
                if(text.includes('Where did you grow up')) {
                    cy.get('#user_input').type(conf.answers.growUp)
                }
                if(text.includes('What school did you attend when you were 10 years old')) {
                    cy.get('#user_input').type(conf.answers.school)
                }
                if(text.includes('What was the name of your best friend at school')) {
                    cy.get('#user_input').type(conf.answers.friend)
                }

                cy.get('input[name="commit"]').click()
            })
        cy.get('.page-header__balance').invoke('text').then((text) => {
            const balance = text.replace(/[^0-9.-]+/g,"");
            cy.log(balance);
            cy.get('.account-card__buttons a:first-child').click()
            cy.get('#withdrawal_amount').type(balance)
            cy.get('button[type="submit"]').click()
        })
    })
})