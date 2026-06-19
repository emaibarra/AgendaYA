type Props = {
  time: string;
  available: boolean;
  onSelect: (time: string) => void;
};

// Botón amplio de horario, pensado para tocarse con una sola mano en mobile.
// Si el horario no está disponible se muestra deshabilitado y tachado.
export default function TimeSlotButton({ time, available, onSelect }: Props) {
  return (
    <button
      type="button"
      disabled={!available}
      onClick={() => onSelect(time)}
      className="rounded-xl border border-gray-200 p-4 text-center text-base font-medium transition enabled:hover:border-blue-500 enabled:hover:bg-blue-50 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-300 disabled:line-through"
    >
      {time}
    </button>
  );
}
