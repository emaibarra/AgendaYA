'use client';

import { useState } from 'react';
import ReservationCard from './ReservationCard';
import { reservations as store, type Reservation } from '@/data/reservations';

export default function ReservationList() {
  // Tomamos una copia del store al montar: incluye las reservas creadas
  // desde el booking público durante esta sesión.
  const [reservations, setReservations] = useState<Reservation[]>(() => [...store]);

  const confirmReservation = (reservationId: number) => {
    setReservations((prev) =>
      prev.map((reservation) =>
        reservation.id === reservationId ? { ...reservation, confirmed: true } : reservation
      )
    );

    // Reflejamos el cambio también en el store compartido.
    const target = store.find((r) => r.id === reservationId);
    if (target) target.confirmed = true;
  };

  return (
    <div className="space-y-4">
      {reservations.map((reservation) => (
        <ReservationCard key={reservation.id} {...reservation} onConfirm={confirmReservation} />
      ))}
    </div>
  );
}
