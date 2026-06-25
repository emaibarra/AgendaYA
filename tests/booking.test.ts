import { toDateKey, isDayDisabled, nextSunday, nextMonday } from '@/lib/booking';

describe('Tests de Utilidades de Reserva (lib/booking.ts)', () => {
  // Test 3: Verificar que el formateo de la fecha sea correcto (el que ya tenías)
  test("toDateKey formatea la fecha en 'YYYY-MM-DD' agregando ceros a la izquierda", () => {
    const fechaPrueba = new Date(2024, 4, 5);
    const resultado = toDateKey(fechaPrueba);
    expect(resultado).toBe('2024-05-05');
  });

  // Test 4: Verifica que los dias no laborales no esten disponibles.
  test('Bloquea los días no laborables', () => {
    expect(isDayDisabled(nextSunday())).toBe(true);
  });

  test('Permite seleccionar un día laborable', () => {
    expect(isDayDisabled(nextMonday())).toBe(false);
  });
});
