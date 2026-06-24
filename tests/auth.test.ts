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
});
