import LoginPage from "../../support/pageObjects/loginPage";
import loginData from "../../fixtures/loginData.json";

const loginPage = new LoginPage();


describe('Login Test - OrangeHRM', () => {

  beforeEach(() => {
    loginPage.visit();
  });

  it('TC101 - Login dengan username dan password yang valid', () => {
    loginPage.enterUsername(loginData.validUsername);
    loginPage.enterPassword(loginData.validPassword);
    loginPage.clickLogin();

    loginPage.getDashboardTitle().should('contain', 'Dashboard');
  });

  it('TC102 - Login dengan username yang invalid', () => {
    loginPage.enterUsername(loginData.invalidUsername);
    loginPage.enterPassword(loginData.validPassword);
    loginPage.clickLogin();

    loginPage.getErrorAlert().should('contain', 'Invalid credentials');
  });

  it('TC103 - Login dengan password yang invalid', () => {
    loginPage.enterUsername(loginData.validUsername);
    loginPage.enterPassword(loginData.invalidPassword);
    loginPage.clickLogin();

    loginPage.getErrorAlert().should('contain', 'Invalid credentials');
  });

  it('TC104 - Login dengan username dan password yang invalid', () => {
    loginPage.enterUsername(loginData.invalidUsername);
    loginPage.enterPassword(loginData.invalidPassword);
    loginPage.clickLogin();

    loginPage.getErrorAlert().should('contain', 'Invalid credentials');
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
