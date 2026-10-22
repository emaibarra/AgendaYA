'use client';

import { useState } from 'react';

type ApiResult = {
  status: number;
  body: unknown;
};

export default function Tp7Page() {
  const [result, setResult] = useState<ApiResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function testServer() {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/tp7/test');
      const body: unknown = await response.json();

      setResult({
        status: response.status,
        body,
      });
    } catch {
      setError('No se pudo conectar con el servidor.');
      setResult(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-3xl space-y-6 p-8">
      <h1 className="text-3xl font-bold">TP7 — Pruebas del servidor web</h1>

      <p>
        Esta pantalla permite enviar una petición HTTP al servidor de AgendaYA y observar la
        respuesta recibida.
      </p>

      <button
        onClick={testServer}
        disabled={loading}
        className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white disabled:opacity-50"
      >
        {loading ? 'Consultando...' : 'Enviar GET /api/tp7/test'}
      </button>

      {error && (
        <p role="alert" className="text-red-600">
          {error}
        </p>
      )}

      {result && (
        <section className="space-y-3 rounded-lg border p-5">
          <h2 className="text-xl font-semibold">Resultado de la petición</h2>

          <p>
            <strong>Código HTTP:</strong> {result.status}
          </p>

          <pre className="overflow-x-auto rounded bg-gray-100 p-4 text-sm text-gray-900">
            {JSON.stringify(result.body, null, 2)}
          </pre>
        </section>
      )}
    </main>
  );
}
