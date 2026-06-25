import { availability, existingBookings, eventTypes } from '@/data/booking';
import { addReservation } from '@/data/reservations';

export type Booking = {
  id: string;
  eventTypeId: string;
  date: string; // yyyy-mm-dd
  time: string; // HH:mm
  name: string;
  email: string;
  phone?: string;
  note?: string;
  createdAt: string;
};

export type Slot = {
  time: string;
  available: boolean;
};

// Clave local yyyy-mm-dd (sin desfase de zona horaria, a diferencia de toISOString).
export function toDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

// Estado en memoria: horarios ya tomados (semilla + reservas de la sesión).
const takenSlots = new Set<string>(existingBookings.map((b) => `${b.date} ${b.time}`));
const sessionBookings: Booking[] = [];

function slotKey(dateKey: string, time: string) {
  return `${dateKey} ${time}`;
}

// Un día no es seleccionable si está en el pasado, no es laborable o está bloqueado.
export function isDayDisabled(date: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const day = new Date(date);
  day.setHours(0, 0, 0, 0);

  if (day < today) return true;
  if (!availability.workdays.includes(date.getDay())) return true;
  if (availability.blockedDates.includes(toDateKey(date))) return true;

  return false;
}

// Genera los horarios del día respetando: horario laboral, intervalo,
// antelación mínima, horarios pasados y horarios ya reservados.
export function getSlotsForDay(date: Date): Slot[] {
  const slots: Slot[] = [];
  const dateKey = toDateKey(date);

  const now = new Date();
  const minBookable = new Date(now.getTime() + availability.minNoticeHours * 60 * 60 * 1000);

  for (let h = availability.startHour; h < availability.endHour; h++) {
    for (let m = 0; m < 60; m += availability.slotMinutes) {
      const slotDate = new Date(date);
      slotDate.setHours(h, m, 0, 0);

      const time = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
      const isPast = slotDate < minBookable;
      const isTaken = takenSlots.has(slotKey(dateKey, time));

      slots.push({ time, available: !isPast && !isTaken });
    }
  }

  return slots;
}

export function isSlotTaken(date: Date, time: string): boolean {
  return takenSlots.has(slotKey(toDateKey(date), time));
}

let counter = takenSlots.size;

// Crea la reserva en memoria. No envía mails reales: solo lo simula por consola.
export function createBooking(input: {
  eventTypeId: string;
  date: Date;
  time: string;
  name: string;
  email: string;
  phone?: string;
  note?: string;
}): Booking {
  // 1. Validar campos obligatorios (NUEVO)
  if (!input.name.trim() || !input.email.trim()) {
    throw new Error('El nombre y el email son obligatorios');
  }

  // 2. Validar formato de email (NUEVO)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(input.email.trim())) {
    throw new Error('Formato de email inválido');
  }

  const dateKey = toDateKey(input.date);

  // Regla del sistema: un horario reservado no puede reservarse otra vez. (Ya lo tenías)
  if (takenSlots.has(slotKey(dateKey, input.time))) {
    throw new Error('Este horario ya fue reservado. Por favor elegí otro.');
  }

  const booking: Booking = {
    id: `bk-${++counter}`,
    eventTypeId: input.eventTypeId,
    date: dateKey,
    time: input.time,
    name: input.name.trim(),
    email: input.email.trim(),
    phone: input.phone?.trim() || undefined,
    note: input.note?.trim() || undefined,
    createdAt: new Date().toISOString(),
  };
  console.log('Creando reserva:', booking);

  // Actualizamos el estado en memoria para bloquear el horario y mostrarlo en el admin.
  takenSlots.add(slotKey(dateKey, input.time));
  sessionBookings.push(booking);

  // Persistimos la reserva en el store de data/ para que el admin la vea luego.
  const serviceName = eventTypes.find((e) => e.id === input.eventTypeId)?.name ?? input.eventTypeId;
  addReservation({
    patient: booking.name,
    email: booking.email,
    phone: booking.phone,
    note: booking.note,
    service: serviceName,
    date: booking.date,
    time: booking.time,
  });

  // M06 (mock): aquí se dispararían las notificaciones reales.
  console.info(
    `[AgendaYA] Confirmación simulada enviada a ${booking.email} y notificación al administrador.`
  );

  return booking;
}

export function getSessionBookings(): Booking[] {
  return [...sessionBookings];
}
