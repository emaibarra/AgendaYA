// Datos mockeados para el módulo M04 - Proceso de Reserva (Booking público).
// No hay backend ni envío real de mails: todo se resuelve en memoria.

export type Modality = 'presencial' | 'virtual' | 'ambas';

export type EventType = {
  id: string;
  name: string;
  duration: number; // minutos
  description: string;
  modality: Modality;
};

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
  blockedDates: ['2026-06-25'], // feriados / días bloqueados (yyyy-mm-dd)
};

// Reservas ya existentes (mock) para demostrar que un horario tomado
// no puede volver a reservarse.
export const existingBookings = [
  { date: '2026-06-24', time: '10:00' },
  { date: '2026-06-23', time: '10:30' },
];
