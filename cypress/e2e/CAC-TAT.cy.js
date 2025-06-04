describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(()=>{
    cy.visit('./src/index.html')
  })
  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')

  })
  it('preenche os campos obrigatórios e envia o formulário',()=>{
    const logText = Cypress._.repeat('abcdefghijklmnopqrstuwxyz', 10)


    cy.get('#firstName').type('Karol')
    cy.get('#lastName').type('Guerini')
    cy.get('#email').type('karolteste@exemplo.com')
    cy.get('#open-text-area').type(logText, {delay: 0})
    cy.get('.button[type="submit"]').click()

    cy.get('.success').should('be.visible')
  })
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', ()=>{
    cy.get('#firstName').type('Karol')
    cy.get('#lastName').type('Guerini')
    cy.get('#email').type('karoltesteexemplo.com')
    cy.get('#open-text-area').type('teste')
    cy.get('.button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  })

  it('campo telefone continua vazio quando preenchido com um valor não numérico', ()=>{
    cy.get('#phone')
    .type('abcde')
    .should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', ()=>{
    cy.get('#firstName').type('Karol')
    cy.get('#lastName').type('Guerini')
    cy.get('#email').type('karoltesteexemplo.com')
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type('teste')
    cy.get('.button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', ()=>{
    cy.get('#firstName')
     .type('Karol')
     .clear()
     .should('have.value', '')
    cy.get('#lastName')
     .type('Guerini')
     .clear()
     .should('have.value', '')
    cy.get('#email')
     .type('karoltesteexemplo.com')
     .clear()
     .should('have.value', '')
    cy.get('#open-text-area')
     .type('teste')
     .clear()
     .should('have.value', '')
  })

it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', ()=>{
  cy.get('.button[type="submit"]').click()

  cy.get('.error')
   .should('be.visible')
})

it.only('envia o formuário com sucesso usando um comando customizado', ()=>{
  cy.fillMandatoryFieldsAndSubmit()

  cy.get('.sucess').should('be.visible')
})
})
