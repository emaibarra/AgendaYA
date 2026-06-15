'use client';

import { useState } from 'react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = () => {
    if (
      email === 'bruno@test.com' &&
      password === '123456'
    ) {
      setMessage('Login exitoso');
    } else {
      setMessage('Credenciales inválidas');
    }
  };

  return (
    <div className="space-y-4">
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>
        Iniciar Sesión
      </button>

      {message && <p>{message}</p>}
    </div>
  );
}