/// <reference types="cypress" />

describe('Users overview tests', () => {
    it('Should show table headers in English', () => {
        cy.intercept('GET', '/api/user', { fixture: 'users-overview-page-1.json'}).as('getUsers');
    
        cy.visit('http://localhost:4200/users');
        cy.changeLanguage('en');

        cy.get(".mat-column-personName").contains("Name").should("exist");
        cy.get(".mat-column-number").contains("Student number").should("exist");
        cy.get(".mat-column-blocked").contains("Blocked until").should("exist");
        cy.get(".mat-column-role").contains("Role").should("exist");
        cy.get(".mat-column-blockOptions").contains("Options").should("exist");
    });

    it('Should show table headers in Dutch', () => {
        cy.intercept('GET', '/api/user', { fixture: 'users-overview-page-1.json'}).as('getUsers');
    
        cy.visit('http://localhost:4200/users');
        cy.changeLanguage('nl');

        cy.get(".mat-column-personName").contains("Naam").should("exist");
        cy.get(".mat-column-number").contains("Studentennummer").should("exist");
        cy.get(".mat-column-blocked").contains("Geblokkeerd tot").should("exist");
        cy.get(".mat-column-role").contains("Rol").should("exist");
        cy.get(".mat-column-blockOptions").contains("Opties").should("exist");
    });

    it('Should show paginator labels in English', () => {
        cy.intercept('GET', '/api/user', { fixture: 'users-overview-page-1.json'}).as('getUsers');
    
        cy.visit('http://localhost:4200/users');
        cy.changeLanguage('en');

        cy.get(".mat-paginator-page-size-label").contains("Items per page").should("exist");
        cy.get(".mat-paginator-range-label").contains("1 - 7 of 7").should("exist");
    });

    it('Should show paginator labels in Dutch', () => {
        cy.intercept('GET', '/api/user', { fixture: 'users-overview-page-1.json'}).as('getUsers');
    
        cy.visit('http://localhost:4200/users');
        cy.changeLanguage('nl');

        cy.get(".mat-paginator-page-size-label").contains("Artikelen per pagina").should("exist");
        cy.get(".mat-paginator-range-label").contains("1 - 7 van 7").should("exist");
    });

    it('Should show error in English', () => {
        cy.visit('http://localhost:4200');
        cy.changeLanguage('en');

        cy.intercept('GET', '/api/user', { statusCode: 500 }).as('getUsers');

        cy.visit('http://localhost:4200/users');
        cy.wait("@getUsers");

        cy.get("snack-bar-container").contains('Something went wrong, please try again later').should("exist");
    });

    it('Should show error in Dutch', () => {
        cy.visit('http://localhost:4200');
        cy.changeLanguage('nl');

        cy.intercept('GET', '/api/user', { statusCode: 500 }).as('getUsers');

        cy.visit('http://localhost:4200/users');
        cy.wait("@getUsers");

        cy.get("snack-bar-container").contains('Er is iets misgegaan, probeer later opnieuw').should("exist");
    });


    it('Should go to next page', () => {
        cy.intercept('GET', /\/api\/user\/page\/0\/[0-9]+$/, { fixture: 'users-overview-page-1.json'}).as('getUsers');

        cy.visit('http://localhost:4200/users');
        cy.changeLanguage('en');
        cy.wait("@getUsers");

        cy.intercept('GET', /\/api\/user\/page\/1\/[0-9]+$/, { fixture: 'users-overview-page-1.json'}).as('getUsersNextPage');
        cy.get('.mat-paginator-container mat-select').click().get('mat-option').contains(5).click();
        cy.get(".mat-paginator-navigation-next").click();

        cy.wait("@getUsersNextPage");
    });

    it('Should change page size', () => {
        cy.intercept('GET', /\/api\/user\/page\/0\/[0-9]+$/, { fixture: 'users-overview-page-1.json'}).as('getUsers');

        cy.visit('http://localhost:4200/users');
        cy.changeLanguage('en');
        cy.wait("@getUsers");

        cy.intercept('GET', '/api/user/page/0/100', { fixture: 'users-overview-page-1.json'}).as('getUsersNextPage');

        cy.get('.mat-paginator-container mat-select').click().get('mat-option').contains(100).click();

        cy.wait("@getUsers");
    });

    it('Should have 5 users', () => {
        cy.intercept('GET', /\/api\/user\/page\/0\/[0-9]+$/, { fixture: 'users-overview-page-1.json'}).as('getUsers');

        cy.visit('http://localhost:4200/users');
        cy.changeLanguage('en');
        cy.wait("@getUsers");

        cy.get('.mat-table').find('.mat-row').should('have.length', 5);
    });

    it('Should change user amount on page change', () => {
        cy.intercept('GET', /\/api\/user\/page\/0\/[0-9]+$/, { fixture: 'users-overview-page-1.json'}).as('getUsers');

        cy.visit('http://localhost:4200/users');
        cy.changeLanguage('en');
        cy.wait("@getUsers");

        cy.intercept('GET', /\/api\/user\/page\/1\/[0-9]+$/, { fixture: 'users-overview-page-2.json'}).as('getUsersNextPage');
        cy.get('.mat-paginator-container mat-select').click().get('mat-option').contains(5).click();
        cy.get(".mat-paginator-navigation-next").click();

        cy.wait("@getUsersNextPage");

        cy.get('.mat-table').find('.mat-row').should('have.length', 2);
    });

    it('Should show role labels in English', () => {
        cy.intercept('GET', /\/api\/user\/page\/0\/[0-9]+$/, { fixture: 'users-overview-page-1.json'}).as('getUsers');

        cy.visit('http://localhost:4200/users');
        cy.changeLanguage('en');
        cy.wait("@getUsers");

        cy.get('.mat-table').find('.cdk-column-role:contains("User")').should('have.length', 2);
        cy.get('.mat-table').find('.cdk-column-role:contains("Employee")').should('have.length', 2);
        cy.get('.mat-table').find('.cdk-column-role:contains("Admin")').should('have.length', 1);
    });

    it('Should show role labels in Dutch', () => {
        cy.intercept('GET', /\/api\/user\/page\/0\/[0-9]+$/, { fixture: 'users-overview-page-1.json'}).as('getUsers');

        cy.visit('http://localhost:4200/users');
        cy.changeLanguage('nl');
        cy.wait("@getUsers");

        cy.get('.mat-table').find('.cdk-column-role:contains("Gebruiker")').should('have.length', 2);
        cy.get('.mat-table').find('.cdk-column-role:contains("Medewerker")').should('have.length', 2);
        cy.get('.mat-table').find('.cdk-column-role:contains("Admin")').should('have.length', 1);
    });

    it('Should show button text in English', () => {
        cy.intercept('GET', /\/api\/user\/page\/0\/[0-9]+$/, { fixture: 'users-overview-page-1.json'}).as('getUsers');

        cy.visit('http://localhost:4200/users');
        cy.changeLanguage('en');
        cy.wait("@getUsers");

        cy.get('.mat-table').find('.mat-column-blockOptions').find('button:contains("Block user")').should('have.length', 2);
        cy.get('.mat-table').find('.mat-column-blockOptions').find('button:contains("Unblock user")').should('have.length', 2);
    });

    it('Should show button text in Dutch', () => {
        cy.intercept('GET', /\/api\/user\/page\/0\/[0-9]+$/, { fixture: 'users-overview-page-1.json'}).as('getUsers');

        cy.visit('http://localhost:4200/users');
        cy.changeLanguage('nl');
        cy.wait("@getUsers");

        cy.get('.mat-table').find('.mat-column-blockOptions').find('button:contains("Blokkeer")').should('have.length', 2);
        cy.get('.mat-table').find('.mat-column-blockOptions').find('button:contains("Deblokkeren")').should('have.length', 2);
    });

    it('Should give feedback if date is invalid in English', () => {
        cy.clock(new Date(2030, 7, 1));
        cy.intercept('GET', '/api/user', { fixture: 'users-overview-page-1.json'}).as('getUsers');
    
        cy.visit('http://localhost:4200/users');
        cy.changeLanguage('en');
        cy.wait("@getUsers");

        cy.get('.mat-table').find('.mat-column-blocked').find('input[ng-reflect-id="1"]').clear().type('11/18/2021');
        cy.get('.mat-table').find('.mat-column-blockOptions').find('button[id="1"]').click();
        cy.get("snack-bar-container").contains('Add a valid end date for the block').should('exist');
    });

    it('Should give feedback if date is invalid in Dutch', () => {
        cy.clock(new Date(2030, 7, 1));
        cy.intercept('GET', '/api/user', { fixture: 'users-overview-page-1.json'}).as('getUsers');
    
        cy.visit('http://localhost:4200/users');
        cy.changeLanguage('nl');
        cy.wait("@getUsers");

        cy.get('.mat-table').find('.mat-column-blocked').find('input[ng-reflect-id="1"]').clear().type('11/18/2021');
        cy.get('.mat-table').find('.mat-column-blockOptions').find('button[id="1"]').click();
        cy.get("snack-bar-container").contains('Voeg een toegestane einddatum toe voor het blokkeren').should('exist');
    });

    it('Should send call to perma-ban user in English', () => {
        cy.clock(new Date(2030, 7, 1));
        cy.intercept('GET', '/api/user', { fixture: 'users-overview-page-1.json'}).as('getUsers');
    
        cy.visit('http://localhost:4200/users');
        cy.changeLanguage('en');
        cy.wait("@getUsers");

        cy.intercept('POST', 'api/user/block', {}).as('block');

        cy.get('.mat-table').find('.mat-column-blockOptions').find('button[id="1"]').click();
        cy.wait("@block");

        cy.get("snack-bar-container").contains('Indefinite blocking successful').should('exist');
        cy.get('.mat-table').find('.mat-column-blocked:contains("No end date")').should('exist');
        cy.get('.mat-table').find('.mat-column-blockOptions').find('button[name="unblock-button"]').should('have.length', 3);
    });

    it('Should send call to perma-ban user in Dutch', () => {
        cy.clock(new Date(2030, 7, 1));
        cy.intercept('GET', '/api/user', { fixture: 'users-overview-page-1.json'}).as('getUsers');
    
        cy.visit('http://localhost:4200/users');
        cy.changeLanguage('nl');
        cy.wait("@getUsers");

        cy.intercept('POST', 'api/user/block', {}).as('block');

        cy.get('.mat-table').find('.mat-column-blockOptions').find('button[id="1"]').click();
        cy.wait("@block");

        cy.get("snack-bar-container").contains('Oneindig blokkeren gelukt').should('exist');
        cy.get('.mat-table').find('.mat-column-blocked:contains("Geen einddatum")').should('exist');
        cy.get('.mat-table').find('.mat-column-blockOptions').find('button[name="unblock-button"]').should('have.length', 3);
    });

    it('Should send call to ban user in English', () => {
        cy.clock(new Date(2030, 7, 1));
        cy.intercept('GET', '/api/user', { fixture: 'users-overview-page-1.json'}).as('getUsers');
    
        cy.visit('http://localhost:4200/users');
        cy.changeLanguage('en');
        cy.wait("@getUsers");

        cy.intercept('POST', 'api/user/block', {}).as('block');

        cy.get('.mat-table').find('.mat-column-blocked').find('input[ng-reflect-id="1"]').clear().type('11/18/2030');
        cy.get('.mat-table').find('.mat-column-blockOptions').find('button[id="1"]').click();
        cy.wait("@block");

        cy.get("snack-bar-container").contains('Blocking successful').should('exist');
        cy.get('.mat-table').find('.mat-column-blocked:contains("Nov 18, 2030")').should('exist');
        cy.get('.mat-table').find('.mat-column-blockOptions').find('button[name="unblock-button"]').should('have.length', 3);
    });

    it('Should send call to ban user in Dutch', () => {
        cy.clock(new Date(2030, 7, 1));
        cy.intercept('GET', '/api/user', { fixture: 'users-overview-page-1.json'}).as('getUsers');
    
        cy.visit('http://localhost:4200/users');
        cy.changeLanguage('nl');
        cy.wait("@getUsers");

        cy.intercept('POST', 'api/user/block', {}).as('block');

        cy.get('.mat-table').find('.mat-column-blocked').find('input[ng-reflect-id="1"]').clear().type('11/18/2030');
        cy.get('.mat-table').find('.mat-column-blockOptions').find('button[id="1"]').click();
        cy.wait("@block");

        cy.get("snack-bar-container").contains('Blokkeren gelukt').should('exist');
        cy.get('.mat-table').find('.mat-column-blocked:contains("Nov 18, 2030")').should('exist');
        cy.get('.mat-table').find('.mat-column-blockOptions').find('button[name="unblock-button"]').should('have.length', 3);
    });

    it('Should send call to unban user in English', () => {
        cy.intercept('GET', '/api/user', { fixture: 'users-overview-page-1.json'}).as('getUsers');
    
        cy.visit('http://localhost:4200/users');
        cy.changeLanguage('en');
        cy.wait("@getUsers");

        cy.intercept('POST', 'api/user/block', {}).as('block');

        cy.get('.mat-table').find('.mat-column-blockOptions').find('button[id="2"]').click();
        cy.wait("@block");

        cy.get("snack-bar-container").contains('Unblocking successful').should('exist');
        cy.get('.mat-table').find('.mat-column-blocked').find('input[ng-reflect-id="2"]').should('exist');
        cy.get('.mat-table').find('.mat-column-blockOptions').find('button[name="block-button"]').should('have.length', 3);
    });

    it('Should send call to unban user in Dutch', () => {
        cy.intercept('GET', '/api/user', { fixture: 'users-overview-page-1.json'}).as('getUsers');
    
        cy.visit('http://localhost:4200/users');
        cy.changeLanguage('nl');
        cy.wait("@getUsers");

        cy.intercept('POST', 'api/user/block', {}).as('block');

        cy.get('.mat-table').find('.mat-column-blockOptions').find('button[id="2"]').click();
        cy.wait("@block");

        cy.get("snack-bar-container").contains('Deblokkeren gelukt').should('exist');
        cy.get('.mat-table').find('.mat-column-blocked').find('input[ng-reflect-id="2"]').should('exist');
        cy.get('.mat-table').find('.mat-column-blockOptions').find('button[name="block-button"]').should('have.length', 3);
    });

    it('Should show correct information in the table', () => {
        cy.intercept('GET', /\/api\/user\/page\/0\/[0-9]+$/, { fixture: 'users-overview-page-1.json'}).as('getUsers');

        cy.visit('http://localhost:4200/users');
        cy.changeLanguage('en');
        cy.wait("@getUsers");

        cy.get('.mat-table').find('.mat-column-number').contains("100").should('exist');
        cy.get('.mat-table').find('.mat-column-number').contains("200").should('exist');
        cy.get('.mat-table').find('.mat-column-number:contains("-")').should('have.length', 3);

        cy.get('.mat-table').find('.mat-column-personName').contains("Fred").should('exist');
        cy.get('.mat-table').find('.mat-column-personName').contains("Wil").should('exist');
        cy.get('.mat-table').find('.mat-column-personName').contains("Miep").should('exist');
        cy.get('.mat-table').find('.mat-column-personName:contains("Piet")').should('have.length', 2);


        cy.get('.mat-table').find('.mat-column-blocked:contains("Jan 2, 2022")').should('have.length', 1);
        cy.get('.mat-table').find('.mat-column-blocked:contains("-")').should('have.length', 1);
        cy.get('.mat-table').find('.mat-column-blocked:contains("No end date")').should('have.length', 1);
        cy.get('.mat-table').find('.mat-column-blocked').find('mat-form-field').should('have.length', 2);

        cy.get('.mat-table').find('.mat-column-blockOptions').find('button:contains("Block user")').should('have.length', 2);
        cy.get('.mat-table').find('.mat-column-blockOptions').find('button:contains("Unblock user")').should('have.length', 2);
    });
});