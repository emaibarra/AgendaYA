import { describe, it, expect } from '@jest/globals';
import { addDays, formatDate } from '../../utils/booking.utils';

describe('Unit tests de utilidades de fechas (M04)', () => {

    // --- Función: addDays ---

    it('addDays_normal: Debe sumar días correctamente a la fecha actual (Caso Normal)', () => {
        const resultado = addDays(5);

        const esperado = new Date();
        esperado.setHours(0, 0, 0, 0);
        esperado.setDate(esperado.getDate() + 5);

        // Se usa .getTime() para comparar valores numéricos exactos
        expect(resultado.getTime()).toBe(esperado.getTime());
    });

    it('addDays_limite: Debe retornar la fecha actual a las 00:00:00 al sumar 0 días (Caso Límite/Borde)', () => {
        const resultado = addDays(0);

        const esperado = new Date();
        esperado.setHours(0, 0, 0, 0);

        expect(resultado.getTime()).toBe(esperado.getTime());
    });

    it('addDays_negativo: Debe restar días correctamente si el valor es negativo (Caso Variante)', () => {
        const resultado = addDays(-3);

        const esperado = new Date();
        esperado.setHours(0, 0, 0, 0);
        esperado.setDate(esperado.getDate() - 3);

        expect(resultado.getTime()).toBe(esperado.getTime());
    });

    // --- Función: formatDate ---

    it('formatDate_normal: Debe formatear agregando ceros iniciales a meses y días de un dígito (Caso Normal)', () => {
        // Mes 3 en JS es abril (índice 0), día 5
        const fecha = new Date(2026, 3, 5);
        const resultado = formatDate(fecha);

        expect(resultado).toBe('2026-04-05');
    });

    it('formatDate_error: Debe manejar una fecha inválida devolviendo NaN (Caso de Error)', () => {
        // Simulamos un string que no puede ser parseado como Date
        const fechaInvalida = new Date('esto-no-es-una-fecha');

        // JS devuelve NaN al extraer Año/Mes/Día de una fecha corrupta
        const resultado = formatDate(fechaInvalida);

        expect(resultado).toBe('NaN-NaN-NaN');
    });

});