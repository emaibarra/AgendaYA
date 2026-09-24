/// <reference types="cypress" />

describe('AgendaYA - Modulo 1 Autenticacion', () => {
  it('inicia sesion exitosamente, redirige al dashboard y cierra sesion', () => {
    // Visitar la pagina principal
    cy.visit('/login');

    // Ingresar credenciales validas usando data-cy (Obligatorio para el TP)
    cy.get('[data-cy="login-email"]').type('ema@gmail.com');
    cy.get('[data-cy="login-password"]').type('123');

    // Hacer clic en el boton de ingreso
    cy.get('[data-cy="submit-login"]').click();

    // 1. PRIMERO validamos que la interfaz del dashboard haya cargado (le damos 10 segundos)
    cy.contains('¡Bienvenido a AgendaYA!', { timeout: 10000 }).should('be.visible');
    cy.contains('Has iniciado sesión correctamente').should('be.visible');

    // 2. LUEGO verificamos la redireccion (así evitamos el error de Timeout)
    cy.url().should('include', '/dashboard');

    // Cerrar sesion y verificar que el usuario regrese a la pantalla de inicio
    cy.get('[data-cy="logout-button"]').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });
});
