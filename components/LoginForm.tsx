'use client';

import { useState } from 'react';
import { login, register } from '../lib/auth';

export default function LoginForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (isLogin) {
        login(email, password);
        alert('¡Inicio de sesión exitoso!');
      } else {
        register({ email, password, name, confirmPassword });
        resetForm();
        alert('¡Registro exitoso!');
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setName('');
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
        {/* Logo/Título */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-800">AgendaYA</h1>

          <p className="mt-2 text-sm text-slate-500">Gestión de turnos y reservas</p>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex rounded-xl bg-slate-100 p-1">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 rounded-lg py-2 font-medium transition ${
              isLogin ? 'bg-white shadow text-slate-900' : 'text-slate-500'
            }`}
          >
            Iniciar sesión
          </button>

          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 rounded-lg py-2 font-medium transition ${
              !isLogin ? 'bg-white shadow text-slate-900' : 'text-slate-500'
            }`}
          >
            Registrarse
          </button>
        </div>

        {/* Formulario */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <label className="mb-1 text-gray-800 block text-sm font-medium">Nombre</label>

              <input
                type="text"
                placeholder="Juan Pérez"
                className="w-full text-gray-600 rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div>
            <label className="mb-1 text-gray-800 block text-sm font-medium">Email</label>

            <input
              type="email"
              placeholder="correo@ejemplo.com"
              className="w-full text-gray-600 rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-1 text-gray-800 block text-sm font-medium">Contraseña</label>

            <input
              type="password"
              placeholder="********"
              className="w-full text-gray-600 rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {!isLogin && (
            <div>
              <label className="mb-1 text-gray-800 block text-sm font-medium">
                Confirmar contraseña
              </label>

              <input
                type="password"
                placeholder="********"
                className="w-full text-gray-600 rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? 'Procesando...' : isLogin ? 'Ingresar' : 'Crear cuenta'}
          </button>
          {error && <div className="text-center text-sm text-red-500">{error}</div>}
        </form>

        <div className="mt-6 text-center text-sm text-slate-500">
          {isLogin ? (
            <>
              ¿No tienes cuenta?{' '}
              <button onClick={() => setIsLogin(false)} className="font-semibold text-blue-600">
                Registrarse
              </button>
            </>
          ) : (
            <>
              ¿Ya tienes cuenta?{' '}
              <button onClick={() => setIsLogin(true)} className="font-semibold text-blue-600">
                Iniciar sesión
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
