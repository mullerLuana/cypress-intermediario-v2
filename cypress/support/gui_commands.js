////comandos para interface gráfica do usuário
Cypress.Commands.add('login', (
    //buscando os dados de acesso do arquivo cypress.env.json e passando os dados para a função de login executar
    user = Cypress.env('user_name'),
    password = Cypress.env('user_password'),
    { cacheSession = true } = {},
  ) => {
    const login = () => {
      cy.visit('/users/sign_in')
  
      cy.get("[data-qa-selector='login_field']").type(user)
      cy.get("[data-qa-selector='password_field']").type(password, { log: false })
      cy.get("[data-qa-selector='sign_in_button']").click()
    }
   //função acessa a home, pegar o pathname e verificar se ele é igual ao registro salvo no cache, se for o mesmo não faz login de novo, senão for faz
    //Na linha acima onde ele verifica se a URL que ele está visitando é igual a user/sign_in ele reutiliza a sessão salva, mas se ele é diferente
    //ele vai entrar na função de criar a sessão refazendo um novo login
   const validate = () => {
        cy.visit('/')
        cy.location('pathname', { timeout: 1000 })
            .should('not.eq', '/users/sign_in')
 
    }
    //passando na função acima se o cache ainda deve ser passado ou não validando ainda a sessão
    const options = {
        cacheAcrossSpecs: true,
        validate,
    }
    //criando a sessão
    if (cacheSession) {
        cy.session(user, login, options)
    } else {
        login()
    }
  })

  Cypress.Commands.add('logout', () => {
    cy.get('.qa-user-avatar').click()
    cy.contains('Sign out').click()
  })
  
  Cypress.Commands.add('gui_createProject', project => {
    cy.visit('/projects/new')
  
    cy.get('#project_name').type(project.name)
    cy.get('#project_description').type(project.description)
    cy.get('.qa-initialize-with-readme-checkbox').check()
    cy.contains('Create project').click()
  })

  //Neste exemplo foi criado testes otimizados com o uso da funcionalidade para login

  Cypress.Commands.add('gui_createIssue', issue => {
    cy.visit(`/${Cypress.env('user_name')}/${issue.project.name}/issues/new`)
  
    cy.get('.qa-issuable-form-title').type(issue.title)
    cy.get('.qa-issuable-form-description').type(issue.description)
    cy.contains('Submit issue').click()
  })

  Cypress.Commands.add('gui_setLabelOnIssue', label => {
    cy.get('.qa-edit-link-labels').click()
    cy.contains(label.name).click()
    cy.get('body').click()
  })

  Cypress.Commands.add('gui_setMilestoneOnIssue', milestone => {
    cy.get('.block.milestone .edit-link').click()
    cy.contains(milestone.title).click()
  })