import { login, register, confirmAccount, recoverPassword } from '@/lib/auth';
import { users } from '@/data/users';

describe('Tests de Autenticación (lib/auth.ts)', () => {
  beforeEach(() => {
    // Reiniciamos el mock de usuarios para que cada test empiece con el mismo estado.
    users.length = 0;

    users.push(
      {
        id: 1,
        email: 'bruno@test.com',
        password: '123456',
        name: 'Bruno',
        isConfirmed: true,
      },
      {
        id: 2,
        email: 'noconfirmado@test.com',
        password: '123456',
        name: 'Invitado',
        isConfirmed: false,
      }
    );
  });

  // Verifica que el login rechace credenciales válidas por email pero inválidas por contraseña.
  test('Lanza error en el login si la contraseña es incorrecta', () => {
    expect(() => login('bruno@test.com', 'clave-equivocada')).toThrow('Contraseña incorrecta');
  });

  // Verifica la validación de confirmación de contraseña en el registro.
  test('Lanza error en el registro si las contraseñas no coinciden', () => {
    const nuevoUsuario = {
      email: 'nuevo@test.com',
      password: 'password123',
      confirmPassword: 'passwordDistinta',
      name: 'Usuario Prueba',
    };

    expect(() => register(nuevoUsuario)).toThrow('Las contraseñas no coinciden');
  });

  // Evita duplicados de correo en el alta de usuarios.
  test('Lanza error en el registro si el email ya está registrado', () => {
    const usuarioExistente = {
      email: 'bruno@test.com',
      password: '12345678',
      confirmPassword: '12345678',
      name: 'Otro Usuario',
    };

    expect(() => register(usuarioExistente)).toThrow('El correo ya está registrado');
  });

  // Simula un enlace de confirmación vencido.
  test('Rechaza la confirmación cuando el enlace está vencido', () => {
    expect(() =>
      confirmAccount({
        token: 'abc123',
        expired: true,
      })
    ).toThrow('El enlace de confirmación ha expirado');
  });

  // Recuperar contraseña debe fallar si el correo no existe en la base mockeada.
  test('Lanza error al recuperar contraseña con un email no registrado', () => {
    expect(() => recoverPassword('inexistente@test.com')).toThrow(
      'No existe una cuenta asociada a ese correo electrónico'
    );
  });

  // El flujo de recuperación no acepta un email vacío.
  test('Lanza error si el email está vacío', () => {
    expect(() => recoverPassword('')).toThrow('El correo electrónico es obligatorio');
  });

  // Valida el formato básico del email antes de registrar.
  test('Lanza error en el registro si el formato del email es inválido', () => {
    const usuarioEmailInvalido = {
      email: 'usuario_sin_arroba.com',
      password: 'password123',
      confirmPassword: 'password123',
      name: 'Prueba Email',
    };

    expect(() => register(usuarioEmailInvalido)).toThrow('Formato de email inválido');
  });

  // Bloquea el login de cuentas que todavía no fueron confirmadas.
  test('Lanza error en el login si la cuenta no ha sido confirmada', () => {
    expect(() => login('noconfirmado@test.com', '123456')).toThrow(
      'Debes confirmar tu cuenta antes de ingresar'
    );
  });

  // Obliga a usar contraseñas mínimas para el registro.
  test('Lanza error en el registro si la contraseña tiene menos de 8 caracteres', () => {
    const usuarioConClaveCorta = {
      email: 'clavecorta@test.com',
      password: '1234567',
      confirmPassword: '1234567',
      name: 'Usuario Clave Corta',
    };

    expect(() => register(usuarioConClaveCorta)).toThrow(
      'La contraseña debe tener al menos 8 caracteres'
    );
  });

  describe('Bloqueo de cuenta tras intentos fallidos', () => {
    const email = 'bloqueo@test.com';
    const password = 'ClaveSegura1';

    beforeEach(() => {
      // Creamos una cuenta confirmada para probar solo la lógica de bloqueo.
      users.push({
        id: 3,
        email,
        password,
        name: 'Usuario Bloqueo',
        isConfirmed: true,
        failedAttempts: 0,
      });
    });

    afterEach(() => {
      // Dejamos los timers como estaban para no afectar otros tests.
      jest.useRealTimers();
    });

    // Verifica que 5 fallos seguidos bloqueen la cuenta.
    test('Bloquea la cuenta luego del 5to intento fallido consecutivo', () => {
      for (let i = 0; i < 4; i++) {
        expect(() => login(email, 'claveIncorrecta')).toThrow('Contraseña incorrecta');
      }

      expect(() => login(email, 'claveIncorrecta')).toThrow(
        'Cuenta bloqueada por intentos fallidos. Intentá nuevamente en 15 minutos.'
      );

      expect(() => login(email, password)).toThrow(
        'Cuenta bloqueada por intentos fallidos. Intentá nuevamente en 15 minutos.'
      );
    });

    // Verifica que el bloqueo expire después de 15 minutos.
    test('Desbloquea la cuenta una vez transcurridos los 15 minutos', () => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2026-01-01T00:00:00.000Z'));

      for (let i = 0; i < 5; i++) {
        try {
          login(email, 'claveIncorrecta');
        } catch {
          // La cuenta se bloquea en el quinto intento.
        }
      }

      jest.advanceTimersByTime(15 * 60 * 1000 + 1000);

      const user = login(email, password);
      expect(user.email).toBe(email);
    });
  });
});
