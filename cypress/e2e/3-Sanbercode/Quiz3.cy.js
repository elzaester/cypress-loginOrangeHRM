describe('Login Test OrangeHRM', () => {
      
  // TC101 - Positive Test
  it('TC101 - Login dengan username dan password yang valid', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    //Isi username valid
    cy.get('input[name="username"]').type('Admin');
    //Isi password valid
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    // Verifikasi berhasil login ke dashboard
    cy.url().should('include', '/dashboard');
    cy.get('.oxd-topbar-header-breadcrumb').should('contain', 'Dashboard');
  });

  // TC102 - Invalid Username
  it('TC102 - Login dengan username yang invalid', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    //Isi username invalid
    cy.get('input[name="username"]').type('ADMIN56');

    //Isi password valid
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    // Verifikasi tetap di halaman login dan ada pesan error
    cy.url().should('include', '/auth/login');
    cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials');
  });

  // TC103 - Invalid Password
  it('TC103 - Login dengan password yang invalid', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    
    //Isi username valid
    cy.get('input[name="username"]').type('Admin');

    //Isi username invalid
    cy.get('input[name="password"]').type('mimin99');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/auth/login');
    cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials');
  });

  // TC104 - Invalid Username & Password
  it('TC104 - Login dengan username dan password yang invalid', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    //Isi username invalid
    cy.get('input[name="username"]').type('ADMIN56');

    //Isi password invalid
    cy.get('input[name="password"]').type('mimin99');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/auth/login');
    cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials');
  });

  // TC105 - Username kosong
    it('TC105 - Login dengan mengosongkan username', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // Kosongkan username
    cy.get('input[name="username"]').should('exist');

    // Isi password saja
    cy.get('input[name="password"]').type('admin123');

    // Klik Login
    cy.get('button[type="submit"]').click();

    // Verifikasi muncul error "Required" di username
    cy.get('.oxd-input-field-error-message')
        .should('be.visible')
        .and('contain', 'Required');
    });

    // TC106 - Password kosong
    it('TC106 - Login dengan mengosongkan password', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // Isi username
    cy.get('input[name="username"]').type('Admin');

    // Kosongkan password
    cy.get('input[name="password"]').should('exist');

    // Klik Login
    cy.get('button[type="submit"]').click();

    // Verifikasi muncul error "Required" di password
    cy.get('.oxd-input-field-error-message')
        .should('be.visible')
        .and('contain', 'Required');
    });

});
