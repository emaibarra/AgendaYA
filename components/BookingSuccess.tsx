import { EventType } from '@/types/booking';

type Props = {
  eventType: EventType;
  date: Date;
  time: string;
  email: string;
  onReset: () => void;
};

// Pantalla de confirmación final del flujo de reserva.
export default function BookingSuccess({ eventType, date, time, email, onReset }: Props) {
  const formattedDate = date.toLocaleDateString('es-AR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <div className="text-6xl">✅</div>

      <h2 className="mt-4 text-2xl font-bold">¡Reserva confirmada!</h2>

      <div className="mt-6 w-full max-w-xs space-y-1 rounded-2xl bg-gray-50 p-5 text-left">
        <p className="font-semibold">{eventType.name}</p>
        <p className="text-gray-600 capitalize">{formattedDate}</p>
        <p className="text-gray-600">{time} hs</p>
      </div>

      <p className="mt-6 text-sm text-gray-500">
        Te enviamos los detalles a <strong>{email}</strong>.
      </p>

      <button
        type="button"
        onClick={onReset}
        className="mt-8 w-full max-w-xs rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
      >
        Reservar otro turno
      </button>
    </div>
  );
}
