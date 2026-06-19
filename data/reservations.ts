export type Reservation = {
  id: number;
  patient: string;
  email: string;
  phone?: string;
  note?: string;
  service: string;
  date: string; // yyyy-mm-dd
  time: string; // HH:mm
  confirmed: boolean;
};

// Store en memoria de reservas. Las reservas creadas desde el booking público
// se agregan acá con addReservation y aparecen luego en el panel del admin.
// (Es un mock: al recargar la página vuelve al estado inicial.)
export const reservations: Reservation[] = [
  {
    id: 1,
    patient: 'Juan Perez',
    email: 'juan@mail.com',
    service: 'Consulta inicial',
    date: '2026-06-23',
    time: '09:00',
    confirmed: false,
  },
  {
    id: 2,
    patient: 'Maria Gomez',
    email: 'maria@mail.com',
    service: 'Reunión de seguimiento',
    date: '2026-06-24',
    time: '11:00',
    confirmed: false,
  },
];

let nextId = reservations.length + 1;

export function addReservation(data: Omit<Reservation, 'id' | 'confirmed'>): Reservation {
  const reservation: Reservation = {
    id: nextId++,
    confirmed: false,
    ...data,
  };
  console.log('RESERVATIONS:', reservations);
  reservations.push(reservation);
  return reservation;
}
