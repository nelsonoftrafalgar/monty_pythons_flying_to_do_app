describe('Sort', () => {
  before(() => {
    cy.visit('/')
    cy.clickButton('Master reset')
    cy.multiClick('Add Sketch', 4)
    cy.get('[type="checkbox"]')
      .check()
    cy.get('[type="number"]')
      .each(($el, idx) => {
        cy.wrap($el)
          .type(idx + 1)
      })
    
    for (let i = 0; i < 4; i++) {
      (function() {
        cy.addSketchToArchive()
        if (i < 3) {
          cy.wait(1000)
        }
      })()
    }
    cy.clickButton('Toggle Archive')
  })
  
  
  it('Should sort by date ascending', () => {
    cy.sortBy(0, (a, b) => a - b, '.archive_date__1wgHF', 'date')
  })

  it('Should sort by date descending', () => {
    cy.sortBy(1, (a, b) => b - a, '.archive_date__1wgHF', 'date')
  })

  it('Should sort by rating ascending', () => {
    cy.sortBy(2, (a, b) => a - b, '.archive_rating__38bQN', 'rating')
  })

  it('Should sort by rating descending', () => {
    cy.sortBy(3, (a, b) => b - a, '.archive_rating__38bQN', 'rating')
  })
})