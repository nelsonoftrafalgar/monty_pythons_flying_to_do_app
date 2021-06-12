import {dictionary} from '../../src/dictionary'

describe('Sketch Item', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.clickButton(dictionary.masterReset)
    cy.clickButton(dictionary.addSketch)
  })

  it(`Toggling "${dictionary.watched}" input should toggle button between "${dictionary.remove}" and "${dictionary.addToArchive}"`, () => {
    cy.get('[type="checkbox"]')
      .check()
    cy.contains(dictionary.remove)
      .should('not.exist')
    cy.contains(dictionary.addToArchive)
      .should('exist')
    cy.get('[type="checkbox"]')
      .uncheck()
    cy.contains(dictionary.remove)
      .should('exist')
    cy.contains(dictionary.addToArchive)
      .should('not.exist')
  })

  it(`Selecting "${dictionary.rating}" should change the value`, () => {
    cy.get('[data-cy=rating-select]')
      .select('3')
      .should('have.value', '3')
      .select('4')
      .should('have.value', '4')
      .select('1')
      .should('have.value', '1')
  })

  it(`Clicking "${dictionary.addToArchive}" should move the sketch to archive list`, () => {
    cy.get('[data-cy=rating-select]')
      .select('3')
    cy.get('[type="checkbox"]')
      .check()
    cy.clickButton(dictionary.addToArchive)
    cy.get('[data-cy=list] ul')
      .children()
      .should('have.length', 0)
    cy.clickButton(dictionary.toggleArchive)
    cy.get('[data-cy=archive] ul')
      .children()
      .should('have.length', 1)
  })
})