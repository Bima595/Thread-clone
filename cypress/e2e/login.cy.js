describe("Login Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
    cy.visit("http://localhost:5173/Homepage");
  })

  it("should successfully login with valid credentials", () => {

    // should input form login
    cy.get('input[placeholder="Email"]').type("user@example.com");
    cy.get('input[placeholder="Password"]').type("password123");

    // should Submit form login
    cy.get('button[type="button"]').click();

    // Verifikasi navigasi ke halaman yang sesuai setelah login
    cy.url().should('include', 'http://localhost:5173/Homepage');

    // Verifikasi bahwa terdapat category buttons
    cy.get('.category-buttons').should('be.visible');
  });

  it("should show error message with invalid credentials", () => {

    // input form login with wrong kredensial 
    cy.get('input[placeholder="Email"]').type("user@example.com");
    cy.get('input[placeholder="Password"]').type("wrongpassword");

    // Submit form login
    cy.get('button[type="button"]').click();

    // Verifikasi error
    cy.contains('Login failed').should('be.visible');
  });
});
