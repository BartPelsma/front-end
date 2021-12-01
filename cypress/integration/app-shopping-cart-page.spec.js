/// <reference types="cypress" />

describe('Shopping cart tests', () => {
    it('Should get product data', () => {
        cy.fixture('shopping-cart-storage-with-errors').then((content) => {
            window.localStorage.setItem('cart', JSON.stringify(content));
        });
        cy.intercept('GET', '/api/product/flat/1', { fixture: 'shopping-cart-product-flats-1' }).as('getProductFlat-1');
        cy.intercept('GET', '/api/product/flat/2', { fixture: 'shopping-cart-product-flats-2' }).as('getProductFlat-2');
        cy.intercept('GET', '/api/product/flat/3', { fixture: 'shopping-cart-product-flats-3' }).as('getProductFlat-3');

        cy.intercept('GET', '/api/reservation/1', []).as('getReservation-1');
        cy.intercept('GET', '/api/reservation/2', []).as('getReservation-2');
        cy.intercept('GET', '/api/reservation/3', []).as('getReservation-3');

        cy.visit('http://localhost:4200/cart');

        cy.wait(['@getProductFlat-3', '@getReservation-1', '@getReservation-2', '@getReservation-3']);
    });

    it('Should show products', () => {
        cy.fixture('shopping-cart-storage-with-errors').then((content) => {
            window.localStorage.setItem('cart', JSON.stringify(content));
        });
        cy.intercept('GET', '/api/product/flat/1', { fixture: 'shopping-cart-product-flats-1' }).as('getProductFlat-1');
        cy.intercept('GET', '/api/product/flat/2', { fixture: 'shopping-cart-product-flats-2' });
        cy.intercept('GET', '/api/product/flat/3', { fixture: 'shopping-cart-product-flats-3' });

        cy.intercept('GET', '/api/reservation/1', []);
        cy.intercept('GET', '/api/reservation/2', []);
        cy.intercept('GET', '/api/reservation/3', []);

        cy.visit('http://localhost:4200/cart');

        cy.wait('@getProductFlat-1');

        cy.get(".product-title").contains("Canon SOE R5");
    });

    it('Should not show unavailable products', () => {
        cy.fixture('shopping-cart-storage-with-errors').then((content) => {
            window.localStorage.setItem('cart', JSON.stringify(content));
        });
        cy.intercept('GET', '/api/product/flat/1', { fixture: 'shopping-cart-product-flats-1' });
        cy.intercept('GET', '/api/product/flat/2', { fixture: 'shopping-cart-product-flats-2' }).as('getProductFlat-2');
        cy.intercept('GET', '/api/product/flat/3', { fixture: 'shopping-cart-product-flats-3' });

        cy.intercept('GET', '/api/reservation/1', []);
        cy.intercept('GET', '/api/reservation/2', []);
        cy.intercept('GET', '/api/reservation/3', []);

        cy.visit('http://localhost:4200/cart');

        cy.wait('@getProductFlat-2');

        cy.get(".product-title").contains("Unavailable product").should('not.exist');
    });

    it('Should disable reserve button on error', () => {
        cy.fixture('shopping-cart-storage-with-errors').then((content) => {
            window.localStorage.setItem('cart', JSON.stringify(content));
        });
        cy.intercept('GET', '/api/product/flat/1', { fixture: 'shopping-cart-product-flats-1' });
        cy.intercept('GET', '/api/product/flat/2', { fixture: 'shopping-cart-product-flats-2' });
        cy.intercept('GET', '/api/product/flat/3', { fixture: 'shopping-cart-product-flats-3' }).as('getProductFlat-3');

        cy.intercept('GET', '/api/reservation/1', []);
        cy.intercept('GET', '/api/reservation/2', []);
        cy.intercept('GET', '/api/reservation/3', []);

        cy.visit('http://localhost:4200/cart');

        cy.wait('@getProductFlat-3');

        cy.get(".mat-card-content:last button").should('be.disabled');
    });

    it('Should enable reserve button without errors', () => {
        cy.clock();
        cy.fixture('shopping-cart-storage-all-ok').then((content) => {
            window.localStorage.setItem('cart', JSON.stringify(content));
        });
        cy.intercept('GET', '/api/product/flat/1', { fixture: 'shopping-cart-product-flats-1' }).as('getProductFlat-1');
        cy.intercept('GET', '/api/product/flat/3', { fixture: 'shopping-cart-product-flats-3' }).as('getProductFlat-3');

        cy.intercept('GET', '/api/reservation/1', []).as('getReservation-1');
        cy.intercept('GET', '/api/reservation/3', []).as('getReservation-3');

        cy.visit('http://localhost:4200/cart');

        cy.wait(['@getProductFlat-1', '@getProductFlat-3', '@getReservation-1', '@getReservation-3']);

        cy.get(".mat-card-content:last button").should('be.enabled');
    });

    // it('Should give feedback if product is unavailable in English', () => {
    //     cy.fixture('shopping-cart-storage-with-errors').then((content) => {
    //         window.localStorage.setItem('cart', JSON.stringify(content));
    //     });

    //     cy.intercept('GET', '/api/product/flat/1', { fixture: 'shopping-cart-product-flats-1' });
    //     cy.intercept('GET', '/api/product/flat/2', { fixture: 'shopping-cart-product-flats-2' }).as('getProductFlat-2');
    //     cy.intercept('GET', '/api/product/flat/3', { fixture: 'shopping-cart-product-flats-3' });

    //     cy.intercept('GET', '/api/reservation/1', []);
    //     cy.intercept('GET', '/api/reservation/2', []);
    //     cy.intercept('GET', '/api/reservation/3', []);

    //     cy.visit('http://localhost:4200/cart');

    //     cy.wait('@getProductFlat-2');
    //     cy.changeLanguage('en');


    //     cy.get(".mat-simple-snackbar").contains('One or more products have been removed from your shoppingcart because they are unavailable').should('exist');
    // });

    it('Should give feedback if product is unavailable in Dutch', () => {
        cy.fixture('shopping-cart-storage-with-errors').then((content) => {
            window.localStorage.setItem('cart', JSON.stringify(content));
        });

        // Languages needs to be changed before cart page is loaded
        // as the snackbar is triggered during page load
        cy.visit('http://localhost:4200/');
        cy.changeLanguage('nl');

        cy.intercept('GET', '/api/product/flat/1', { fixture: 'shopping-cart-product-flats-1' });
        cy.intercept('GET', '/api/product/flat/2', { fixture: 'shopping-cart-product-flats-2' }).as('getProductFlat-2');
        cy.intercept('GET', '/api/product/flat/3', { fixture: 'shopping-cart-product-flats-3' });

        cy.intercept('GET', '/api/reservation/1', []);
        cy.intercept('GET', '/api/reservation/2', []);
        cy.intercept('GET', '/api/reservation/3', []);

        cy.visit('http://localhost:4200/cart');

        cy.wait('@getProductFlat-2');

        cy.get(".mat-simple-snackbar").contains('Er zijn één of meerdere producten uit je winkelwagentje verwijderd omdat deze niet meer beschikbaar zijn.').should('exist');
    });

    it('Should give feedback if date is in weekend in English', () => {
        cy.fixture('shopping-cart-storage-with-errors').then((content) => {
            window.localStorage.setItem('cart', JSON.stringify(content));
        });

        cy.intercept('GET', '/api/product/flat/1', { fixture: 'shopping-cart-product-flats-1' });
        cy.intercept('GET', '/api/product/flat/2', { fixture: 'shopping-cart-product-flats-2' });
        cy.intercept('GET', '/api/product/flat/3', { fixture: 'shopping-cart-product-flats-3' }).as('getProductFlat-3');

        cy.intercept('GET', '/api/reservation/1', []);
        cy.intercept('GET', '/api/reservation/2', []);
        cy.intercept('GET', '/api/reservation/3', []);

        cy.visit('http://localhost:4200/cart');
        cy.changeLanguage('en');

        cy.wait('@getProductFlat-3');

        cy.get(".mat-chip").contains('Start date cannot be in the weekend').should('exist');
        cy.get(".mat-chip").contains('End date cannot be in the weekend').should('exist');
    });

    it('Should give feedback if date is on weekend in Dutch', () => {
        cy.fixture('shopping-cart-storage-with-errors').then((content) => {
            window.localStorage.setItem('cart', JSON.stringify(content));
        });

        cy.intercept('GET', '/api/product/flat/1', { fixture: 'shopping-cart-product-flats-1' });
        cy.intercept('GET', '/api/product/flat/2', { fixture: 'shopping-cart-product-flats-2' });
        cy.intercept('GET', '/api/product/flat/3', { fixture: 'shopping-cart-product-flats-3' }).as('getProductFlat-3');

        cy.intercept('GET', '/api/reservation/1', []);
        cy.intercept('GET', '/api/reservation/2', []);
        cy.intercept('GET', '/api/reservation/3', []);

        cy.visit('http://localhost:4200/cart');
        cy.changeLanguage('nl');

        cy.wait('@getProductFlat-3');

        cy.get(".mat-chip").contains('Startdatum kan niet in het weekend zijn').should('exist');
        cy.get(".mat-chip").contains('Einddatum kan niet in het weekend zijn').should('exist');
    });

    it('Should give feedback if date is in the past in English', () => {
        cy.clock(new Date(2030, 7, 1));
        cy.fixture('shopping-cart-storage-with-errors').then((content) => {
            window.localStorage.setItem('cart', JSON.stringify(content));
        });

        cy.intercept('GET', '/api/product/flat/1', { fixture: 'shopping-cart-product-flats-1' }).as('getProductFlat-1');
        cy.intercept('GET', '/api/product/flat/2', { fixture: 'shopping-cart-product-flats-2' });
        cy.intercept('GET', '/api/product/flat/3', { fixture: 'shopping-cart-product-flats-3' });

        cy.intercept('GET', '/api/reservation/1', []);
        cy.intercept('GET', '/api/reservation/2', []);
        cy.intercept('GET', '/api/reservation/3', []);

        cy.visit('http://localhost:4200/cart');
        cy.changeLanguage('en');

        cy.wait('@getProductFlat-1');

        cy.get(".mat-chip").contains('Start date cannot be in the past').should('exist');
    });


    it('Should give feedback if date is in the past in Dutch', () => {
        cy.clock(new Date(2030, 7, 1));
        cy.fixture('shopping-cart-storage-with-errors').then((content) => {
            window.localStorage.setItem('cart', JSON.stringify(content));
        });

        cy.intercept('GET', '/api/product/flat/1', { fixture: 'shopping-cart-product-flats-1' }).as('getProductFlat-1');
        cy.intercept('GET', '/api/product/flat/2', { fixture: 'shopping-cart-product-flats-2' });
        cy.intercept('GET', '/api/product/flat/3', { fixture: 'shopping-cart-product-flats-3' });

        cy.intercept('GET', '/api/reservation/1', []);
        cy.intercept('GET', '/api/reservation/2', []);
        cy.intercept('GET', '/api/reservation/3', []);

        cy.visit('http://localhost:4200/cart');
        cy.changeLanguage('nl');

        cy.wait('@getProductFlat-1');

        cy.get(".mat-chip").contains('Startdatum kan niet in het verleden zijn').should('exist');
    });

    it('Should give feedback if product is already reserved in English', () => {
        cy.clock();
        cy.fixture('shopping-cart-storage-all-ok').then((content) => {
            window.localStorage.setItem('cart', JSON.stringify(content));
        });

        cy.intercept('GET', '/api/product/flat/1', { fixture: 'shopping-cart-product-flats-1' });
        cy.intercept('GET', '/api/product/flat/3', { fixture: 'shopping-cart-product-flats-3' }).as('getProductFlat-3');

        cy.intercept('GET', '/api/reservation/1', []).as('getReservation-1');
        cy.intercept('GET', '/api/reservation/3', { fixture: 'shopping-cart-reservation-3' });

        cy.visit('http://localhost:4200/cart');
        cy.changeLanguage('en');

        cy.wait('@getProductFlat-3');

        cy.get(".mat-chip").contains('Product is already reserved on this date').should('exist');
    });

    it('Should give feedback if product is already reserved in Dutch', () => {
        cy.fixture('shopping-cart-storage-all-ok').then((content) => {
            window.localStorage.setItem('cart', JSON.stringify(content));
        });

        cy.intercept('GET', '/api/product/flat/1', { fixture: 'shopping-cart-product-flats-1' });
        cy.intercept('GET', '/api/product/flat/3', { fixture: 'shopping-cart-product-flats-3' }).as('getProductFlat-3');

        cy.intercept('GET', '/api/reservation/1', []).as('getReservation-1');
        cy.intercept('GET', '/api/reservation/3', { fixture: 'shopping-cart-reservation-3' });

        cy.visit('http://localhost:4200/cart');
        cy.changeLanguage('nl');

        cy.wait('@getProductFlat-3');

        cy.get(".mat-chip").contains('De geselecteerde datum is al gereserveerd').should('exist');
    });

    it('Remove product on button click', () => {
        cy.clock();
        cy.fixture('shopping-cart-storage-all-ok').then((content) => {
            window.localStorage.setItem('cart', JSON.stringify(content));
        });

        cy.intercept('GET', '/api/product/flat/1', { fixture: 'shopping-cart-product-flats-1' }).as('getProductFlat-1');
        cy.intercept('GET', '/api/product/flat/3', { fixture: 'shopping-cart-product-flats-3' }).as('getProductFlat-3');

        cy.intercept('GET', '/api/reservation/1', []);
        cy.intercept('GET', '/api/reservation/3', []);

        cy.visit('http://localhost:4200/cart');
        cy.changeLanguage('en');

        cy.wait(['@getProductFlat-1', '@getProductFlat-3']);

        cy.get(".product-list").should('have.length', 2);

        cy.get(".mat-card-content .delete-entry-button:last").click();

        cy.get(".product-list").should('have.length', 1);
    });

    it('Should enable reserve button when reserved product gets removed', () => {
        cy.clock();
        cy.fixture('shopping-cart-storage-all-ok').then((content) => {
            window.localStorage.setItem('cart', JSON.stringify(content));
        });

        cy.intercept('GET', '/api/product/flat/1', { fixture: 'shopping-cart-product-flats-1' });
        cy.intercept('GET', '/api/product/flat/3', { fixture: 'shopping-cart-product-flats-3' }).as('getProductFlat-3');

        cy.intercept('GET', '/api/reservation/1', []).as('getReservation-1');
        cy.intercept('GET', '/api/reservation/3', { fixture: 'shopping-cart-reservation-3' });

        cy.visit('http://localhost:4200/cart');

        cy.wait('@getProductFlat-3');
        cy.changeLanguage('nl');

        cy.get(".mat-chip").contains('De geselecteerde datum is al gereserveerd').should('exist');
        cy.get(".mat-card-content:last button").should('be.disabled');

        cy.get(".mat-card-content .delete-entry-button:last").click();

        cy.get(".mat-card-content:last button").should('be.enabled');
    });


    it('Should send call to reserve products', () => {
        cy.clock();
        cy.fixture('shopping-cart-storage-all-ok').then((content) => {
            window.localStorage.setItem('cart', JSON.stringify(content));
        });

        cy.intercept('GET', '/api/product/flat/1', { fixture: 'shopping-cart-product-flats-1' }).as('getProductFlat-1');
        cy.intercept('GET', '/api/product/flat/3', { fixture: 'shopping-cart-product-flats-3' }).as('getProductFlat-3');

        cy.intercept('GET', '/api/reservation/1', []);
        cy.intercept('GET', '/api/reservation/3', []);

        cy.visit('http://localhost:4200/cart');
        cy.changeLanguage('en');

        cy.wait(['@getProductFlat-1', '@getProductFlat-3']);

        cy.intercept('POST', '/api/products/reserve', {}).as('reservation');
        cy.get(".mat-card-content button:last").click();
        cy.wait('@reservation');

        cy.get(".mat-simple-snackbar").contains('Reservation has been successfully added!').should('exist');
    });
});


