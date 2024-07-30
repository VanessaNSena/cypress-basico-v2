Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Vanessa')
    cy.get('#lastName').type('Sena')
    cy.get('#email').type('vanessa@exemplo.com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()
})
it.only('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function () {
    cy.get('#privacy').should('have.attr', 'target', '_blank')
})
