describe('template spec', () => {
  it('passes', () => {
    cy.visit('localhost:3000')
    cy.get('[data-testid="Rick Sanchez"]').click()
    cy.get('[data-testid="Abadango Cluster Princess"]').click()
    cy.get('[data-testid="Summer Smith"]').should('be.disabled')
    cy.get('[data-testid="Ver capítulos en común"]').click()
    cy.get('[data-testid="sharedEpisodes"]').find('li').contains('27').should('exist')
  })
})