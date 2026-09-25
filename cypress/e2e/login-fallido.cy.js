describe('AgendaYA - M01 Autenticación', () => {
  beforeEach(() => {
    cy.visit('/'); 
  });

  it('Debe mostrar un error al ingresar credenciales inválidas', () => {
    // Arrange: Ingresar un correo y clave que generarán error
    cy.get('[data-cy="login-email"]').type('correo_falso@agendaya.com');
    cy.get('[data-cy="login-password"]').type('ClaveEquivocada');

    // Act: Enviar el formulario
    cy.get('[data-cy="submit-login"]').click();

    // Assert: Verificar que aparece el mensaje de error
    cy.get('[data-cy="login-error"]')
      .should('be.visible')
      .and('not.be.empty');
    
    // Verificamos que no se haya navegado al dashboard
    cy.url().should('not.include', '/dashboard');
  });
});
