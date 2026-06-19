'use client';

import { useEffect, useMemo, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { es } from 'date-fns/locale';
import 'react-day-picker/style.css';

import { professional, eventTypes, type EventType } from '@/data/booking';
import { isDayDisabled, getSlotsForDay, createBooking } from '@/lib/booking';

import Dialog from './Dialog';
import TimeSlotButton from './TimeSlotButton';
import BookingSuccess from './BookingSuccess';

// El calendario es la capa base (full-screen). Cada paso siguiente se abre
// como una ventana de diálogo, con flecha para volver y elegir otra opción.
type View = 'service' | 'time' | 'details' | 'success' | null;

const calendarStyle = {
  '--rdp-day-width': '2.75rem',
  '--rdp-day-height': '2.75rem',
  '--rdp-day_button-width': '2.75rem',
  '--rdp-day_button-height': '2.75rem',
  '--rdp-accent-color': '#2563eb',
  '--rdp-accent-background-color': '#eff6ff',
} as React.CSSProperties;

export default function BookingForm() {
  // Al entrar, primero hay que elegir el tipo de evento.
  const [view, setView] = useState<View>('service');

  const [service, setService] = useState<EventType | null>(null);
  const [selectedDay, setSelectedDay] = useState<Date>();
  const [selectedSlot, setSelectedSlot] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');

  const [formError, setFormError] = useState('');
  const [slotError, setSlotError] = useState('');

  const slots = useMemo(() => (selectedDay ? getSlotsForDay(selectedDay) : []), [selectedDay]);
  console.log('Slots para el día', selectedDay, slots);
  function handlePickDay(day: Date | undefined) {
    if (!day) return;
    setSelectedDay(day);
    setSlotError('');
    setView('time');
  }

  function handlePickSlot(time: string) {
    setSelectedSlot(time);
    setFormError('');
    setView('details');
  }

  function handleConfirm() {
    if (!service || !selectedDay) return;

    if (!name.trim() || !email.includes('@')) {
      setFormError('Ingresá tu nombre y un email válido.');
      return;
    }

    try {
      createBooking({
        eventTypeId: service.id,
        date: selectedDay,
        time: selectedSlot,
        name,
        email,
        phone,
        note,
      });
      setView('success');
    } catch (err) {
      // Ej.: el horario fue tomado por otra persona mientras tanto.
      setSlotError(err instanceof Error ? err.message : 'No se pudo reservar.');
      setView('time');
    }
  }

  function resetAll() {
    setService(null);
    setSelectedDay(undefined);
    setSelectedSlot('');
    setName('');
    setEmail('');
    setPhone('');
    setNote('');
    setFormError('');
    setSlotError('');
    setView('service');
  }

  const longDate = selectedDay?.toLocaleDateString('es-AR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  useEffect(() => {
    console.log('view cambió:', view);
  }, [view]);
  return (
    <div className="flex min-h-dvh flex-col items-center px-4 py-8">
      {/* Perfil del profesional */}
      <header className="flex flex-col items-center text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-4xl">
          {professional.avatar}
        </div>
        <h1 className="mt-3 text-2xl font-bold">{professional.name}</h1>
        <p className="text-sm text-gray-500">{professional.title}</p>
      </header>

      {/* Servicio elegido / botón para cambiarlo */}
      <button
        type="button"
        onClick={() => setView('service')}
        className="mt-6 flex w-full max-w-md items-center justify-between rounded-2xl border border-gray-200 p-4 text-left hover:border-blue-500"
      >
        {service ? (
          <span>
            <span className="block font-semibold">{service.name}</span>
            <span className="block text-sm text-gray-500">{service.duration} min</span>
          </span>
        ) : (
          <span className="text-gray-500">Elegí un servicio</span>
        )}
        <span className="text-blue-600">Cambiar</span>
      </button>

      {/* Calendario: capa base a pantalla completa */}
      <section className="mt-6 flex w-full max-w-md flex-1 flex-col items-center rounded-3xl border border-gray-100 bg-white p-4 shadow-sm">
        <h2 className="mb-2 text-lg font-semibold">Elegí un día</h2>

        {!service && (
          <p className="mb-3 text-center text-sm text-amber-600">Primero seleccioná un servicio.</p>
        )}

        <DayPicker
          mode="single"
          locale={es}
          selected={selectedDay}
          onSelect={handlePickDay}
          disabled={!service ? true : isDayDisabled}
          startMonth={new Date()}
          style={calendarStyle}
        />
      </section>

      {/* Diálogo: elegir servicio */}
      <Dialog open={view === 'service'} title="Elegí un servicio" onClose={() => setView(null)}>
        <div className="space-y-3">
          {eventTypes.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setService(item);
                setView(null);
              }}
              className="w-full rounded-xl border border-gray-200 p-4 text-left hover:border-blue-500 hover:bg-blue-50"
            >
              <div className="font-semibold">{item.name}</div>
              <div className="text-sm text-gray-500">
                {item.duration} min · {item.modality}
              </div>
              <p className="mt-1 text-sm text-gray-500">{item.description}</p>
            </button>
          ))}
        </div>
      </Dialog>

      {/* Diálogo: elegir horario (volver -> calendario) */}
      <Dialog
        open={view === 'time'}
        title={longDate ? `Horarios · ${longDate}` : 'Horarios'}
        onBack={() => setView(null)}
        onClose={() => {
          console.log('Cerrando diálogo de horarios');
          setView(null);
        }}
      >
        {slotError && (
          <p className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-600">{slotError}</p>
        )}
        {slots.some((s) => s.available) ? (
          <div className="grid grid-cols-3 gap-3">
            {slots.map((slot) => (
              <TimeSlotButton
                key={slot.time}
                time={slot.time}
                available={slot.available}
                onSelect={handlePickSlot}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            No hay horarios disponibles este día. Elegí otro.
          </p>
        )}
      </Dialog>

      {/* Diálogo: datos del invitado (volver -> horarios) */}
      <Dialog
        open={view === 'details'}
        title="Tus datos"
        onBack={() => setView('time')}
        onClose={() => {
          console.log('Cerrando diálogo de detalles');
          setView(null);
        }}
      >
        <div className="mb-4 rounded-xl bg-gray-50 p-3 text-sm text-gray-600">
          <p className="font-medium text-gray-800">{service?.name}</p>
          <p className="capitalize">
            {longDate} · {selectedSlot} hs
          </p>
        </div>

        <div className="space-y-4">
          <input
            placeholder="Nombre completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-gray-200 p-3"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-gray-200 p-3"
          />
          <input
            type="tel"
            placeholder="Teléfono (opcional)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-xl border border-gray-200 p-3"
          />
          <textarea
            placeholder="Nota para el profesional (opcional)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={2}
            className="w-full rounded-xl border border-gray-200 p-3"
          />

          {formError && <p className="text-sm text-red-600">{formError}</p>}

          <button
            type="button"
            onClick={handleConfirm}
            className="w-full rounded-xl bg-green-600 py-3 font-semibold text-white hover:bg-green-700"
          >
            Confirmar reserva
          </button>
        </div>
      </Dialog>

      {/* Diálogo: confirmación */}
      <Dialog open={view === 'success'} title="Reserva confirmada" onClose={resetAll}>
        {service && selectedDay && (
          <BookingSuccess
            eventType={service}
            date={selectedDay}
            time={selectedSlot}
            email={email}
            onReset={resetAll}
          />
        )}
      </Dialog>
    </div>
  );
}
