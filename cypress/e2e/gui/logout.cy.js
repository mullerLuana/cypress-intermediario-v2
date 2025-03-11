describe('Logout', () => {
    beforeEach(() => { //executa antes de cada
        //aqui são pré condições necessárias para o teste
      cy.login() //preciso estar logado
      cy.visit('/') //preciso estar na pagina iniciar
    })
  
    it('successfully', () => {
      cy.logout()
  
      cy.url().should('be.equal', `${Cypress.config('baseUrl')}/users/sign_in`)
    })
  })
  