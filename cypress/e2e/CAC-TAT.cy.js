/ <reference types="cypress" />

describe('Central de Atendimento ao Cliente TAT', () => {
    beforeEach(()=>{  //lição 2
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {  //lição 1
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário',()=>{ //lição 2
    const logText = Cypress._.repeat('abcdefghijklmnopqrstuwxyz', 10)//Cypress._.repeat é uma biblioteca que repete a string um número de vezes

    cy.get('#firstName').type('Karol')
    cy.get('#lastName').type('Guerini')
    cy.get('#email').type('karolteste@exemplo.com')
    cy.get('#open-text-area').type(logText, {delay: 0})//delay é como se fosse copia e cola
    cy.get('.button[type="submit"]').click()

    cy.get('.success')
    .should('be.visible')
  })
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', ()=>{ //lição 2

    cy.get('#firstName').type('Karol')
    cy.get('#lastName').type('Guerini')
    cy.get('#email').type('karoltesteexemplo.com')
    cy.get('#open-text-area').type('teste')
    cy.contains("button", "Enviar").click()
    // cy.get('.button[type="submit"]').click() usando o .get para buscar um elemento no DOM e clicar nele


    cy.get('.error')
    .should('be.visible')
  })

  it('campo telefone continua vazio quando preenchido com um valor não numérico', ()=>{ //lição 2
    cy.get('#phone')
    .as('phone')
    .type('abcde')
    cy.get('@phone')
    .should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', ()=>{ //lição 2

    cy.get('#firstName').type('Karol')
    cy.get('#lastName').type('Guerini')
    cy.get('#email').type('karoltesteexemplo.com')
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type('teste')
    cy.contains("button", "Enviar").click()

    cy.get('.error')
    .should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', ()=>{ //lição 2

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

it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', ()=>{ //lição 2

    cy.contains("button", "Enviar").click()

  cy.get('.error')
   .should('be.visible')
})

it('envia o formuário com sucesso usando um comando customizado', ()=>{ //lição 2
  cy.fillMandatoryFieldsAndSubmit()
  
    cy.get('.success')
    .should('be.visible')
})

it('envia o formuário com sucesso usando um comando customizado passando um argumento', ()=>{ //lição 2
  const data = {
    firstName: 'Karol',
    lastName: 'Guerini',
    email: 'kg@teste.com',
    text: 'Testando 123'
  }
  cy.fillMandatoryFieldsAndSubmitWithData(data)
  
    cy.get('.success')
    .should('be.visible')
})


it('envia o formuário com sucesso usando um comando customizado passando um valor padrão', ()=>{ //lição 2

  cy.fillMandatoryFieldsAndSubmitWithDataDefault()
  
    cy.get('.success')
    .should('be.visible')
})

it('seleciona um produto (YouTube) por seu texto ', () => {//lição 3
  cy.get('#product')
  .select("YouTube")
  .should("have.value", "youtube")
    
});

it('seleciona um produto (Mentoria) por seu value ', () => {//lição 3
  cy.get('#product')
  .select("mentoria")
  .should("have.value", "mentoria")
    
});

it('seleciona um produto (Blog) por seu value ', () => {//lição 3
  cy.get('#product')
  .select(1)
  .should("have.value", "blog")
    
});

it.only('marca o tipo de atendimento "Feedback"', () =>{//lição 4
cy.get('input[type="radio"][value="feedback"]')
    .check()
//  cy.get('input[type="radio"]').check('feedback')
  .should('be.checked')
});

it('marca cada tipo de atendimento', () => {
  cy.get('input[type="radio"]')
    .each(typeRadios => {
      cy.wrap(typeRadios)
      .check()
      .should('be.checked')
    })
    
});
})


