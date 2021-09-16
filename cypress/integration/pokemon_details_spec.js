// to start the test run npx cypress open into your terminal
describe('Pokemon Details page user flow', () => {
    beforeEach(() => {
        cy.onLoad()
    });
// 
    it('Should contain a Header (the Navigation bar) with a How to and a Image ', () => {
        cy.get('.header')
          .should('be.visible')
          .get('.header-image')
          .should('be.visible')
          .get('.how-to')
          .contains('How To')

        //   we need to add test for the animations
    });

    it('Should be able to click on How to and go to the How To page', () => {
        cy.get('a')
          .click()
          .get('.all-pokemon')
          .should('not.exist')
          .get('.help-page')
          .should('be.visible')
    });

    it('Should be able to click on the x button and get back to the home page', () => {
        cy.get('a')
          .click()
          .get('.x-icon')
          .click()
          .get('.help-page')
          .should('not.exist')
          .get('.all-pokemon')
          .should('be.visible')
    });

    it('Should have a search field', () => {
        cy.get('form')
          .should('be.visible')     
    });

    it('Should show an error message if the user adds the wrong name', () => {
          cy.get('input[type="search"]')
            .type('dogachu')
            .should('have.value',  'dogachu')
            .get('button')
            .click()
            .get('h2')
            .should('be.visible')
            .contains('try again')
    });

    it('Should be able to search Pokemon by Name', () => {
        cy.get('input[type="search"]')
          .type('mAnKey')
          .should('have.value', 'mAnKey')
          .get('button')
          .click()
          .get('.pokemon-details-page')
          .contains('56')
          .get('.pokemon-details-header')
          .contains('mankey')
          .get('img[src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/56.png"]')
          .should('be.visible')
    });

    it('Should show an error message if the user adds the wrong id number', () => {
        cy.get('input[type="search"]')
          .type('200')
          .should('have.value',  '200')
          .get('button')
          .click()
          .get('h2')
          .should('be.visible')
          .contains('try again')           
            
    });

    // Should we add another describe block for the same page? with another before each?

    it('Should be able to search Pokemon by Id Number', () => {
        cy.get('input[type="search"]')
          .type('98')
          .should('have.value',  '98')
          .get('button')
          .click()
          .get('.pokemon-details-header')
          .contains('krabby')
          .get('img[src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/98.png"]')
          .should('be.visible')
    });

    it('Should have a type', () => {
      cy.get('input[type="search"]')
        .type('98')
        .get('button')
        .click()
        .get('.types-header')
        .contains('Type')
        .get('.features')
        .contains('water')
    });

    it('Should have Abilities', () => {
      cy.get('input[type="search"]')
        .type('98')
        .get('button')
        .click()
        .get('.abilities-header')
        .contains('Abilities')
        .get('.features')
        .contains('shell armor')
        .should('be.visible')
    });

    it('Should have moves', () => {
      cy.get('input[type="search"]')
        .type('98')
        .get('button')
        .click()
        .get('.features')
        .contains('mimic')
        .should('be.visible')
        .get('.moves-header')
        .should('be.visible')
        .contains('Moves')
    });

})