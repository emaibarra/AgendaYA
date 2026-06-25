import { login, register, confirmAccount, recoverPassword } from '@/lib/auth';
import { users } from '@/data/users';

describe('Tests de Autenticación (lib/auth.ts)', () => {
  beforeEach(() => {
    // Limpia el array
    users.length = 0;

    // Agrega el usuario inicial
    users.push({
      id: users.length + 1,
      email: 'bruno@test.com',
      password: '123456',
      name: 'Bruno',
    });
  });

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
});
