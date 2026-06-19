'use client';

import { useEffect, useRef } from 'react';

type Props = {
  open: boolean;
  title: string;
  onClose: () => void;
  // Si se pasa onBack, el header muestra una flecha "Volver" en lugar de "Cerrar".
  onBack?: () => void;
  children: React.ReactNode;
};

// Ventana de diálogo nativa (<dialog>): full-screen en mobile, tarjeta centrada
// en desktop. Cierra con Escape y muestra backdrop automáticamente.
export default function Dialog({ open, title, onClose, onBack, children }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      className="m-0 h-dvh max-h-dvh w-screen max-w-none bg-transparent p-0 backdrop:bg-black/40 sm:m-auto sm:h-auto sm:max-h-[90vh] sm:w-full sm:max-w-md sm:rounded-3xl"
    >
      <div className="flex h-full flex-col bg-white sm:rounded-3xl">
        <header className="flex items-center gap-3 border-b border-gray-100 p-4">
          <button
            type="button"
            onClick={onBack ?? onClose}
            aria-label={onBack ? 'Volver' : 'Cerrar'}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xl text-gray-600 hover:bg-gray-100"
          >
            {onBack ? '←' : '✕'}
          </button>

          <h2 className="text-lg font-semibold">{title}</h2>
        </header>

        <div className="flex-1 overflow-y-auto p-4">{children}</div>
      </div>
    </dialog>
  );
}
