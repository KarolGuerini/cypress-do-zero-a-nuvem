Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName').type('Karol')
    cy.get('#lastName').type('Guerini')
    cy.get('#email').type('karolteste@exemplo.com')
    cy.get('#open-text-area').type('Teste')
    cy.get('.button[type="submit"]').click()
})