/ <reference types="cypress" / >

  describe('Central de Atendimento ao Cliente TAT', () => {
    beforeEach(() => {  //lição 2
      cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', () => {  //lição 1
      cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', () => { //lição 2
      cy.clock() // congela o relógio do navegador

      const logText = Cypress._.repeat('abcdefghijklmnopqrstuwxyz', 10)//Cypress._.repeat é uma biblioteca que repete a string um número de vezes

      cy.get('#firstName').type('Karol')
      cy.get('#lastName').type('Guerini')
      cy.get('#email').type('karolteste@exemplo.com')
      cy.get('#open-text-area').type(logText, { delay: 0 })//delay é como se fosse copia e cola
      cy.get('.button[type="submit"]').click()

      cy.get('.success')
        .should('be.visible')

      cy.tick(3000) // avança o tempo em 3 segundos, evitando o timeout default do cypress

      cy.get('.success').should('not.be.visible')
    })
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => { //lição 2

      cy.clock()

      cy.get('#firstName').type('Karol')
      cy.get('#lastName').type('Guerini')
      cy.get('#email').type('karoltesteexemplo.com')
      cy.get('#open-text-area').type('teste')
      cy.contains("button", "Enviar").click()
      // cy.get('.button[type="submit"]').click() usando o .get para buscar um elemento no DOM e clicar nele

      cy.get('.error')
        .should('be.visible')

      cy.tick(3000)

      cy.get('.error')
        .should('not.be.visible')

    })

    it('campo telefone continua vazio quando preenchido com um valor não numérico', () => { //lição 2
      cy.get('#phone')
        .as('phone')// dando um alias
        .type('abcde')
      cy.get('@phone')//chamando o alias
        .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => { //lição 2
      cy.clock()

      cy.get('#firstName').type('Karol')
      cy.get('#lastName').type('Guerini')
      cy.get('#email').type('karoltesteexemplo.com')
      cy.get('#phone-checkbox').check()
      cy.get('#open-text-area').type('teste')
      cy.contains("button", "Enviar").click()

      cy.get('.error')
        .should('be.visible')

      cy.tick(3000)

      cy.get('.error')
        .should('not.be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => { //lição 2

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

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => { //lição 2
      cy.clock()

      cy.contains("button", "Enviar").click()

      cy.get('.error')
        .should('be.visible')

      cy.tick(3000)

      cy.get('.error')
        .should('not.be.visible')

    })

    it('envia o formuário com sucesso usando um comando customizado', () => { //lição 2
      cy.clock()

      cy.fillMandatoryFieldsAndSubmit()

      cy.get('.success')
        .should('be.visible')

      cy.tick(3000)

      cy.get('.success')
        .should('not.be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado passando um argumento', () => { //lição 2
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


    it('envia o formuário com sucesso usando um comando customizado passando um valor padrão', () => { //lição 2

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

    it('marca o tipo de atendimento "Feedback" que é do tipo radio', () => {//lição 4
      cy.get('input[type="radio"][value="feedback"]')
        .check()
        //  cy.get('input[type="radio"]').check('feedback')
        .should('be.checked')
    });

    it('marca cada tipo de atendimento do tipo radio', () => {
      cy.get('input[type="radio"]')
        .each(typeRadios => {
          cy.wrap(typeRadios)
            .check()
            .should('be.checked')
        })
    });


    it('marca ambos os checkboxes, depois desmarca o último', () => {
      cy.get('input[type="checkbox"]').check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
    });

    it('seleciona um arquivo da pasta fixtures  para fazer uoload do arquivo', () => {
      cy.get('#file-upload')
        .selectFile('cypress/fixtures/example.json')//passa o arquivo através do caminho dele no projeto
        .should(input => { // input é uma variavel que foi dado para armazenar o elemento file-upload
          expect(input[0].files[0].name).to.equal('example.json')
        })
    });

    it('seleciona um arquivo simulando um drag and drop', () => {//simula um usuário arrastando o arquivo para fazer o download
      cy.get('#file-upload')
        .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })//passa como argumento um objeto JS com a propriedade action e o valor drag-drop
        .should(input => {
          expect(input[0].files[0].name).to.equal('example.json')
        })
    });

    it('seleciona um arquivo utilizando a funcao fixture para a qual foi dada um alias', () => {
      cy.fixture("example.json").as('sampleFile')//passando um arquivo através da fixture e dando um alias (apelido) com o comando "as" 
      cy.get('#file-upload')
        .selectFile('@sampleFile')//chamando o alias (apelido)
        .should(input => {
          expect(input[0].files[0].name).to.equal('example.json')
        })
    });

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
      cy.contains('a', 'Política de Privacidade')// passa o primeiro argumento a tag 'a' e depois o segundo argumento é o texto que está na tag
        .should('have.attr', 'href', 'privacy.html')
        .and('have.attr', 'target', '_blank')
    });

    it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
      cy.contains('a', 'Política de Privacidade')
        .invoke('removeAttr', 'target') // remove o atrituto target do elemento 
        .click()

      cy.contains('#title', 'CAC TAT - Política de Privacidade')
    });

    it('exibe e oculta as mensagens de sucesso e erro usando .invoke()', () => {
      cy.get('.success')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Mensagem enviada com sucesso.')
        .invoke('hide')
        .should('not.be.visible')
      cy.get('.error')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Valide os campos obrigatórios!')
        .invoke('hide')
        .should('not.be.visible')
    })

    it('preenche o campo da área de texto usando o comando invoke', () => {
      cy.get('#open-text-area')
        .invoke('val', 'um texto qualquer') // o invoke aqui simula um ctrl + v
        .should('have.value', 'um texto qualquer')
    });

    it('faz uma requisição HTTP', () => {
      cy.request('https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html')
        .as('getRequest')
        .its('status') // O .its('status') já “navega” até a propriedade status da resposta
        .should('be.equal', 200)
      cy.get('@getRequest')
        .its('statusText')
        .should('be.equal', 'OK')
      cy.get('@getRequest')
        .its('body')
        .should('include', 'CAC TAT')
    });

    it.only('encontra o gato escondido', () => {
        cy.get('#cat')
          .invoke('show')
          .should('be.visible')
        cy.get('#title')
          .invoke('text', 'CAT TAT') // O .invoke pega o elemento e muda o texto dele
        cy.get('#subtitle')
          .invoke('text', 'Eu amo os animais')   
    });
  })