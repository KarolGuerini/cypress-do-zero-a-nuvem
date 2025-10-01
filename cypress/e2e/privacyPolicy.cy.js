Cypress._.times(3, () => { // utilizando a funcionalidade times da biblioteca lodash
it('testa a página da política de privacidade de forma independente', () => {
    cy.visit('./src/privacy.html')
    cy.contains('#title', 'CAC TAT - Política de Privacidade')
    cy.contains('p', 'Talking About Testing').should('be.visible')
});
})

