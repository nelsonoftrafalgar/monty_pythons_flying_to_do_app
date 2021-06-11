describe('Control Panel', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('After viewing the app there is a Control Panel with 4 regular buttons and one special button', () => {
    cy.get('[data-cy=button-section]')
    cy.get('[data-cy=button]')
      .should('have.length', 4)
    cy.get('[data-cy=button-critical]')
      .should('have.length', 1)
  })

  it('After clicking on "Add sketch" button a new sketch should appear on the Sketch list', () => {
    cy.clickButton('Add Sketch')
    cy.get('[data-cy=list] ul')
      .children()
      .should('have.length', 1)
  })

  it('After attempting to add 11th sketch there should be an error message visible', () => {
    cy.multiClick('Add Sketch', 11)
    cy.get('[data-cy=sketch-limit-message]')
      .should('exist')
  })

  it('After removing one sketch the error message should disappear', () => {
    cy.multiClick('Add Sketch', 11)
    cy.get('[data-cy=sketch-limit-message]')
      .should('exist')
    cy.clickButton('Undo Add Sketch')
    cy.get('[data-cy=sketch-limit-message]')
      .should('not.exist')
  })

  it('After clicking "Clear list" button the sketch list sholud be empty', () => {
    cy.clickButton('Clear List')
    cy.get('[data-cy=list] ul')
      .children()
      .should('not.exist')
  })

  it('Clicking "Toggle Archive" should toggle between sketch list and archive', () => {
    cy.clickButton('Toggle Archive')
    cy.get('[data-cy=list]')
      .should('not.exist')
    cy.get('[data-cy=archive]')
      .should('exist')
    cy.clickButton('Toggle Archive')
    cy.get('[data-cy=archive]')
      .should('not.exist')
    cy.get('[data-cy=list]')
      .should('exist')
  })
})