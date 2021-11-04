/// <reference types="cypress" />

const CategoryList ={"categories":[{"id":1,"name":"camera" },{"id": 2, "name":"apple"}],
                                    }

const CatalogList = { "products": [{ "id": 1, "name": "Camera", "catalogNumber": "Plank 3", "description": "Test Desc", "RequiresApproval": false, "status": 0, "image": {"strings":["ew","we"]}, "imageIndex": 1, "StartDate": "1/1/2020", "Category": CategoryList[0]},
                    { "id": 2, "name": "Camera", "catalogNumber": "Plank 3", "description": "Test Desc", "RequiresApproval": false, "status": 0, "image": {"strings":["ew","we"]}, "imageIndex": 1, "StartDate": "1/1/2020", "category": CategoryList[0]},
                    { "id": 2, "name": "Apple", "catalogNumber": "Plank 3", "description": "Test Desc", "RequiresApproval": false, "status": 0, "image": {"strings":["ew","we"]}, "imageIndex": 1, "StartDate": "1/1/2020", "category": CategoryList[1]}], "currentPage": 0, "totalProductCount": 3};

describe('Catalog Test', () => {

  it ('Should filter by Category', () =>{
      cy.intercept('GET', '/api/product/catalogentries/0/5', CatalogList);
      cy.visit('http://localhost:4200/catalog');

      cy.get('mat-select[name=Filter]').select('camera').should('have.value','camera');
      //cy.get('mat-option').contains("Camera").click();

      cy.get('*ngFor=let catalogItem of catalogItemsWithCategory|MyFilterPipe:filter')
      .each((item, index) =>{
        cy.wrap(item).should('contain.text', "camera")
      })
  });

})

                    // describe('Add product menu tests', () => {
//     it('Should show initial page setup in English', () => {
//         cy.intercept('GET', '/api/product/catalogEntries/0/5', { fixture: 'catalog-products-page.json' }).as('getCatalogEntries');

//         cy.visit('http://localhost:4200/catalog')

//         cy.changeIsMenuOpened(true);
//         cy.changeLanguage('en');

//         cy.get(".mat-card-title[name=cart-title]").contains("Camera")

//         cy.get("h2[name=item-name]").contains('Nikon Z50');
//         cy.get("p[name=datepicker-not-available]").should("not.exist")
//         cy.get("app-product-datepicker[name=datepicker]").should("exist")
//         cy.get("app-product-datepicker[name=datepicker]").contains('Choose a date period')

//         cy.get("button[name=add-to-cart-button]").contains('+ Add to cart')
//     });

//     it('Should show initial page setup in Dutch', () => {
//         cy.intercept('GET', '/api/product/catalogEntries/0/5', { fixture: 'catalog-products-page.json' }).as('getCatalogEntries');

//         cy.visit('http://localhost:4200/catalog')

//         cy.changeIsMenuOpened(true);
//         cy.changeLanguage('nl');

//         cy.get(".mat-card-title[name=cart-title]").contains("Camera")

//         cy.get("h2[name=item-name]").contains('Nikon Z50');
//         cy.get("p[name=datepicker-not-available]").should("not.exist")
//         cy.get("app-product-datepicker[name=datepicker]").should("exist")
//         cy.get("app-product-datepicker[name=datepicker]").contains('Kies een periode')

//         cy.get("button[name=add-to-cart-button]").contains('+ In winkelwagen')
//     });

//     it('get 500 internal server error', () => {
//         cy.intercept('GET', '/api/product/catalogEntries/0/5', { statusCode: 500 }).as('getCatalogEntries');

//         cy.visit('http://localhost:4200/catalog')
//         cy.wait("@getCatalogEntries")

//         cy.get("snack-bar-container").contains('Something went wrong with receiving the products. Please try again later or contact an administrator.');
//     })

//     it('Add catalog item to cart NL', () => {
//         cy.intercept('GET', '/api/product/catalogEntries/0/5', { fixture: 'catalog-products-page.json' }).as('getCatalogEntries');

//         cy.visit('http://localhost:4200/catalog')

//         cy.changeIsMenuOpened(true);
//         cy.changeLanguage('nl');

//         cy.get("app-product-datepicker[name=datepicker]").should("exist")

//         cy.get('app-product-datepicker[name=datepicker]').within(() => {
//             cy.get("input[id=mat-date-range-input-0]").type('5/25/2021')
//         })
//         cy.get('app-product-datepicker[name=datepicker]').type('5/27/2021')
//         cy.get("button[name=add-to-cart-button]").click()

//         cy.get("snack-bar-container").contains('Nikon Z50 is toegevoegd aan winkelmandje');
//     });

//     it('Add catalog item to cart EN', () => {
//         cy.intercept('GET', '/api/product/catalogEntries/0/5', { fixture: 'catalog-products-page.json' }).as('getCatalogEntries');

//         cy.visit('http://localhost:4200/catalog')

//         cy.changeIsMenuOpened(true);
//         cy.changeLanguage('en');

//         cy.get("app-product-datepicker[name=datepicker]").should("exist")

//         cy.get('app-product-datepicker[name=datepicker]').within(() => {
//             cy.get("input[id=mat-date-range-input-0]").type('5/25/2021')
//         })
//         cy.get('app-product-datepicker[name=datepicker]').type('5/27/2021')
//         cy.get("button[name=add-to-cart-button]").click()

//         cy.get("snack-bar-container").contains('Nikon Z50 has been added to the shopping cart');
//     });

//     it('Add to cart without date NL', () => {
//         cy.intercept('GET', '/api/product/catalogEntries/0/5', { fixture: 'catalog-products-page.json' }).as('getCatalogEntries');

//         cy.visit('http://localhost:4200/catalog')

//         cy.changeIsMenuOpened(true);
//         cy.changeLanguage('nl');

//         cy.get("app-product-datepicker[name=datepicker]").should("exist")

//         cy.get("button[name=add-to-cart-button]").click()

//         cy.get("snack-bar-container").contains('Voeg een datum toe aan het product');
//     });

//     it('Add to cart without date EN', () => {
//         cy.intercept('GET', '/api/product/catalogEntries/0/5', { fixture: 'catalog-products-page.json' }).as('getCatalogEntries');

//         cy.visit('http://localhost:4200/catalog')

//         cy.changeIsMenuOpened(true);
//         cy.changeLanguage('en');

//         cy.get("app-product-datepicker[name=datepicker]").should("exist")

//         cy.get("button[name=add-to-cart-button]").click()

//         cy.get("snack-bar-container").contains('Add a date to the product');
//     });

// });
