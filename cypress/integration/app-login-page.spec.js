/// <reference types="cypress" />

describe('Login tests', () => {
    it('Should show login input fields in English', () => {

        cy.visit('http://localhost:4200/login');
        cy.changeLanguage('en');

        cy.get(".mat-form-field.ng-tns-c65-3").contains("Username").should("exist");
        cy.get(".mat-form-field.ng-tns-c65-4").contains("Password").should("exist");
        cy.get('.d-flex > .mat-focus-indicator').contains("Login").should("exist");

    });

    it('Should show login input fields in Dutch', () => {
        cy.visit('http://localhost:4200/login');
        cy.changeLanguage('nl');

        cy.get(".mat-form-field.ng-tns-c65-3").contains("Gebruikersnaam").should("exist");
        cy.get(".mat-form-field.ng-tns-c65-4").contains("Wachtwoord").should("exist");
        cy.get('.d-flex > .mat-focus-indicator').contains("Inloggen").should("exist");
    });
   

});