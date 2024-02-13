describe('BLOG APP', function() {
  beforeEach(function() {
    cy.request('POST', 'testing/reset')
    cy.visit('http://localhost:5173')
  })

  it('login form is shown', function() {
    cy.get('form').contains('button', /log in/i)
  })

  describe('LOGIN', function() {
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

  describe('WHEN LOGGED IN', function() {
    const mainUser = {
      username: 'alekarhis',
      password: 'porkkana'
    }

    beforeEach(function() {
      cy.request('POST', 'users', mainUser)
      cy.request('POST', 'login', mainUser)
        .then(function(res) {
          localStorage.setItem('user', JSON.stringify(res.body))
          cy.visit('http://localhost:5173')
        })
    })

    it('can open create new form', function() {
      cy.get('button:contains("+ New")').cilck()
      cy.get('form').contains('label', /author/i)
    })

    it('can create new blog', function() {
      const testBlog = {
        title: 'Go to statement considered harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Consider…'
      }

      cy.get('form')
        .contains('label', /title:/i).next('input').as()
    })
  })
})