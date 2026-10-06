describe('AgendaYA - Registro de usuario', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Muestra un error al intentar registrarse con un email ya registrado', () => {
    // Arrange: preparar los datos para intentar registrar un usuario existente
    cy.get('[data-cy="register-tab"]').click();
    // Act: llenar el formulario de registro con un email ya registrado
    cy.get('[data-cy="register-name"]').type('Otro Usuario');
    cy.get('[data-cy="login-email"]').type('bruno@test.com');
    cy.get('[data-cy="login-password"]').type('password123');
    cy.get('[data-cy="register-confirm-password"]').type('password123');

    // Act: intentar crear la cuenta
    cy.get('[data-cy="submit-login"]').click();

    // Assert: verificar que el sistema rechaza el registro
    cy.get('[data-cy="login-error"]')
      .should('be.visible')
      .and('contain', 'El correo ya está registrado');
  });
});
