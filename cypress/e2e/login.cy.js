/**
 * - Login spec
 *   - should display login page correctly
 *   - should successfully login with valid credentials
 *   - should show error message with invalid credentials
 *   - should show 'Sign out' button after successful login
 */
 
describe("Login Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });
 
  it("should successfully login with valid credentials", () => {
    // should input form login
    cy.get('input[placeholder="Email"]').type("Bima595@gmail.com");
    cy.get('input[placeholder="Password"]').type("1234567");
 
    // should Submit form login and it will make login successful
    cy.get('button').contains(/^Login$/).click();
  });
 
  it("should show error message with invalid credentials", () => {
    // input form login with wrong kredensial
    cy.get('input[placeholder="Email"]').type("user@example.com");
    cy.get('input[placeholder="Password"]').type("wrongpassword");
     // Submit form login
    cy.get('button[type="button"]').click();
     // Verifikasi error
    cy.contains("Login failed").should("be.visible");
  });
 
  it("should show 'Sign out' button after successful login", () => {
    // should input form login
    cy.get('input[placeholder="Email"]').type("Bima595@gmail.com");
    cy.get('input[placeholder="Password"]').type("1234567");
    // Verify that the user has successfully logged in  
    cy.get('button').contains(/^Login$/).click();
 
    // Check if the 'Sign out' button is visible
    cy.contains("Sign out").should("be.visible");
  });
});