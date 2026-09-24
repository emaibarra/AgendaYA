describe('AgendaYA - M04 Booking Público', () => {
  beforeEach(() => {
    // Se configura el estado inicial visitando la URL local del frontend
    cy.visit('/booking');
  });

  it('Flujo principal: Permite seleccionar fecha, horario y confirmar reserva', () => {
    // Arrange: preparar el estado inicial[cite: 2]
    // Verificamos que el modal de elegir servicio esté abierto al inicio
    cy.contains('Elegí un servicio').should('be.visible');

    // Act: ejecutar la acción principal[cite: 2]
    // 1. Elegir el primer servicio disponible
    cy.get('[data-cy="service-option"]').first().click();

    // 2. Elegir un día habilitado en el calendario
    // Buscamos el contenedor por su título y filtramos los botones internos
    cy.contains('Elegí un día')
      .parent()
      .find('button')
      .not('[disabled]')
      .not('[aria-disabled="true"]')
      .eq(3) // Seleccionamos el cuarto día habilitado (índice 3)
      .first()
      .click();

    // 3. Elegir el primer horario disponible
    cy.get('[data-cy="time-slot"]').first().click();

    // 4. Llenar el formulario
    cy.get('[data-cy="booking-form"]').should('be.visible');
    cy.get('[data-cy="name-input"]').type('Carolina Pérez');
    cy.get('[data-cy="email-input"]').type('usuario@test.com');

    // 5. Confirmar reserva
    cy.get('[data-cy="submit-booking"]').click();

    // Assert: verificar el resultado esperado[cite: 2]
    cy.get('[data-cy="booking-confirmation"]').should('be.visible');
  });
});
