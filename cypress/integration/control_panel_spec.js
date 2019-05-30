describe('Control Panel', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  
  it('After viewing the app there is a Control Panel with 4 regular buttons and one special button', () => {
    cy.get('.buttonsSection_container__2ugg-')
    cy.get('.button_button__2De7A').should('have.length', 4)
    cy.get('.button_buttonCritical__1Uqxa').should('have.length', 1)
  })
})