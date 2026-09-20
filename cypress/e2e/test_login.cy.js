/// <reference types="cypress" />


describe('AgendaYA - Modulo 1 Autenticacion', () => { //test e2e ema
  it('inicia sesion exitosamente, redirige al dashboard y cierra sesion', () => {
    //Visitar la pagina principal
    cy.visit('http://localhost:3000')

    //Ingresar credenciales validas
    // Apuntamos a los inputs por su tipo de dato 
    cy.get('input[type="email"]').type('ema@gmail.com');
    cy.get('input[type="password"]').type('123');

    //Hacer clic en el boton de ingreso
    cy.contains('button', 'Ingresar').click();

    //Verificar la redireccion 
    cy.url().should('include', '/dashboard');

    //Validar que la interfaz del dashboard haya cargado
    cy.contains('¡Bienvenido a AgendaYA!').should('be.visible');
    cy.contains('Has iniciado sesión correctamente').should('be.visible');

    //Cerrar sesion y verificar que el usuario regrese a la pantalla de login
    cy.contains('button', 'Cerrar sesión').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });
});