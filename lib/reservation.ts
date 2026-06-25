import { reservations } from '@/data/reservations';

export function confirmReservation(id: number) {
  const reservation = reservations.find((r) => r.id === id);

  if (!reservation) {
    throw new Error('Reserva inexistente');
  }

  if (reservation.confirmed) {
    throw new Error('Reserva ya confirmada');
  }

  reservation.confirmed = true;

  return reservation;
}
