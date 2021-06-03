/// <reference types="cypress" />

describe('Side menu bar tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200')
  });

  it('Should show menu options in English', () => {
    cy.changeLanguage('en');
    cy.changeIsMenuOpened(true);
    cy.get('div[name=menu-options-list]').contains('Inventory');
    cy.get('div[name=menu-options-list]').contains('Add product');
    cy.get('div[name=menu-options-list]').contains('Shopping cart');
    cy.get('div[name=menu-options-list]').contains('Catalog');
    cy.get('div[name=menu-options-list]').contains('Reservation');
  });

  it('Should show hello message in Dutch', () => {
    cy.changeLanguage('nl');
    cy.changeIsMenuOpened(true);
    cy.get('div[name=menu-options-list]').contains('Inventaris');
    cy.get('div[name=menu-options-list]').contains('Product toevoegen');
    cy.get('div[name=menu-options-list]').contains('Winkelmandje');
    cy.get('div[name=menu-options-list]').contains('Catalogus');
    cy.get('div[name=menu-options-list]').contains('Reserveringen');
  });

  it('Should navigate to correct add product url', () => {
    cy.changeIsMenuOpened(true);
    cy.get('button[name=menu-option-add-product]').click();
    cy.url().should('include', 'products/add');
  });

  it('Should navigate to correct shopping cart url', () => {
    cy.changeIsMenuOpened(true);
    cy.get('button[name=menu-option-shopping-cart]').click();
    cy.url().should('include', 'cart');
  });

  it('Should navigate to correct inventory url', () => {
    cy.changeIsMenuOpened(true);
    cy.get('button[name=menu-option-inventory]').click();
    cy.url().should('include', 'products');
  });

  it('Should navigate to correct reservations url', () => {
    cy.changeIsMenuOpened(true);
    cy.get('button[name=menu-option-reservations]').click();
    cy.url().should('include', 'reservations');
  });
});
