Cypress.Commands.add('multiClick', (name, number) => {
  for (let i = 0; i < number; i++) {
    cy.contains(`${name}`)
      .click()
  }
})

Cypress.Commands.add('clickButton', (name) => {
  cy.contains(`${name}`)
    .click()
})

Cypress.Commands.add('statItemExpectedValue', (name, value) => {
  cy.contains(`${name}:`)
    .children()
    .should('contain', `${value}`)
})

Cypress.Commands.add('addSketchToArchive', () => {
  cy.get('.button_button__2De7A')
    .filter(':contains("Add to Archive")')
    .first()
    .click()
})

Cypress.Commands.add('sortBy', (input, sort, selector, type) => {
  const sortings = []
  cy.get('[type="radio"]')
    .eq(input)
    .click()
  
  cy.get(selector)
    .each($el => {
      const element = type === 'date' ? 
      +$el.context.innerText.split(' ')[2].split(":").reduce((acc, val) => acc + val) : +$el.context.innerText.replace('rating: ', '')
      sortings.push(element)
    })
    .then(() => {
      assert.deepEqual(sortings, [...sortings].sort(sort))
    })
})