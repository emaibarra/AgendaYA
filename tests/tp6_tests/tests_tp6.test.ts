import { register, confirmAccount } from '@/lib/auth';
import { describe, it, expect, jest, beforeEach } from '@jest/globals';

describe('Unit tests de registro y confirmacion de cuenta', () => {
  it('Registrar usuario por primera vez', () => {
    const newUser = register({
      name: 'Usuario Normal',
      email: 'normal@test.com',
      password: 'password123',
      confirmPassword: 'password123',
    });
    //se espera que se haya creado un objeto newUser con los parametros ingresados
    expect(newUser.name).toBe('Usuario Normal');
    expect(newUser.email).toBe('normal@test.com');
    expect(newUser.isConfirmed).toBe(false); //al crearse por primera vez se espera que no se confirme la cuenta
  });

  it('Registro de cuenta con contraseña de 8 caracteres', () => {
    const newUser = register({
      name: 'Usuario Borde',
      email: 'borde@test.com',
      password: '12345678',
      confirmPassword: '12345678',
    });

    expect(newUser).toBeDefined(); // verifica que newUser no sea null
    expect(newUser.email).toBe('borde@test.com'); //verifica que se haya guardado correctamente el mail
  });

  it('Lanza error, correo ya registrado', () => {
    expect(() => {
      register({
        name: 'Emo',
        email: 'ema@gmail.com',
        password: '123',
        confirmPassword: '123',
      });
    }).toThrow('El correo ya está registrado'); //se espera que arroje el error que el correo ya esta registrado
  });

  it('Confirmacion de cuenta con token que no expiró', () => {
    const result = confirmAccount({
      token: 'token-super-seguro',
      expired: false, //el token todavia no expiró
    });

    expect(result.activated).toBe(true); //esperamos que nos devuelva un true la confirmacion de la cuenta
    expect(result.redirectTo).toBe('/login'); //esperamos que nos redirija a la ruta del login
  });

  it('debe lanzar error si el enlace de confirmación ha expirado', () => {
    expect(() => {
      confirmAccount({
        token: 'token-viejo',
        expired: true, // Simulamos que el tiempo del token caducó
      });
    }).toThrow('El enlace de confirmación ha expirado'); //se espera que arroje el error
  });
});
