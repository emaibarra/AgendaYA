type Props = {
    id: number;
    patient: string;
    date: string;
    confirmed: boolean;
    onConfirm: (id: number) => void;
  };
  
  export default function ReservationCard({
    id,
    patient,
    date,
    confirmed,
    onConfirm
  }: Props) {
    return (
      <div className="border p-4 rounded">
        <h3>{patient}</h3>
  
        <p>{date}</p>
  
        <p>
          Estado:
          {confirmed
            ? ' Confirmada'
            : ' Pendiente'}
        </p>
  
        {!confirmed && (
          <button
            onClick={() => onConfirm(id)}
          >
            Confirmar
          </button>
        )}
      </div>
    );
  }