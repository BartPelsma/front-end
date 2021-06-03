/// <reference types="cypress" />

describe('Inventory tests', () => {
    it('Should show table headers in English', () => {
        cy.intercept('GET', '/api/product', { fixture: 'inventory-products.json' }).as('getProducts');

        cy.visit('http://localhost:4200/products');
        cy.changeLanguage('en');

        cy.get(".mat-column-name").contains("Name").should("exist");
        cy.get(".mat-column-location").contains("Location").should("exist");
        cy.get(".mat-column-status").contains("Status").should("exist");
    });

    it('Should show table headers in Dutch', () => {
        cy.intercept('GET', '/api/product', { fixture: 'inventory-products.json' }).as('getProducts');

        cy.visit('http://localhost:4200/products');
        cy.changeLanguage('nl');

        cy.get(".mat-column-name").contains("Naam").should("exist");
        cy.get(".mat-column-location").contains("Locatie").should("exist");
        cy.get(".mat-column-status").contains("Status").should("exist");
    });

    it('Should show paginator labels in English', () => {
        cy.intercept('GET', '/api/product', { fixture: 'inventory-products.json' }).as('getProducts');

        cy.visit('http://localhost:4200/products');
        cy.changeLanguage('en');

        cy.get(".mat-paginator-page-size-label").contains("Items per page").should("exist");
        cy.get(".mat-paginator-range-label").contains(" 1 - 6 of 6 ").should("exist");
    });

    it('Should show paginator labels in Dutch', () => {
        cy.intercept('GET', '/api/product', { fixture: 'inventory-products.json' }).as('getProducts');

        cy.visit('http://localhost:4200/products');
        cy.changeLanguage('nl');

        cy.get(".mat-paginator-page-size-label").contains("Artikelen per pagina").should("exist");
        cy.get(".mat-paginator-range-label").contains(" 1 - 6 van 6 ").should("exist");
    });

    it('Should show status chips in English', () => {
        cy.intercept('GET', '/api/product', { fixture: 'inventory-products.json' }).as('getProducts');

        cy.visit('http://localhost:4200/products');
        cy.changeLanguage('en');
        cy.wait("@getProducts");

        cy.get(".available-status").contains("Available").should("exist");
        cy.get(".unavailable-status").contains("Unavailable").should("exist");
        cy.get(".archived-status").contains("Archived").should("exist");
    });

    it('Should show status chips in Dutch', () => {
        cy.intercept('GET', '/api/product', { fixture: 'inventory-products.json' }).as('getProducts');

        cy.visit('http://localhost:4200/products');
        cy.changeLanguage('nl');
        cy.wait("@getProducts");

        cy.get(".available-status").contains("Beschikbaar").should("exist");
        cy.get(".unavailable-status").contains("Niet beschikbaar").should("exist");
        cy.get(".archived-status").contains("Gearchiveerd").should("exist");
    });


    it('Should show error in English', () => {
        cy.visit('http://localhost:4200');
        cy.changeLanguage('en');

        cy.intercept('GET', '/api/product', { statusCode: 500 }).as('getProducts');

        cy.visit('http://localhost:4200/products');
        cy.wait("@getProducts");

        cy.get("snack-bar-container").contains('Something went wrong, please try again later').should("exist");
    });

    it('Should show error in Dutch', () => {
        cy.visit('http://localhost:4200');
        cy.changeLanguage('nl');
        cy.intercept('GET', '/api/product', { statusCode: 500 }).as('getProducts');

        cy.visit('http://localhost:4200/products');
        cy.wait("@getProducts");

        cy.get("snack-bar-container").contains('Er is iets misgegaan, probeer later opnieuw').should("exist");
    });

    it('Should go to next page', () => {
        cy.intercept('GET', /\/api\/product\/page\/0\/[0-9]+$/, { fixture: 'inventory-products.json' }).as('getProducts');

        cy.visit('http://localhost:4200/products');
        cy.changeLanguage('en');
        cy.wait("@getProducts");

        cy.intercept('GET', /\/api\/product\/page\/1\/[0-9]+$/, { fixture: 'inventory-products.json' }).as('getProductsNextPage');
        cy.get('.mat-paginator-container mat-select').click().get('mat-option').contains(5).click();
        cy.get(".mat-paginator-navigation-next").click();

        cy.wait("@getProductsNextPage");
    });


    it('Should change page size', () => {
        cy.intercept('GET', /\/api\/product\/page\/0\/[0-9]+$/, { fixture: 'inventory-products.json' }).as('getProducts');

        cy.visit('http://localhost:4200/products');
        cy.changeLanguage('en');
        cy.wait("@getProducts");

        cy.intercept('GET', '/api/product/page/0/100', { fixture: 'inventory-products.json' }).as('getProducts');

        cy.get('.mat-paginator-container mat-select').click().get('mat-option').contains(100).click();

        cy.wait("@getProducts");
    });

    it('Should have 5 products', () => {
        cy.intercept('GET', /\/api\/product\/page\/0\/[0-9]+$/, { fixture: 'inventory-products.json' }).as('getProducts');

        cy.visit('http://localhost:4200/products');
        cy.changeLanguage('en');
        cy.wait("@getProducts");

        cy.get('.mat-table').find('.mat-row').should('have.length', 5);
    });

    it('Should change product amount on page change', () => {
        cy.intercept('GET', /\/api\/product\/page\/0\/[0-9]+$/, { fixture: 'inventory-products.json' }).as('getProducts');

        cy.visit('http://localhost:4200/products');
        cy.changeLanguage('en');
        cy.wait("@getProducts");

        cy.intercept('GET', /\/api\/product\/page\/1\/[0-9]+$/, { fixture: 'inventory-products-page-2.json' }).as('getProductsNextPage');
        cy.get('.mat-paginator-container mat-select').click().get('mat-option').contains(5).click();
        cy.get(".mat-paginator-navigation-next").click();

        cy.wait("@getProductsNextPage");

        cy.get('.mat-table').find('.mat-row').should('have.length', 1);
    });

    it('Should menu button on archived product should be disabled', () => {
        cy.intercept('GET', /\/api\/product\/page\/0\/[0-9]+$/, { fixture: 'inventory-products.json' }).as('getProducts');

        cy.visit('http://localhost:4200/products');
        cy.changeLanguage('en');
        cy.wait("@getProducts");

        cy.get('.mat-row').find('.mat-button-disabled').should('have.length', 1);
    });

    it('Should show require approval labels in English', () => {
        cy.intercept('GET', /\/api\/product\/page\/0\/[0-9]+$/, { fixture: 'inventory-products.json' }).as('getProducts');

        cy.visit('http://localhost:4200/products');
        cy.changeLanguage('en');
        cy.wait("@getProducts");

        cy.get('.mat-table').find('.cdk-column-requiresApproval:contains("Yes")').should('have.length', 2);
        cy.get('.mat-table').find('.cdk-column-requiresApproval:contains("No")').should('have.length', 3);
    });

    it('Should show require approval labels in Dutch', () => {
        cy.intercept('GET', /\/api\/product\/page\/0\/[0-9]+$/, { fixture: 'inventory-products.json' }).as('getProducts');

        cy.visit('http://localhost:4200/products');
        cy.changeLanguage('nl');
        cy.wait("@getProducts");

        cy.get('.mat-table').find('.cdk-column-requiresApproval:contains("Ja")').should('have.length', 2);
        cy.get('.mat-table').find('.cdk-column-requiresApproval:contains("Nee")').should('have.length', 3);
    });

    it('Should show correct information in the table', () => {
        cy.intercept('GET', /\/api\/product\/page\/0\/[0-9]+$/, { fixture: 'inventory-products.json' }).as('getProducts');

        cy.visit('http://localhost:4200/products');
        cy.changeLanguage('nl');
        cy.wait("@getProducts");

        cy.get('.mat-table').find('.mat-column-name').contains('DJ set').should('exist');
        cy.get('.mat-table').find('.mat-column-name').contains('CANON R5').should('exist');
        cy.get('.mat-table').find('.mat-column-name').contains('CANON R4').should('exist');
        cy.get('.mat-table').find('.mat-column-name').contains('CANON R3').should('exist');
        cy.get('.mat-table').find('.mat-column-name').contains('CANON R2').should('exist');

        cy.get('.mat-table').find('.mat-column-location').contains('A3.3').should('exist');
        cy.get('.mat-table').find('.mat-column-location').contains('Die ene plank').should('exist');
        cy.get('.mat-table').find('.mat-column-location:contains("Balie")').should('have.length', 3);
    });
});