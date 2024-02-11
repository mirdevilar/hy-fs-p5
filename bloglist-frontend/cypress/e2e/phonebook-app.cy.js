describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'testing/reset')
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.get('form').contains('button', /log in/i)
  })

  describe('Login', function() {
    const correctCredentials = {
      username: 'alekarhis',
      password: 'porkkana'
    }

    beforeEach(function() {
      cy.request('POST', 'users', correctCredentials)
    })

    it('correct credentials >> successful login', function() {
      const form = cy.get('form').contains('button', /log in/i)

      form.get('input[name="username"]')
        .type('alekarhis')
      form.get('input[type="password"]')
        .type('porkkana')
      form.get('button[type="submit"]')
        .click()

      form.should('not.exist')
      cy.contains(`Logged in as ${correctCredentials.username}`)
    })

    it('incorrect credentials >> fail login', function() {
      const form = cy.get('form').contains('button', /log in/i)

      form.get('input[name="username"]')
        .type('alekarhis')
      form.get('input[type="password"]')
        .type('orxata')
      form.get('button[type="submit"]')
        .click()

      form.should('exist')
      cy.contains('Wrong credentials!')
    })
  })
})