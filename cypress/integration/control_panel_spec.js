import {dictionary} from '../../src/dictionary'

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

  it(`After clicking on "${dictionary.addSketch}" button a new sketch should appear on the Sketch list`, () => {
    cy.clickButton(dictionary.addSketch)
    cy.get('[data-cy=list] ul')
      .children()
      .should('have.length', 1)
  })

  it('After attempting to add 11th sketch there should be an error message visible', () => {
    cy.multiClick(dictionary.addSketch, 11)
    cy.get('[data-cy=sketch-limit-message]')
      .should('exist')
  })

  it('After removing one sketch the error message should disappear', () => {
    cy.multiClick(dictionary.addSketch, 11)
    cy.get('[data-cy=sketch-limit-message]')
      .should('exist')
    cy.clickButton(dictionary.undoAddSketch)
    cy.get('[data-cy=sketch-limit-message]')
      .should('not.exist')
  })

  it(`After clicking "${dictionary.clearList}" button the sketch list sholud be empty`, () => {
    cy.clickButton(dictionary.clearList)
    cy.get('[data-cy=list] ul')
      .children()
      .should('not.exist')
  })

  it(`Clicking "${dictionary.toggleArchive}" should toggle between sketch list and archive`, () => {
    cy.clickButton(dictionary.toggleArchive)
    cy.get('[data-cy=list]')
      .should('not.exist')
    cy.get('[data-cy=archive]')
      .should('exist')
    cy.clickButton(dictionary.toggleArchive)
    cy.get('[data-cy=archive]')
      .should('not.exist')
    cy.get('[data-cy=list]')
      .should('exist')
  })
})