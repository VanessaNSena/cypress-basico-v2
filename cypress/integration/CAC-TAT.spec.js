/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function()  {
        const longText ='Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste'
       
        cy.get('#firstName').type('Vanessa')
        cy.get('#lastName').type('Sena')
        cy.get('#email').type('vanessa@exemplo.com')
        cy.get('#open-text-area').type(longText,{delay: 0} )
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })

    it.only('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('#firstName').type('Vanessa')
        cy.get('#lastName').type('Sena')
        cy.get('#email').type('vanessa@exemplo,com')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it.only('campo telefone continua vazio quando preenchido com valor no-numérico', function() {
        cy.get('#phone')
        .type('abcdefghij')
        .should('have.value', '')
    })

    it.only('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulári', function() {
        cy.get('#firstName').type('Vanessa')
        cy.get('#lastName').type('Sena')
        cy.get('#email').type('vanessa@exemplo.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
})

    it.only('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName')
        .type('Vanessa')
        .should('have.value', 'Vanessa')
        .clear()
        .should('have.value', '')
        cy.get('#lastName')
        .type('Sena')
        .should('have.value', 'Sena')
        .clear()
        .should('have.value', '')
        cy.get('#email')
        .type('vanessa@exemplo.com')
        .should('have.value', 'vanessa@exemplo.com')
        .clear()
        .should('have.value', '')
        cy.get('#phone')
        .type('1234567890')
        .should('have.value', '1234567890')
        .clear()
        .should('have.value', '')

    })

    it.only('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() { 
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it.only('envia o formuário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()
    
        cy.get('.success').should('be.visible')
        
    })

    it.only ('seleciona um produto (YouTube) por seu texto', function() {
        cy.get('#product')
            .select('YouTube')
            .should('have.value','youtube')
    })

    it.only ('seleciona um produto (Mentoria) por seu valor (value)', function() {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })

    it.only ('seleciona um produto (Blog) por seu índice', function() {
        cy.get('#product')
        .select(1)
        .should('have.value', 'blog')
    })

    it.only ('marca o tipo de atendimento "Feedback"', function() {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    })

    it.only ('marca cada tipo de atendimento', function() {
        cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio) {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })

    it.only('marca ambos checkboxes, depois desmarca o último', function() { 
        cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
    })

    it.only('seleciona um arquivo da pasta fixtures', function() {
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        .should(function($input) {
            console.log($input)
                expect($input[0].files[0].name).to.equal('example.json')

        })
    })
    
    it.only('seleciona um arquivo simulando um drag-and-drop', function () {
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
        .should(function($input) {
            console.log($input)
                expect($input[0].files[0].name).to.equal('example.json')
                })
        })

        it.only('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {
            cy.fixture('example').as('sampFile')
            cy.get('input[type="file"]')
                .selectFile('@sampFile')
                })
        })

        it('acessa a página da política de privacidade removendo o target e então clicando no link' , function () {
            cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()

            cy.contains('Talking About Testing').should('be.visible')
        })
    