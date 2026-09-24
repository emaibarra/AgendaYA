describe('AgendaYA - M04 Booking Público', () => {
  it('muestra un error cuando se intenta confirmar una reserva sin datos personales', () => {
    // Preparación: se selecciona un servicio, un día habilitado y un horario disponible.
    cy.visit('/booking');
    cy.get('[data-cy="service-option"]').first().click();
    cy.get('[data-cy="dia-calendario"]').not('[disabled]').eq(1).click();
    cy.get('[data-cy="time-slot"]').not('[disabled]').first().click();

    // Acción: se intenta confirmar el formulario sin nombre ni correo electrónico.
    cy.get('[data-cy="submit-booking"]').click();

    // Verificación: se informa el error y no se muestra la confirmación de reserva.
    cy.get('[data-cy="error-formulario-reserva"]')
      .should('be.visible')
      .and('contain', 'Ingresá tu nombre y un email válido.');
    cy.get('[data-cy="booking-confirmation"]').should('not.be.visible');
  });
});
