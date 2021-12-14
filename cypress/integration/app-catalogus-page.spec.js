 /// <reference types="cypress" />

 describe('Catalog page tests', () => {
     it('Should show initial page setup in English', () => {
         cy.intercept('GET', /\/api\/product\/catalogentries\/[0-9]\/[0-9]\/-\/-+$/ , { fixture: 'catalog-products-page.json' }).as('getCatalogItems');
         //cy.intercept('GET', /\/api\/product\/page\/[0-9]\/[0-9]+$/, { fixture: 'inventory-products.json' }).as('getProducts');

         cy.visit('http://localhost:4200/catalog')

         cy.changeIsMenuOpened(true);
         cy.changeLanguage('en');
            cy.wait("@getCatalogItems")

         cy.get(".mat-card-title[name=cart-title]").contains("Camera")

         cy.get("h2[name=item-name]").contains('Nikon Z50');
         cy.get("p[name=datepicker-not-available]").should("not.exist")
         cy.get("app-product-datepicker[name=datepicker]").should("exist")
         cy.get("app-product-datepicker[name=datepicker]").contains('Choose a date period')

         cy.get("button[name=add-to-cart-button]").contains('+ Add to cart')
     });

     it('Should show initial page setup in Dutch', () => {
        cy.intercept('GET', /\/api\/product\/catalogentries\/[0-9]\/[0-9]\/-\/-+$/ , { fixture: 'catalog-products-page.json' }).as('getCatalogItems');

         cy.visit('http://localhost:4200/catalog')

         cy.changeIsMenuOpened(true);
         cy.changeLanguage('nl');

         cy.get(".mat-card-title[name=cart-title]").contains("Camera")

         cy.get("h2[name=item-name]").contains('Nikon Z50');
         cy.get("p[name=datepicker-not-available]").should("not.exist")
         cy.get("app-product-datepicker[name=datepicker]").should("exist")
         cy.get("app-product-datepicker[name=datepicker]").contains('Kies een periode')

         cy.get("button[name=add-to-cart-button]").contains('+ In winkelwagen')


     });

     it('get 500 internal server error', () => {
         cy.intercept('GET', /\/api\/product\/catalogentries\/[0-9]\/[0-9]\/-\/-+$/ , { statusCode: 500 }).as('getCatalogEntries');

         cy.changeLanguage('nl');

         cy.visit('http://localhost:4200/catalog')

         cy.wait("@getCatalogEntries")

         cy.get("snack-bar-container").contains('Er is iets misgegaan met het ophalen van de producten. Probeer het later opnieuw of contacteer een administrator.');
     })

     it('Add catalog item to cart NL', () => {
         cy.clock(new Date(2020,5,4))
         cy.intercept('GET', /\/api\/product\/catalogentries\/[0-9]\/[0-9]\/-\/-+$/ , { fixture: 'catalog-products-page.json' }).as('getCatalogEntries');

         cy.visit('http://localhost:4200/catalog')

         cy.changeIsMenuOpened(true);
         cy.changeLanguage('nl');

         cy.get("app-product-datepicker[name=datepicker]").should("exist")

         cy.get('app-product-datepicker[name=datepicker]').within(() => {
             cy.get("input[id=mat-date-range-input-0]").type('5/24/2021')
         })
         cy.get('app-product-datepicker[name=datepicker]').type('5/28/2021')
         cy.get("button[name=add-to-cart-button]").click()

         cy.get("snack-bar-container").contains('Nikon Z50 is toegevoegd aan winkelmandje');
     });

     it('Add catalog item to cart EN', () => {
        cy.clock(new Date(2020,5,4))
         cy.intercept('GET', /\/api\/product\/catalogentries\/[0-9]\/[0-9]\/-\/-+$/ , { fixture: 'catalog-products-page.json' }).as('getCatalogEntries');

         cy.visit('http://localhost:4200/catalog')

         cy.changeIsMenuOpened(true);
         cy.changeLanguage('en');

         cy.get("app-product-datepicker[name=datepicker]").should("exist")

         cy.get('app-product-datepicker[name=datepicker]').within(() => {
             cy.get("input[id=mat-date-range-input-0]").type('5/24/2021')
         })
         cy.get('app-product-datepicker[name=datepicker]').type('5/28/2021')
         cy.get("button[name=add-to-cart-button]").click()

         cy.get("snack-bar-container").contains('Nikon Z50 has been added to the shopping cart');
     });

     it('Add to cart without date NL', () => {
         cy.intercept('GET', /\/api\/product\/catalogentries\/[0-9]\/[0-9]\/-\/-+$/ , { fixture: 'catalog-products-page.json' }).as('getCatalogEntries');

         cy.visit('http://localhost:4200/catalog')

         cy.changeIsMenuOpened(true);
         cy.changeLanguage('nl');

         cy.get("app-product-datepicker[name=datepicker]").should("exist")

         cy.get("button[name=add-to-cart-button]").click()

         cy.get("snack-bar-container").contains('Voeg een datum toe aan het product');
     });

     it('Add to cart without date EN', () => {
         cy.intercept('GET', /\/api\/product\/catalogentries\/[0-9]\/[0-9]\/-\/-+$/ , { fixture: 'catalog-products-page.json' }).as('getCatalogEntries');

         cy.visit('http://localhost:4200/catalog')

         cy.changeIsMenuOpened(true);
         cy.changeLanguage('en');

         cy.get("app-product-datepicker[name=datepicker]").should("exist")

         cy.get("button[name=add-to-cart-button]").click()

         cy.get("snack-bar-container").contains('Add a date to the product');
     });

     it('Should show correct information after searchfilter', () => {
        cy.intercept('GET', /\/api\/product\/catalogentries\/[0-9]\/[0-9]\/-\/-+$/, { fixture: 'catalog-products-page.json' }).as('getCatalogEntries');

        cy.visit('http://localhost:4200/catalog')
        cy.changeLanguage('nl');
        cy.wait("@getCatalogEntries");

        cy.intercept('GET', /\/api\/product\/catalogentries\/[0-9]\/[0-9]\/[A-Z]\/-+$/, { fixture: 'catalog-products-page2.json' }).as('getCatalogEntries2');
        cy.get('#mat-input-0').type('C')
        cy.wait("@getCatalogEntries2");

        cy.get('h2').contains('Cannon Z50');
    });
     it('Try to add the same product twice to cart should fail', () => {
        cy.intercept('GET', /\/api\/product\/catalogentries\/[0-9]\/[0-9]\/-\/-+$/ , { fixture: 'catalog-products-page.json' }).as('getCatalogEntries');

        cy.visit('http://localhost:4200/catalog')

        cy.changeIsMenuOpened(true);
        cy.changeLanguage('en');

        cy.get("app-product-datepicker[name=datepicker]").should("exist")

        cy.get('app-product-datepicker[name=datepicker]').within(() => {
            cy.get("input[id=mat-date-range-input-0]").type('5/24/2022')
        })
        cy.get('app-product-datepicker[name=datepicker]').type('5/28/2022')

        cy.get("button[name=add-to-cart-button]").click()
        cy.get("snack-bar-container").contains('Nikon Z50 has been added to the shopping cart');

        cy.get("button[name=add-to-cart-button]").click()
        cy.get("snack-bar-container").contains('Product is already in cart!');

    });

 });