describe('Crypto God Test', () => {
  it('visits the initial project page', () => {
    cy.visit('/')
    cy.contains('Crypto Market Cap & Pricing Data Provided By Nomics')
  })

  it('clicks Bitcoin', () => {
    cy.visit('/')
    cy.get(':nth-child(3) > [data-cy="crypto"] > .crypto', { timeout: 10000}).click();
    cy.get('.chart > .chartjs-render-monitor');
  })


})
