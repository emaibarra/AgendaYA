import { EventType } from '@/types/booking';
import { addDays, formatDate } from '@/utils/booking.utils';
// Datos mockeados para el módulo M04 - Proceso de Reserva (Booking público).
// No hay backend ni envío real de mails: todo se resuelve en memoria.

// Perfil del profesional / empresa que comparte su enlace público.
export const professional = {
  name: 'Dra. Laura Méndez',
  title: 'Consultorio de Nutrición',
  // Sin assets reales: usamos un emoji como avatar de placeholder.
  avatar: '👩‍⚕️',
};

// Tipos de evento disponibles para reservar (dependencia de M03).
export const eventTypes: EventType[] = [
  {
    id: 'consulta-inicial',
    name: 'Consulta inicial',
    duration: 30,
    description: 'Primera entrevista y evaluación general.',
    modality: 'ambas',
  },
  {
    id: 'seguimiento',
    name: 'Reunión de seguimiento',
    duration: 60,
    description: 'Control de evolución del plan.',
    modality: 'virtual',
  },
];

// Configuración de disponibilidad (dependencia de M02).
export const availability = {
  workdays: [1, 2, 3, 4, 5], // 0=Domingo ... 6=Sábado -> Lunes a Viernes
  startHour: 9, // hora de inicio de la jornada
  endHour: 17, // hora de fin (exclusiva)
  slotMinutes: 30, // duración del intervalo entre turnos
  minNoticeHours: 2, // antelación mínima para reservar
  blockedDates: [formatDate(addDays(2))], // feriados / días bloqueados (yyyy-mm-dd)
};

export const existingBookings = [
  {
    date: formatDate(addDays(1)),
    time: '10:00',
  },
  {
    date: formatDate(addDays(2)),
    time: '10:30',
  },
];
