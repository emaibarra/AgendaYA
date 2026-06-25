import { toDateKey, isDayDisabled, nextSunday, nextMonday, createBooking } from '@/lib/booking';

describe('Tests de Utilidades de Reserva (lib/booking.ts)', () => {
  // Convierte una fecha al formato interno yyyy-mm-dd sin perder ceros a la izquierda.
  test("toDateKey formatea la fecha en 'YYYY-MM-DD' agregando ceros a la izquierda", () => {
    // En JavaScript, el mes comienza en 0, por eso 4 representa mayo.
    const fechaPrueba = new Date(2024, 4, 5);

    const resultado = toDateKey(fechaPrueba);

    expect(resultado).toBe('2024-05-05');
  });

  // Rechaza reservas para un horario que ya quedó en el pasado.
  test('createBooking lanza error al intentar reservar un horario que ya pasó', () => {
    // Usamos ayer para que el caso sea estable y no dependa de la fecha actual.
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

  // Bloquea automáticamente los domingos.
  test('Bloquea los días no laborables', () => {
    expect(isDayDisabled(nextSunday())).toBe(true);
  });

  // Permite seleccionar un día laboral válido.
  test('Permite seleccionar un día laborable', () => {
    expect(isDayDisabled(nextMonday())).toBe(false);
  });
});
