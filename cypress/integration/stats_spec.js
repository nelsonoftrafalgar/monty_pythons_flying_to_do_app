import {dictionary} from '../../src/dictionary'

describe('Stats', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.clickButton(dictionary.masterReset)
  })

  it('After viewing the app there is a Stats section with 4 paragraphs', () => {
    cy.get('[data-cy=stats-section]')
    cy.get('[data-cy=stat-item]')
      .should('have.length', 4)
  })

  it('Adding sketches should increment the value of the first and second paragraph', () => {
    cy.multiClick(dictionary.addSketch, 6)
    cy.statItemExpectedValue(dictionary.totalAddedSketches, 6)
    cy.statItemExpectedValue(dictionary.currentlyAddedSketches, 6)
  })

  it('After clicking the undo button the value of currently added sketches should decrement by 1', () => {
    cy.multiClick(dictionary.addSketch, 6)
    cy.clickButton(dictionary.undoAddSketch)
    cy.statItemExpectedValue(dictionary.currentlyAddedSketches, 5)
  })

  it('Clicking the undo button sholud not change the value of total added sketches', () => {
    cy.multiClick(dictionary.addSketch, 6)
    cy.multiClick(dictionary.undoAddSketch, 2)
    cy.statItemExpectedValue(dictionary.totalAddedSketches, 6)
  })

  it('Clearing the list should not change the value of total added sketches and set the value of currently added sketches to 0', () => {
    cy.multiClick(dictionary.addSketch, 6)
    cy.clickButton(dictionary.clearList)
    cy.statItemExpectedValue(dictionary.totalAddedSketches, 6)
    cy.statItemExpectedValue(dictionary.currentlyAddedSketches, 0)
  })

  it('Clicking the watched checkbox on the sketch sholud toggle the value of watched sketches', () => {
    cy.multiClick(dictionary.addSketch, 2)
    cy.get('[type="checkbox"]')
      .check()
    cy.statItemExpectedValue(dictionary.watchesSketches, 2)
    cy.get('[type="checkbox"]')
      .uncheck()
    cy.statItemExpectedValue(dictionary.watchesSketches, 0)
  })

  it('Adding a sketch to archive should increment the value of archived sketches and decrement the value of currently added sketches', () => {
    cy.multiClick(dictionary.addSketch, 2)
    cy.get('[type="checkbox"]')
      .check()
    cy.multiClick(dictionary.addToArchive, 2)
    cy.statItemExpectedValue(dictionary.archivedSketches, 2)
    cy.statItemExpectedValue(dictionary.currentlyAddedSketches, 0)
  })
})

