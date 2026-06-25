import { toDateKey, createBooking } from "@/lib/booking"; // Importamos createBooking

describe("Tests de Utilidades de Reserva (lib/booking.ts)", () => {

  // Test 3: Verificar que el formateo de la fecha sea correcto (el que ya tenías)
  test("toDateKey formatea la fecha en 'YYYY-MM-DD' agregando ceros a la izquierda", () => {
    const fechaPrueba = new Date(2024, 4, 5);
    const resultado = toDateKey(fechaPrueba);
    expect(resultado).toBe("2024-05-05");
  });

  // --- NUEVOS TESTS ADAPTADOS A TU CÓDIGO REAL ---

  test('Lanza error al intentar reservar si faltan datos obligatorios vacíos (nombre o email)', () => {
    const reservaInvalida = {
      eventTypeId: 'evt-1', // Requerido por tu interface
      name: '',             // Falta nombre
      email: '',            // Falta email
      date: new Date(2026, 9, 15), // Usamos objeto Date (Octubre 15, 2026)
      time: '10:00',
    };

    expect(() => createBooking(reservaInvalida)).toThrow('El nombre y el email son obligatorios');
  });

  test('Lanza error si el email de la reserva no tiene formato válido', () => {
    const reservaEmailInvalido = {
      eventTypeId: 'evt-1', // Requerido por tu interface
      name: 'Invitado',
      email: 'invitado@.com', // Formato roto intencional
      date: new Date(2026, 9, 15),
      time: '11:00',
    };

    expect(() => createBooking(reservaEmailInvalido)).toThrow('Formato de email inválido');
  });

});