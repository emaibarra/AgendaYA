'use client';

import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();

  const handleLogout = () => {
    router.push('/');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <div className="w-full max-w-lg rounded-3xl bg-white p-10 shadow-xl text-center">
        
        <div className="mb-6 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-4xl">
            👋
          </div>
        </div>

        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          Página Principal
        </h1>
        <p className="text-slate-500 mb-8">
          ¡Bienvenido a AgendaYA! Has iniciado sesión correctamente.
        </p>

        <div className="space-y-4">
          <button
            onClick={() => router.push('/reservations')}
            className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Ver mis reservas
          </button>

          <button
            onClick={handleLogout}
            className="w-full rounded-xl border border-red-200 bg-red-50 py-3 font-semibold text-red-600 transition hover:bg-red-100"
          >
            Cerrar sesión
          </button>
        </div>

      </div>
    </div>
  );
}