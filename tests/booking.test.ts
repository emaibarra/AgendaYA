import { toDateKey } from '@/lib/booking';

describe('Tests de Utilidades de Reserva (lib/booking.ts)', () => {
  // Test 3: Verificar que el formateo de la fecha sea correcto
  test("toDateKey formatea la fecha en 'YYYY-MM-DD' agregando ceros a la izquierda", () => {
    // En JavaScript, el mes comienza en 0 (por lo tanto, 4 es Mayo).
    // Fecha de prueba: 5 de Mayo de 2024
    const fechaPrueba = new Date(2024, 4, 5);

    const resultado = toDateKey(fechaPrueba);

    expect(resultado).toBe('2024-05-05');
  });
});
