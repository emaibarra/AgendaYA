'use client';

import { useState } from 'react';
import ReservationCard from './ReservationCard';

const initialReservations = [
  {
    id: 1,
    patient: 'Juan Perez',
    date: '2026-06-20',
    confirmed: false
  },
  {
    id: 2,
    patient: 'Maria Gomez',
    date: '2026-06-21',
    confirmed: false
  }
];

export default function ReservationList() {
  const [reservations, setReservations] =
    useState(initialReservations);

  const confirmReservation = (
    reservationId: number
  ) => {
    setReservations((prev) =>
      prev.map((reservation) =>
        reservation.id === reservationId
          ? {
              ...reservation,
              confirmed: true
            }
          : reservation
      )
    );
  };

  return (
    <div className="space-y-4">
      {reservations.map((reservation) => (
        <ReservationCard
          key={reservation.id}
          {...reservation}
          onConfirm={confirmReservation}
        />
      ))}
    </div>
  );
}