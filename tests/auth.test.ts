import { login, register } from "@/lib/auth";

describe("Tests de Autenticación (lib/auth.ts)", () => {
  
  // Test 1: Verificar el error cuando la contraseña es incorrecta
  test("Lanza error en el login si la contraseña es incorrecta", () => {
    // Usamos el email que ya existe en tu array mockeado ('bruno@test.com')
    expect(() => login('bruno@test.com', 'clave-equivocada')).toThrow('Contraseña incorrecta');
  });

  // Test 2: Verificar la validación de contraseñas al registrarse
  test("Lanza error en el registro si las contraseñas no coinciden", () => {
    const nuevoUsuario = {
      email: 'nuevo@test.com',
      password: 'password123',
      confirmPassword: 'passwordDistinta',
      name: 'Usuario Prueba'
    };

    expect(() => register(nuevoUsuario)).toThrow('Las contraseñas no coinciden');
  });
  
  // Test 3: Error si la contraseña tiene menos de 8 caracteres.
  test("Lanza error en el registro si la contraseña tiene menos de 8 caracteres", () => {
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
  describe("Bloqueo de cuenta tras intentos fallidos", () => {

    const email = 'bloqueo@test.com';
    const password = 'ClaveSegura1';

    beforeAll(() => {
      register({ email, password, confirmPassword: password, name: 'Usuario Bloqueo' });
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    test("Bloquea la cuenta luego del 5to intento fallido consecutivo", () => {
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

    test("Desbloquea la cuenta una vez transcurridos los 15 minutos", () => {
      jest.useFakeTimers();

      // Avanzamos el reloj 15 minutos + 1 segundo desde el último intento fallido.
      jest.advanceTimersByTime(15 * 60 * 1000 + 1000);

      // Pasado el bloqueo, el login con la contraseña correcta debe funcionar.
      const user = login(email, password);
      expect(user.email).toBe(email);
    });
  });

});