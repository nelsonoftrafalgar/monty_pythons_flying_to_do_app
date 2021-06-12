import {dictionary} from '../../src/dictionary'

describe('Sort', () => {
  before(() => {
    cy.visit('/')
    cy.clickButton(dictionary.masterReset)
    cy.multiClick(dictionary.addSketch, 4)
    cy.get('[type="checkbox"]')
      .check()
    cy.get('[data-cy=rating-select]')
      .each(($el, idx) => {
        cy.wrap($el)
          .select((idx + 1).toString())
      })

    for (let i = 0; i < 4; i++) {
      cy.addSketchToArchive()
    }
    cy.clickButton(dictionary.toggleArchive)
  })


  it('Should sort by date ascending', () => {
    cy.sortBy(0, (a, b) => a - b, '[data-cy=archive-item-date]', 'date')
  })

  it('Should sort by date descending', () => {
    cy.sortBy(1, (a, b) => b - a, '[data-cy=archive-item-date]', 'date')
  })

  it('Should sort by rating ascending', () => {
    cy.sortBy(2, (a, b) => a - b, '[data-cy=archive-item-rating]', 'rating')
  })

  it('Should sort by rating descending', () => {
    cy.sortBy(3, (a, b) => b - a, '[data-cy=archive-item-rating]', 'rating')
  })
})