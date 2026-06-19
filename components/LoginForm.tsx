'use client';

import { useState } from 'react';

export default function LoginForm() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
        {/* Logo/Título */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-800">
            AgendaYA
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Gestión de turnos y reservas
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex rounded-xl bg-slate-100 p-1">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 rounded-lg py-2 font-medium transition ${
              isLogin
                ? 'bg-white shadow text-slate-900'
                : 'text-slate-500'
            }`}
          >
            Iniciar sesión
          </button>

          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 rounded-lg py-2 font-medium transition ${
              !isLogin
                ? 'bg-white shadow text-slate-900'
                : 'text-slate-500'
            }`}
          >
            Registrarse
          </button>
        </div>

        {/* Formulario */}
        <form className="space-y-4">
          {!isLogin && (
            <div>
              <label className="mb-1 block text-sm font-medium">
                Nombre
              </label>

              <input
                type="text"
                placeholder="Juan Pérez"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>
          )}

          <div>
            <label className="mb-1 block text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              placeholder="correo@ejemplo.com"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Contraseña
            </label>

            <input
              type="password"
              placeholder="********"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {!isLogin && (
            <div>
              <label className="mb-1 block text-sm font-medium">
                Confirmar contraseña
              </label>

              <input
                type="password"
                placeholder="********"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            {isLogin ? 'Ingresar' : 'Crear cuenta'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-500">
          {isLogin ? (
            <>
              ¿No tienes cuenta?{' '}
              <button
                onClick={() => setIsLogin(false)}
                className="font-semibold text-blue-600"
              >
                Registrarse
              </button>
            </>
          ) : (
            <>
              ¿Ya tienes cuenta?{' '}
              <button
                onClick={() => setIsLogin(true)}
                className="font-semibold text-blue-600"
              >
                Iniciar sesión
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}