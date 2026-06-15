import ReservationList from '@/components/ReservationList';

export default function ReservationsPage() {
  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-5">
        Reservas
      </h1>

      <ReservationList />
    </main>
  );
}