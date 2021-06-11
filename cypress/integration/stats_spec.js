describe('Stats', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.clickButton('Master reset')
  })

  it('After viewing the app there is a Stats section with 4 paragraphs', () => {
    cy.get('[data-cy=stats-section]')
    cy.get('[data-cy=stat-item]')
      .should('have.length', 4)
  })

  it('Adding sketches should increment the value of the first and second paragraph', () => {
    cy.multiClick('Add Sketch', 6)
    cy.statItemExpectedValue('Total added sketches', 6)
    cy.statItemExpectedValue('Currently added sketches', 6)
  })

  it('After clicking the undo button the value of currently added sketches should decrement by 1', () => {
    cy.multiClick('Add Sketch', 6)
    cy.clickButton('Undo Add Sketch')
    cy.statItemExpectedValue('Currently added sketches', 5)
  })

  it('Clicking the undo button sholud not change the value of total added sketches', () => {
    cy.multiClick('Add Sketch', 6)
    cy.multiClick('Undo Add Sketch', 2)
    cy.statItemExpectedValue('Total added sketches', 6)
  })

  it('Clearing the list should not change the value of total added sketches and set the value of currently added sketches to 0', () => {
    cy.multiClick('Add Sketch', 6)
    cy.clickButton('Clear List')
    cy.statItemExpectedValue('Total added sketches', 6)
    cy.statItemExpectedValue('Currently added sketches', 0)
  })

  it('Clicking the watched checkbox on the sketch sholud toggle the value of watched sketches', () => {
    cy.multiClick('Add Sketch', 2)
    cy.get('[type="checkbox"]')
      .check()
    cy.statItemExpectedValue('Watched sketches', 2)
    cy.get('[type="checkbox"]')
      .uncheck()
    cy.statItemExpectedValue('Watched sketches', 0)
  })

  it('Adding a sketch to archive should increment the value of archived sketches and decrement the value of currently added sketches', () => {
    cy.multiClick('Add Sketch', 2)
    cy.get('[type="checkbox"]')
      .check()
    cy.multiClick('Add to Archive', 2)
    cy.statItemExpectedValue('Archived sketches', 2)
    cy.statItemExpectedValue('Currently added sketches', 0)
  })
})

