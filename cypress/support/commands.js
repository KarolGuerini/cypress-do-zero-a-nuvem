Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName').type('Karol')
    cy.get('#lastName').type('Guerini')
    cy.get('#email').type('karolteste@exemplo.com')
    cy.get('#open-text-area').type('Teste')
    cy.contains("button", "Enviar").click()
})

Cypress.Commands.add('fillMandatoryFieldsAndSubmitWithData', data => {
    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.get('#open-text-area').type(data.text)
    cy.contains("button", "Enviar").click()
})

Cypress.Commands.add('fillMandatoryFieldsAndSubmitWithDataDefault', (data ={
    firstName: "Jonh",
    lastName: "Doe",
    email: "jonhdoe@teste.com",
    text: "Teste Default"
}) => {
    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.get('#open-text-area').type(data.text)
    cy.contains("button", "Enviar").click()
})