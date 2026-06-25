import { login, register, confirmAccount, recoverPassword } from '@/lib/auth';
import { users } from '@/data/users';

describe('Tests de Autenticación (lib/auth.ts)', () => {
  beforeEach(() => {
    // Limpia el array
    users.length = 0;

    // Agrega el usuario inicial
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
        isConfirmed: false, // Usuario que el test va a intentar loguear
      }
    );
  });

  // Test 1: Verificar el error cuando la contraseña es incorrecta
  test('Lanza error en el login si la contraseña es incorrecta', () => {
  test('Lanza error en el login si la contraseña es incorrecta', () => {
    // Usamos el email que ya existe en tu array mockeado ('bruno@test.com')
    expect(() => login('bruno@test.com', 'clave-equivocada')).toThrow('Contraseña incorrecta');
  });

  // Test 2: Verificar la validación de contraseñas al registrarse
  test('Lanza error en el registro si las contraseñas no coinciden', () => {
  test('Lanza error en el registro si las contraseñas no coinciden', () => {
    const nuevoUsuario = {
      email: 'nuevo@test.com',
      password: 'password123',
      confirmPassword: 'passwordDistinta',
      name: 'Usuario Prueba',,
    };

    expect(() => register(nuevoUsuario)).toThrow('Las contraseñas no coinciden');
  });

  // Test 3 : Verifico que no existan mails duplicados.
  test('Lanza error en el registro si el email ya está registrado', () => {
    const usuarioExistente = {
      email: 'bruno@test.com',
      password: '123456',
      confirmPassword: '123456',
      name: 'Otro Usuario',
    };

    expect(() => register(usuarioExistente)).toThrow('El correo ya está registrado');
  });

  // Test 4 : Verifico que el enlace de confirmacion expiro.
  test('Rechaza la confirmación cuando el enlace está vencido', () => {
    expect(() =>
      confirmAccount({
        token: 'abc123',
        expired: true,
      })
    ).toThrow('El enlace de confirmación ha expirado');
  });

  // Test 5: Verifico que existe una cuenta antes de resetear su contrasenia
  test('Lanza error al recuperar contraseña con un email no registrado', () => {
    expect(() => recoverPassword('inexistente@test.com')).toThrow(
      'No existe una cuenta asociada a ese correo electrónico'
    );
  });
  test('Lanza error si el email está vacío', () => {
    expect(() => recoverPassword('')).toThrow('El correo electrónico es obligatorio');
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

  // Test 3: Error si la contraseña tiene menos de 8 caracteres.
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

  // Test 4: Bloqueo de la cuenta por 15 minutos tras superar los 5 intentos fallidos.
  describe('Bloqueo de cuenta tras intentos fallidos', () => {
    const email = 'bloqueo@test.com';
    const password = 'ClaveSegura1';

    beforeAll(() => {
      register({ email, password, confirmPassword: password, name: 'Usuario Bloqueo' });
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    test('Bloquea la cuenta luego del 5to intento fallido consecutivo', () => {
      // 4 intentos fallidos: todavía debe rechazar por contraseña incorrecta.
      for (let i = 0; i < 4; i++) {
        expect(() => login(email, 'claveIncorrecta')).toThrow('Contraseña incorrecta');
      }
      // 5to intento fallido: dispara el bloqueo.
      expect(() => login(email, 'claveIncorrecta')).toThrow(
        'Cuenta bloqueada por intentos fallidos. Intentá nuevamente en 15 minutos.'
      );
      // Aunque ahora se use la contraseña correcta, la cuenta sigue bloqueada.
      expect(() => login(email, password)).toThrow(
        'Cuenta bloqueada por intentos fallidos. Intentá nuevamente en 15 minutos.'
      );
    });

    test('Desbloquea la cuenta una vez transcurridos los 15 minutos', () => {
      jest.useFakeTimers();

      // Avanzamos el reloj 15 minutos + 1 segundo desde el último intento fallido.
      jest.advanceTimersByTime(15 * 60 * 1000 + 1000);

      // Pasado el bloqueo, el login con la contraseña correcta debe funcionar.
      const user = login(email, password);
      expect(user.email).toBe(email);
    });
  });
});
