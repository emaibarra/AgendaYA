import { validarFechaReserva, calcularSlots } from '@/lib/booking';
import { describe, it, expect } from '@jest/globals';

describe('Unit tests de validación de fechas y cálculo de slots (M04)', () => {

  // --- Función 1: validarFechaReserva ---
  it('Caso Normal: Retorna true si la fecha de reserva es en el futuro', () => {
    // Sumamos 5 días a la fecha actual
    const fechaFutura = new Date();
    fechaFutura.setDate(fechaFutura.getDate() + 5);
    
    expect(validarFechaReserva(fechaFutura.toISOString())).toBe(true);
  });

  it('Caso Límite/Borde: Retorna false si la fecha es exactamente la de hoy', () => {
    // El sistema exige al menos 24 horas de antelación
    const hoy = new Date().toISOString().split('T')[0]; // Ej: 2026-09-22
    
    expect(validarFechaReserva(hoy)).toBe(false);
  });

  it('Caso Error: Lanza excepción si se intenta reservar en el pasado', () => {
    const fechaPasada = '2020-01-01T10:00:00Z';
    
    expect(() => {
      validarFechaReserva(fechaPasada);
    }).toThrow('No se pueden realizar reservas en fechas pasadas');
  });

  // --- Función 2: calcularSlots ---
  it('Caso Normal: Calcula correctamente la cantidad de slots disponibles', () => {
    // Rango de 09:00 a 11:00 con turnos de 30 minutos
    const slots = calcularSlots('09:00', '11:00', 30);
    
    expect(slots.length).toBe(4);
    expect(slots).toEqual(['09:00', '09:30', '10:00', '10:30']);
  });

  it('Caso Error: Devuelve array vacío si la hora de inicio es mayor o igual a la de fin', () => {
    // Horarios invertidos o idénticos
    const slotsInvertidos = calcularSlots('15:00', '14:00', 30);
    const slotsIguales = calcularSlots('10:00', '10:00', 30);
    
    expect(slotsInvertidos).toEqual([]);
    expect(slotsIguales.length).toBe(0);
  });

});