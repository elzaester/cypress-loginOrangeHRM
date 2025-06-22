import LoginPage from "../../support/pageObjects/loginPage";
import loginData from "../../fixtures/loginData.json";

const loginPage = new LoginPage();


describe('Login Test - OrangeHRM', () => {

  beforeEach(() => {
    loginPage.visit();
  });

  it('TC101 - Login dengan username dan password yang valid', () => {
   // cy.intercept('POST', '**/auth/login').as('loginRequest');
    loginPage.enterUsername(loginData.validUsername);
    loginPage.enterPassword(loginData.validPassword);
    loginPage.clickLogin();
    cy.url().should('include', '/dashboard');
    //cy.wait('@loginRequest', {timeout: 15000}).its('response.statusCode').should('eq', 200);
    loginPage.getDashboardTitle().should('contain', 'Dashboard');
  });

  it('TC102 - Login dengan username yang invalid', () => {
    loginPage.enterUsername(loginData.invalidUsername);
    loginPage.enterPassword(loginData.validPassword);
    loginPage.clickLogin();
    loginPage.getErrorAlert().should('contain', 'Invalid credentials');
    //cek apakah masih tetap di halaman login
    cy.url().should('include', '/auth/login'); 
  });

  it('TC103 - Login dengan password yang invalid', () => {
    loginPage.enterUsername(loginData.validUsername);
    loginPage.enterPassword(loginData.invalidPassword);
  
    loginPage.clickLogin();
    loginPage.getErrorAlert().should('contain', 'Invalid credentials');
    cy.url().should('include', '/auth/login');
  });

  it('TC104 - Login dengan username dan password yang invalid', () => {
    loginPage.enterUsername(loginData.invalidUsername);
    loginPage.enterPassword(loginData.invalidPassword);
    loginPage.clickLogin();
    loginPage.getErrorAlert().should('contain', 'Invalid credentials');
    cy.url().should('include', '/auth/login');
  });

  it('TC105 - Login dengan username kosong', () => {
    // Kosongkan username
    loginPage.enterPassword(loginData.validPassword);
    loginPage.clickLogin();

    // Username field error muncul
    loginPage.getFieldErrorMessage().should('contain', 'Required');
  });

  it('TC106 - Login dengan password kosong', () => {
    loginPage.enterUsername(loginData.validUsername);
    // Kosongkan password
    loginPage.clickLogin();

    // Password field error muncul
    loginPage.getFieldErrorMessage().should('contain', 'Required');
  });

});
