/// <reference types="cypress" />

describe('Reservation action page tests', () => {
    it('Should show headers in English', () => {
        cy.intercept('GET', '/api/reservation/similar/16', { fixture: 'reservation-flat-products/reservation-action-id-16.json' }).as('getAction');
        cy.intercept('GET', '/api/product/flat/21', { fixture: 'reservation-flat-products/reservation-flat-id-21.json' }).as('getFlatProduct1');
        cy.intercept('GET', '/api/product/flat/8', { fixture: 'reservation-flat-products/reservation-flat-id-8.json' }).as('getFlatProduct2');
        cy.intercept('GET', '/api/product/flat/9', { fixture: 'reservation-flat-products/reservation-flat-id-9.json' }).as('getFlatProduct3');

        cy.visit('http://localhost:4200/reservation/16');
        cy.changeLanguage('en');

        cy.wait("@getAction");
        cy.wait("@getFlatProduct1");
        cy.wait("@getFlatProduct2");
        cy.wait("@getFlatProduct3");

        cy.get('.mat-card-title').contains("Reservation actions").should('exist');
        cy.get('.mat-card-content').find('.item-box-description:contains("Location:")').should('have.length', 3);
        cy.get('.mat-card-content').find('.item-box-reservation:contains("Date:")').should('have.length', 3);
    });

    it('Should show headers in Dutch', () => {
        cy.intercept('GET', '/api/reservation/similar/16', { fixture: 'reservation-flat-products/reservation-action-id-16.json' }).as('getAction');
        cy.intercept('GET', '/api/product/flat/21', { fixture: 'reservation-flat-products/reservation-flat-id-21.json' }).as('getFlatProduct1');
        cy.intercept('GET', '/api/product/flat/8', { fixture: 'reservation-flat-products/reservation-flat-id-8.json' }).as('getFlatProduct2');
        cy.intercept('GET', '/api/product/flat/9', { fixture: 'reservation-flat-products/reservation-flat-id-9.json' }).as('getFlatProduct3');

        cy.visit('http://localhost:4200/reservation/16');
        cy.changeLanguage('nl');

        cy.wait("@getAction");
        cy.wait("@getFlatProduct1");
        cy.wait("@getFlatProduct2");
        cy.wait("@getFlatProduct3");

        cy.get('.mat-card-title').contains("Reservering acties").should('exist');
        cy.get('.mat-card-content').find('.item-box-description:contains("Locatie:")').should('have.length', 3);
        cy.get('.mat-card-content').find('.item-box-reservation:contains("Datum:")').should('have.length', 3);
    });

    it('Should show action labels in English', () => {
        cy.intercept('GET', '/api/reservation/similar/16', { fixture: 'reservation-flat-products/reservation-action-id-16.json' }).as('getAction');
        cy.intercept('GET', '/api/product/flat/21', { fixture: 'reservation-flat-products/reservation-flat-id-21.json' }).as('getFlatProduct1');
        cy.intercept('GET', '/api/product/flat/8', { fixture: 'reservation-flat-products/reservation-flat-id-8.json' }).as('getFlatProduct2');
        cy.intercept('GET', '/api/product/flat/9', { fixture: 'reservation-flat-products/reservation-flat-id-9.json' }).as('getFlatProduct3');

        cy.visit('http://localhost:4200/reservation/16');
        cy.changeLanguage('en');

        cy.wait("@getAction");
        cy.wait("@getFlatProduct1");
        cy.wait("@getFlatProduct2");
        cy.wait("@getFlatProduct3");

        cy.get(':nth-child(1) > .mat-card-actions > div.ng-star-inserted').find('button:contains("Out")').should('exist');
        cy.get(':nth-child(1) > .mat-card-actions > div.ng-star-inserted').find('button:contains("Cancel")').should('exist');
        cy.get(':nth-child(2) > .mat-card-actions > div.ng-star-inserted').find('button:contains("Return")').should('exist');
        cy.get(':nth-child(2) > .mat-card-actions > div.ng-star-inserted').contains("Picked up");
        cy.get(':nth-child(3) > .mat-card-actions > .ng-star-inserted > :nth-child(1)').contains("Picked up");
        cy.get(':nth-child(3) > .mat-card-actions > .ng-star-inserted > :nth-child(2)').contains("Returned");
        
    });

    it('Should show action labels in Dutch', () => {
        cy.intercept('GET', '/api/reservation/similar/16', { fixture: 'reservation-flat-products/reservation-action-id-16.json' }).as('getAction');
        cy.intercept('GET', '/api/product/flat/21', { fixture: 'reservation-flat-products/reservation-flat-id-21.json' }).as('getFlatProduct1');
        cy.intercept('GET', '/api/product/flat/8', { fixture: 'reservation-flat-products/reservation-flat-id-8.json' }).as('getFlatProduct2');
        cy.intercept('GET', '/api/product/flat/9', { fixture: 'reservation-flat-products/reservation-flat-id-9.json' }).as('getFlatProduct3');

        cy.visit('http://localhost:4200/reservation/16');
        cy.changeLanguage('nl');

        cy.wait("@getAction");
        cy.wait("@getFlatProduct1");
        cy.wait("@getFlatProduct2");
        cy.wait("@getFlatProduct3");

        cy.get(':nth-child(1) > .mat-card-actions > div.ng-star-inserted').find('button:contains("Uitgeven")').should('exist');
        cy.get(':nth-child(1) > .mat-card-actions > div.ng-star-inserted').find('button:contains("Annuleren")').should('exist');
        cy.get(':nth-child(2) > .mat-card-actions > div.ng-star-inserted').find('button:contains("Inleveren")').should('exist');
        cy.get(':nth-child(2) > .mat-card-actions > div.ng-star-inserted').contains("Opgehaald");
        cy.get(':nth-child(3) > .mat-card-actions > .ng-star-inserted > :nth-child(1)').contains("Opgehaald");
        cy.get(':nth-child(3) > .mat-card-actions > .ng-star-inserted > :nth-child(2)').contains("Teruggebracht");
        
    });

    it('Should out product in English', () => {
        cy.clock(new Date(2030, 7, 1));

        cy.intercept('GET', '/api/reservation/similar/16', { fixture: 'reservation-flat-products/reservation-action-id-16.json' }).as('getAction');
        cy.intercept('GET', '/api/product/flat/21', { fixture: 'reservation-flat-products/reservation-flat-id-21.json' }).as('getFlatProduct1');
        cy.intercept('GET', '/api/product/flat/8', { fixture: 'reservation-flat-products/reservation-flat-id-8.json' }).as('getFlatProduct2');
        cy.intercept('GET', '/api/product/flat/9', { fixture: 'reservation-flat-products/reservation-flat-id-9.json' }).as('getFlatProduct3');

        cy.visit('http://localhost:4200/reservation/16');
        cy.changeLanguage('en');

        cy.wait("@getAction");
        cy.wait("@getFlatProduct1");
        cy.wait("@getFlatProduct2");
        cy.wait("@getFlatProduct3");

        cy.intercept('POST', 'api/reservation').as("reservationAction");
        cy.get(':nth-child(1) > .mat-card-actions > div.ng-star-inserted > .green').click();

        cy.wait("@reservationAction");
        cy.get("snack-bar-container").contains('Reservation action success').should('exist');
        cy.get(':nth-child(1) > .mat-card-actions > div.ng-star-inserted').contains("Picked up Aug 1, 2030");
    
    });

    it('Should out product in Dutch', () => {
        cy.clock(new Date(2030, 7, 1));

        cy.intercept('GET', '/api/reservation/similar/16', { fixture: 'reservation-flat-products/reservation-action-id-16.json' }).as('getAction');
        cy.intercept('GET', '/api/product/flat/21', { fixture: 'reservation-flat-products/reservation-flat-id-21.json' }).as('getFlatProduct1');
        cy.intercept('GET', '/api/product/flat/8', { fixture: 'reservation-flat-products/reservation-flat-id-8.json' }).as('getFlatProduct2');
        cy.intercept('GET', '/api/product/flat/9', { fixture: 'reservation-flat-products/reservation-flat-id-9.json' }).as('getFlatProduct3');

        cy.visit('http://localhost:4200/reservation/16');
        cy.changeLanguage('nl');

        cy.wait("@getAction");
        cy.wait("@getFlatProduct1");
        cy.wait("@getFlatProduct2");
        cy.wait("@getFlatProduct3");

        cy.intercept('POST', 'api/reservation').as("reservationAction");
        cy.get(':nth-child(1) > .mat-card-actions > div.ng-star-inserted > .green').click();

        cy.wait("@reservationAction");
        cy.get("snack-bar-container").contains('Reservering actie gelukt').should('exist');
        cy.get(':nth-child(1) > .mat-card-actions > div.ng-star-inserted').contains("Opgehaald Aug 1, 2030");
    
    });

    it('Should return product in English', () => {
        cy.clock(new Date(2030, 7, 1));

        cy.intercept('GET', '/api/reservation/similar/16', { fixture: 'reservation-flat-products/reservation-action-id-16.json' }).as('getAction');
        cy.intercept('GET', '/api/product/flat/21', { fixture: 'reservation-flat-products/reservation-flat-id-21.json' }).as('getFlatProduct1');
        cy.intercept('GET', '/api/product/flat/8', { fixture: 'reservation-flat-products/reservation-flat-id-8.json' }).as('getFlatProduct2');
        cy.intercept('GET', '/api/product/flat/9', { fixture: 'reservation-flat-products/reservation-flat-id-9.json' }).as('getFlatProduct3');

        cy.visit('http://localhost:4200/reservation/16');
        cy.changeLanguage('en');

        cy.wait("@getAction");
        cy.wait("@getFlatProduct1");
        cy.wait("@getFlatProduct2");
        cy.wait("@getFlatProduct3");

        cy.intercept('POST', 'api/reservation').as("reservationAction");
        cy.get(':nth-child(2) > .mat-card-actions > div.ng-star-inserted > .mat-focus-indicator').click();

        cy.wait("@reservationAction");
        cy.get("snack-bar-container").contains('Reservation action success').should('exist');
        cy.get(':nth-child(2) > .mat-card-actions > div.ng-star-inserted').contains("Returned Aug 1, 2030");
    
    });

    it('Should return product in Dutch', () => {
        cy.clock(new Date(2030, 7, 1));

        cy.intercept('GET', '/api/reservation/similar/16', { fixture: 'reservation-flat-products/reservation-action-id-16.json' }).as('getAction');
        cy.intercept('GET', '/api/product/flat/21', { fixture: 'reservation-flat-products/reservation-flat-id-21.json' }).as('getFlatProduct1');
        cy.intercept('GET', '/api/product/flat/8', { fixture: 'reservation-flat-products/reservation-flat-id-8.json' }).as('getFlatProduct2');
        cy.intercept('GET', '/api/product/flat/9', { fixture: 'reservation-flat-products/reservation-flat-id-9.json' }).as('getFlatProduct3');

        cy.visit('http://localhost:4200/reservation/16');
        cy.changeLanguage('nl');

        cy.wait("@getAction");
        cy.wait("@getFlatProduct1");
        cy.wait("@getFlatProduct2");
        cy.wait("@getFlatProduct3");

        cy.intercept('POST', 'api/reservation').as("reservationAction");
        cy.get(':nth-child(2) > .mat-card-actions > div.ng-star-inserted > .mat-focus-indicator').click();

        cy.wait("@reservationAction");
        cy.get("snack-bar-container").contains('Reservering actie gelukt').should('exist');
        cy.get(':nth-child(2) > .mat-card-actions > div.ng-star-inserted').contains("Teruggebracht Aug 1, 2030");
    
    });
    
});

describe('Reservation overview page tests', () => {
    it('Should show headers in English', () => {
        cy.intercept('GET', '/api/reservation', { fixture: 'reservation-overview-page-1.json'});
        cy.intercept('GET', '/api/product', { fixture: 'reservation-flat-products/reservation-flat-id-7.json' });

        cy.visit('http://localhost:4200/reservations');
        cy.changeLanguage('en');

        cy.get('.mat-card-title').find('h1:contains("Reservations")').should('exist');
        cy.get('div[name=reservation-list]').find('div:contains("Start date")').should('exist');
        cy.get('div[name=reservation-list]').find('div:contains("Renter")').should('exist');
        cy.get('div[name=reservation-list]').find('div:contains("Products")').should('exist');
    });

    it('Should show headers in Dutch', () => {
        cy.intercept('GET', '/api/reservation', { fixture: 'reservation-overview-page-1.json'});
        cy.intercept('GET', '/api/product', { fixture: 'reservation-flat-products/reservation-flat-id-7.json' });

        cy.visit('http://localhost:4200/reservations');
        cy.changeLanguage('nl');

        cy.get('.mat-card-title').find('h1:contains("Reserveringen")').should('exist');
        cy.get('div[name=reservation-list]').find('div:contains("Startdatum")').should('exist');
        cy.get('div[name=reservation-list]').find('div:contains("Lener")').should('exist');
        cy.get('div[name=reservation-list]').find('div:contains("Producten")').should('exist');
    });

    it('Should show paginator labels in English', () => {
        cy.intercept('GET', '/api/reservation', { fixture: 'reservation-overview-page-1.json'});
        cy.intercept('GET', '/api/product', { fixture: 'reservation-flat-products/reservation-flat-id-7.json' });

        cy.visit('http://localhost:4200/reservations');
        cy.changeLanguage('en');

        cy.get(".mat-paginator-page-size-label").contains("Items per page").should("exist");
        cy.get(".mat-paginator-range-label").contains("1 - 7 of 7").should("exist");
    });

    it('Should show paginator labels in Dutch', () => {
        cy.intercept('GET', '/api/reservation', { fixture: 'reservation-overview-page-1.json'});
        cy.intercept('GET', '/api/product', { fixture: 'reservation-flat-products/reservation-flat-id-7.json' });

        cy.visit('http://localhost:4200/reservations');
        cy.changeLanguage('nl');

        cy.get(".mat-paginator-page-size-label").contains("Artikelen per pagina").should("exist");
        cy.get(".mat-paginator-range-label").contains("1 - 7 van 7").should("exist");
    });

    it('Should go to next page', () => {
        cy.intercept('GET', /\/api\/reservation\/similar\/0\/[0-9]+$/, { fixture: 'reservation-overview-page-1.json'}).as('getReservations');
        cy.intercept('GET', '/api/product', { fixture: 'reservation-flat-products/reservation-flat-id-7.json' });

        cy.visit('http://localhost:4200/reservations');
        cy.changeLanguage('en');
        cy.wait("@getReservations");

        cy.intercept('GET', /\/api\/reservation\/similar\/1\/[0-9]+$/, { fixture: 'reservation-overview-page-2.json'}).as('getReservationsNextPage');
        cy.get('.mat-paginator-container mat-select').click().get('mat-option').contains(5).click();
        cy.get(".mat-paginator-navigation-next").click();

        cy.wait("@getReservationsNextPage");
    });

    it('Should change page size', () => {
        cy.intercept('GET', /\/api\/reservation\/similar\/0\/[0-9]+$/, { fixture: 'reservation-overview-page-1.json'}).as('getReservations');
        cy.intercept('GET', '/api/product', { fixture: 'reservation-flat-products/reservation-flat-id-7.json' });

        cy.visit('http://localhost:4200/reservations');
        cy.changeLanguage('en');
        cy.wait("@getReservations");

        cy.intercept('GET', '/api/reservation/similar/0/100', { fixture: 'users-overview-page-2.json'}).as('getReservationsNextPage');

        cy.get('.mat-paginator-container mat-select').click().get('mat-option').contains(100).click();

        cy.wait("@getReservations");

    });

    it('Should show button text in English', () => {
        cy.intercept('GET', '/api/reservation', { fixture: 'reservation-overview-page-1.json'}).as('getReservations');;
        cy.intercept('GET', '/api/product', { fixture: 'reservation-flat-products/reservation-flat-id-7.json' });

        cy.visit('http://localhost:4200/reservations');
        cy.changeLanguage('en');
        cy.wait("@getReservations");

        cy.get('div[name=reservation-list]').find('button:contains("Open reservation")').should('have.length', 5);

    });

    it('Should show button text in Dutch', () => {
        cy.intercept('GET', '/api/reservation', { fixture: 'reservation-overview-page-1.json'}).as('getReservations');;
        cy.intercept('GET', '/api/product', { fixture: 'reservation-flat-products/reservation-flat-id-7.json' });
        cy.visit('http://localhost:4200/reservations');
        cy.changeLanguage('nl');
        cy.wait("@getReservations");

        cy.get('div[name=reservation-list]').find('button:contains("Reservering openen")').should('have.length', 5);

    });

    it('Should show loading if products not found in English', () => {
        cy.intercept('GET', '/api/reservation', { fixture: 'reservation-overview-page-1.json'}).as('getReservations');;
        cy.intercept('GET', '/api/product');

        cy.visit('http://localhost:4200/reservations');
        cy.changeLanguage('en');
        cy.wait("@getReservations");

        cy.get('div[name=reservation-list]').find('p:contains("Loading...")').should('have.length', 8);
    
    });

    it('Should show loading if products not found in Dutch', () => {
        cy.intercept('GET', '/api/reservation', { fixture: 'reservation-overview-page-1.json'}).as('getReservations');;
        cy.intercept('GET', '/api/product');

        cy.visit('http://localhost:4200/reservations');
        cy.changeLanguage('nl');
        cy.wait("@getReservations");

        cy.get('div[name=reservation-list]').find('p:contains("Laden...")').should('have.length', 8);
    
    });

    it('Should show correct data in the table', () => {
        cy.intercept('GET', '/api/reservation', { fixture: 'reservation-overview-page-1.json'}).as('getReservations');
        cy.intercept('GET', '/api/product/flat/7', { fixture: 'reservation-flat-products/reservation-flat-id-7.json' }).as('getFlatProduct1');
        cy.intercept('GET', '/api/product/flat/8', { fixture: 'reservation-flat-products/reservation-flat-id-8.json' }).as('getFlatProduct2');
        cy.intercept('GET', '/api/product/flat/9', { fixture: 'reservation-flat-products/reservation-flat-id-9.json' }).as('getFlatProduct3');
        cy.intercept('GET', '/api/product/flat/21', { fixture: 'reservation-flat-products/reservation-flat-id-21.json' }).as('getFlatProduct4');
    
        cy.visit('http://localhost:4200/reservations');
        cy.changeLanguage('en');

        cy.wait("@getReservations");
        cy.wait("@getFlatProduct1");
        cy.wait("@getFlatProduct2");
        cy.wait("@getFlatProduct3");
        cy.wait("@getFlatProduct4");
        
        cy.get('div[name=reservation-list]').find('p:contains("Test ID 7")').should('have.length', 3);
        cy.get('div[name=reservation-list]').find('p:contains("Test ID 8")').should('have.length', 2);
        cy.get('div[name=reservation-list]').find('p:contains("Test ID 9")').should('have.length', 1);
        cy.get('div[name=reservation-list]').find('p:contains("Test ID 21")').should('have.length', 2);

        cy.get('div[name=reservation-list]').find('div:contains("Siebren Kraak")').should('have.length', 5);

        cy.get('div[name=reservation-list]').find('div:contains("Oct 14, 2021")').should('exist');
        cy.get('div[name=reservation-list]').find('div:contains("Oct 29, 2021")').should('exist');
        cy.get('div[name=reservation-list]').find('div:contains("Nov 4, 2021")').should('exist');
        cy.get('div[name=reservation-list]').find('div:contains("Nov 24, 2021")').should('exist');
        cy.get('div[name=reservation-list]').find('div:contains("Dec 16, 2021")').should('exist');
    
    });

    it('Should open action page', () => {
        cy.intercept('GET', /\/api\/reservation\/similar\/0\/[0-9]+$/, { fixture: 'reservation-overview-page-1.json'}).as('getReservations');;
        cy.intercept('GET', '/api/product/flat/7', { fixture: 'reservation-flat-products/reservation-flat-id-7.json' }).as('getFlatProduct1');
        cy.intercept('GET', '/api/product/flat/8', { fixture: 'reservation-flat-products/reservation-flat-id-8.json' }).as('getFlatProduct2');
        cy.intercept('GET', '/api/product/flat/9', { fixture: 'reservation-flat-products/reservation-flat-id-9.json' }).as('getFlatProduct3');
        cy.intercept('GET', '/api/product/flat/21', { fixture: 'reservation-flat-products/reservation-flat-id-21.json' }).as('getFlatProduct4');
    
        cy.visit('http://localhost:4200/reservations');
        cy.changeLanguage('en');

        cy.wait("@getReservations");
        cy.wait("@getFlatProduct1");
        cy.wait("@getFlatProduct2");
        cy.wait("@getFlatProduct3");
        cy.wait("@getFlatProduct4");

        cy.intercept('GET', 'api/reservation/similar/8', { fixture: 'reservation-flat-products/reservation-action-id-8.json' }).as('getAction');

        cy.get(':nth-child(3) > .reservation-list > .reservation-actions > .mat-focus-indicator').click();

        cy.wait("@getAction");
    });


});

