import { confirmReservation } from '@/lib/reservation';

// Cuando el id no existe, el flujo debe fallar con un error explícito.
test('Id que no sea reconocido por la reserva', () => {
  expect(() => confirmReservation(99)).toThrow('Reserva inexistente');
});

// Si la reserva existe y todavía está pendiente, debe confirmarse.
test('Id correcto en la reserva', () => {
  const reservaConfirmada = confirmReservation(1);
  expect(reservaConfirmada.confirmed).toBe(true);
});

// Una reserva ya confirmada no se debe volver a confirmar.
test('Lanza error en reserva ya confirmada', () => {
  expect(() => confirmReservation(1)).toThrow('Reserva ya confirmada');
});
