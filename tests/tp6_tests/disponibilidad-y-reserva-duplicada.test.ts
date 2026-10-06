import {
  createBooking,
  getSessionBookings,
  getSlotsForDay,
  isSlotTaken,
  toDateKey,
} from '@/lib/booking';
import { availability, existingBookings } from '@/data/booking';

function siguienteDiaLaborableDisponible(diasAdelante: number) {
  const fecha = new Date();
  fecha.setHours(0, 0, 0, 0);
  fecha.setDate(fecha.getDate() + diasAdelante);

  while (
    !availability.workdays.includes(fecha.getDay()) ||
    availability.blockedDates.includes(toDateKey(fecha))
  ) {
    fecha.setDate(fecha.getDate() + 1);
  }

  return fecha;
}

describe('M04 - disponibilidad y creación de reservas', () => {
  it('genera intervalos de media hora para una jornada laboral disponible', () => {
    const horarios = getSlotsForDay(siguienteDiaLaborableDisponible(7));

    expect(horarios).toHaveLength(16);
    expect(horarios[0].time).toBe('09:00');
    expect(horarios.at(-1)?.time).toBe('16:30');
  });

  it('marca como no disponible un horario que ya figura en las reservas existentes', () => {
    const reservaExistente = existingBookings[0];
    const fecha = new Date(`${reservaExistente.date}T12:00:00`);
    const horario = getSlotsForDay(fecha).find(({ time }) => time === reservaExistente.time);

    expect(horario).toEqual({ time: reservaExistente.time, available: false });
  });

  it('reconoce un horario existente y no confunde otro horario del mismo día', () => {
    const reservaExistente = existingBookings[0];
    const fecha = new Date(`${reservaExistente.date}T12:00:00`);

    expect(isSlotTaken(fecha, reservaExistente.time)).toBe(true);
    expect(isSlotTaken(fecha, '15:30')).toBe(false);
  });

  it('guarda una reserva válida normalizando los datos opcionales y personales', () => {
    const fecha = siguienteDiaLaborableDisponible(7);
    const reserva = createBooking({
      eventTypeId: 'consulta-inicial',
      date: fecha,
      time: '09:00',
      name: '  Ana Torres  ',
      email: '  ana.torres@test.com  ',
      phone: '  3815551234  ',
      note: '  Primera consulta  ',
    });

    expect(reserva).toMatchObject({
      date: toDateKey(fecha),
      time: '09:00',
      name: 'Ana Torres',
      email: 'ana.torres@test.com',
      phone: '3815551234',
      note: 'Primera consulta',
    });
    expect(getSessionBookings()).toContainEqual(reserva);
  });

  it('impide reservar dos veces el mismo horario durante la sesión', () => {
    const fecha = siguienteDiaLaborableDisponible(14);
    const datosReserva = {
      eventTypeId: 'seguimiento',
      date: fecha,
      time: '09:00',
      name: 'Marcos Díaz',
      email: 'marcos.diaz@test.com',
    };

    createBooking(datosReserva);

    expect(() => createBooking(datosReserva)).toThrow(
      'Este horario ya fue reservado. Por favor elegí otro.'
    );
  });
});
