type Props = {
  id: number;
  patient: string;
  email?: string;
  phone?: string;
  note?: string;
  service?: string;
  date: string;
  time?: string;
  confirmed: boolean;
  onConfirm: (id: number) => void;
};

export default function ReservationCard({
  id,
  patient,
  email,
  phone,
  note,
  service,
  date,
  time,
  confirmed,
  onConfirm,
}: Props) {
  return (
    <div className="rounded-xl border border-gray-200 p-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold">{patient}</h3>
          {service && <p className="text-sm text-gray-500">{service}</p>}
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            confirmed ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
          }`}
        >
          {confirmed ? 'Confirmada' : 'Pendiente'}
        </span>
      </div>

      <p className="mt-2 text-sm text-gray-700">
        {date}
        {time ? ` · ${time} hs` : ''}
      </p>

      {email && <p className="text-sm text-gray-500">{email}</p>}
      {phone && <p className="text-sm text-gray-500">{phone}</p>}
      {note && <p className="mt-1 text-sm italic text-gray-500">“{note}”</p>}

      {!confirmed && (
        <button
          onClick={() => onConfirm(id)}
          className="mt-3 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Confirmar
        </button>
      )}
    </div>
  );
}
