describe('Control Panel', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  
  it('After viewing the app there is a Control Panel with 4 regular buttons and one special button', () => {
    cy.get('.buttonsSection_container__2ugg-')
    cy.get('.button_button__2De7A')
      .should('have.length', 4)
    cy.get('.button_buttonCritical__1Uqxa')
      .should('have.length', 1)
  })

  function clickButton(text) {
    cy.contains(`${text}`)
      .click()
  }

  it('After clicking on "Add sketch" button a new sketch should appear on the Sketch list', () => {
    clickButton('Add Sketch')
    cy.get('.list_container__3I0dz ul')
      .children()
      .should('have.length', 1)
  })

  function reachSketchLimit() {
    for (let i = 0; i <= 10; i++) {
      clickButton('Add Sketch')
    }
  }

  it('After attempting to add 11th sketch there should be an error message visible', () => {
    reachSketchLimit()
    cy.get('.list_limitMessage__2bdA1').should('exist')
  })

  it('After removing one sketch the error message should disappear', () => {
    reachSketchLimit()
    cy.get('.list_limitMessage__2bdA1').should('exist')
    clickButton('Undo Add Sketch')
    cy.get('.list_limitMessage__2bdA1').should('not.exist')
  })

  it('After clicking "Clear list" button the sketch list sholud be empty', () => {
    clickButton('Clear List')
    cy.get('.list_container__3I0dz ul')
      .children()
      .should('not.exist')
  })

  it('Clicking "Toggle Archive" should toggle between sketch list and archive', () => {
    clickButton('Toggle Archive')
    cy.get('.list_container__3I0dz')
      .should('not.exist')
    cy.get('.archive_container__2mTwC')
      .should('exist')
    clickButton('Toggle Archive')  
    cy.get('.archive_container__2mTwC')
      .should('not.exist')
    cy.get('.list_container__3I0dz')
      .should('exist')
  })
})