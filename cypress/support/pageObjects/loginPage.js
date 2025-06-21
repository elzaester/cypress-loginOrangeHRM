//page objects untuk Tugas 16 -> Login menggunakan POM (Page Objects Model)
import loginData from "../../fixtures/loginData.json";
class LoginPage {
  visit() {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  }

  enterUsername(username) {
    cy.get('input[name="username"]').clear().type(username);
  }

  enterPassword(password) {
    cy.get('input[name="password"]').clear().type(password);
  }

  clickLogin() {
    cy.get('button[type="submit"]').click();
  }

  getErrorAlert() {
    return cy.get('.oxd-alert-content-text');
  }

  getFieldErrorMessage() {
    return cy.get('.oxd-input-field-error-message');
  }

  getDashboardTitle() {
    return cy.get('.oxd-topbar-header-breadcrumb');
  }
}

export default LoginPage;
