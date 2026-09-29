describe('AgendaYA - Modulo 1 Autenticacion', () => {
  it('inicia sesion exitosamente, redirige al dashboard y cierra sesion', () => {
    // Arrange: Visitar la pagina de login
    cy.visit('/login');

    // Ingresar credenciales validas usando data-cy (Obligatorio para el TP)
    cy.get('[data-cy="login-email"]').type('ema@gmail.com');
    cy.get('[data-cy="login-password"]').type('123');

    // Act: Hacer clic en el boton de ingreso
    cy.get('[data-cy="submit-login"]').click();

    // Assert: Cypress acepta automáticamente el alert() de LoginForm.tsx.
    // Priorizamos validar que el botón con data-cy esté visible.
    cy.get('[data-cy="logout-button"]').should('be.visible');
       // Verificamos la redireccion de forma segura porque la UI ya cargó
    cy.url().should('include', '/dashboard');
    cy.contains('Bienvenido a AgendaYA!').should('be.visible');

 

    // Cerrar sesion y verificar que el usuario regrese a la pantalla de inicio
    cy.get('[data-cy="logout-button"]').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });
});