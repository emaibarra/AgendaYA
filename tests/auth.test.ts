import { login, register } from '@/lib/auth';

describe('Tests de Autenticación (lib/auth.ts)', () => {
  // Test 1: Verificar el error cuando la contraseña es incorrecta
  test('Lanza error en el login si la contraseña es incorrecta', () => {
    // Usamos el email que ya existe en tu array mockeado ('bruno@test.com')
    expect(() => login('bruno@test.com', 'clave-equivocada')).toThrow('Contraseña incorrecta');
  });

  // Test 2: Verificar la validación de contraseñas al registrarse
  test('Lanza error en el registro si las contraseñas no coinciden', () => {
    const nuevoUsuario = {
      email: 'nuevo@test.com',
      password: 'password123',
      confirmPassword: 'passwordDistinta',
      name: 'Usuario Prueba',
    };

    expect(() => register(nuevoUsuario)).toThrow('Las contraseñas no coinciden');
  });

  // Test: Rechazo por formato de email inválido al registrarse (US-M01-01)
  test('Lanza error en el registro si el formato del email es inválido', () => {
    const usuarioEmailInvalido = {
      email: 'usuario_sin_arroba.com', // Formato incorrecto intencional
      password: 'password123',
      confirmPassword: 'password123',
      name: 'Prueba Email',
    };

    // Esperamos que la función register detecte el formato y lance una excepción
    expect(() => register(usuarioEmailInvalido)).toThrow('Formato de email inválido');
  });

  // Test: Bloqueo de inicio de sesión por cuenta no confirmada (US-M01-03)
  test('Lanza error en el login si la cuenta no ha sido confirmada', () => {
    // Para que este test funcione, deberás agregar un usuario mock en lib/auth.ts
    // que tenga una propiedad confirmada en false (ej: isConfirmed: false)
    // Asumimos que existe un usuario 'noconfirmado@test.com' en tu mock de usuarios

    expect(() => login('noconfirmado@test.com', '123456')).toThrow(
      'Debes confirmar tu cuenta antes de ingresar'
    );
  });
});
