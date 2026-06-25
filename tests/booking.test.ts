import { toDateKey, createBooking } from '@/lib/booking';

describe('Tests de Utilidades de Reserva (lib/booking.ts)', () => {
  // Test 3: Verificar que el formateo de la fecha sea correcto
  test("toDateKey formatea la fecha en 'YYYY-MM-DD' agregando ceros a la izquierda", () => {
    // En JavaScript, el mes comienza en 0 (por lo tanto, 4 es Mayo).
    // Fecha de prueba: 5 de Mayo de 2024
    const fechaPrueba = new Date(2024, 4, 5);

    const resultado = toDateKey(fechaPrueba);

    expect(resultado).toBe('2024-05-05');
  });

  // Test 4: Fallo al intentar reservar un horario que quedó fuera de
  // disponibilidad o que ya pasó.
  test('createBooking lanza error al intentar reservar un horario que ya pasó', () => {
    // Usamos "ayer" en lugar de una fecha fija para que el test no dependa de cuándo se ejecute
    const ayer = new Date();
    ayer.setDate(ayer.getDate() - 1);

    expect(() =>
      createBooking({
        eventTypeId: 'consulta-inicial',
        date: ayer,
        time: '10:00',
        name: 'Paciente de Prueba',
        email: 'paciente@test.com',
      })
    ).toThrow('Este horario ya no está disponible.');
  });
});
