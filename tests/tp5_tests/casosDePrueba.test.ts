import { login, register, recoverPassword } from '@/lib/auth';
import { createBooking } from '@/lib/booking';
import { describe, it, expect } from '@jest/globals';

describe('Casos de Prueba TP 5', () => {

  // CASOS POSITIVOS 

  it('CP-POS001: Validar correo de administrador (Formato valido)', () => {
    // Verificamos que si se ingresa un correo con el formato adecuado, el sistema NO lanza un error de formato.
    const validEmail = 'perezgarciacarolinaa@gmail.com';
    expect(validEmail).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/); // Verifica regex base
    expect(() => {
      recoverPassword(validEmail); // Usamos recoverPassword para evitar duplicar el test de registro
    }).not.toThrow('Formato de email inválido');
  });

  it('CP-POS002: Registro exitoso de nuevo administrador', () => {
    const newUser = register({
      name: 'Carolina Pérez',
      email: 'perezgarciacarolinaa@gmail.com',
      password: 'contraseña123',
      confirmPassword: 'contraseña123',
    });
    
    expect(newUser).toBeDefined();
    expect(newUser.email).toBe('perezgarciacarolinaa@gmail.com');
    expect(newUser.name).toBe('Carolina Pérez');
  });

  it('CP-POS003: Recuperacion de contraseña exitosa', () => {
    const response = recoverPassword('caro@gmail.com');
    
    expect(response.success).toBe(true);
    expect(response.message).toBe('Se envió un enlace para recuperar la contraseña');
  });

  it('CP-POS004: Reinicio de intentos fallidos tras login exitoso', () => {
    // Generamos un nuevo usuario para probar los intentos fallidos y el posterior reseteo
    const emailTest = 'intentos@test.com';
    const passwordTest = 'ClaveSegura1';
    
    register({
      name: 'Usuario Intentos',
      email: emailTest,
      password: passwordTest,
      confirmPassword: passwordTest,
    });
    
    // Forzamos manualmente o simulamos un fallo previo 
    expect(() => login(emailTest, 'claveEquivocada')).toThrow('Contraseña incorrecta');

    // Ahora ingresamos con la clave correcta, lo que debe resetear los fallos a 0
    const user = login(emailTest, passwordTest);
    expect(user).toBeDefined();
    expect(user.email).toBe(emailTest);
  });

  it('CP-POS005: Confirmar reserva exitosamente', () => {
    // Buscar una fecha en el futuro que sea día laborable (Lunes a Viernes)
    const fecha = new Date();
    fecha.setDate(fecha.getDate() + 7);
    while (fecha.getDay() === 0 || fecha.getDay() === 6) {
      fecha.setDate(fecha.getDate() + 1);
    }

    const reserva = createBooking({
      eventTypeId: 'consulta-inicial',
      date: fecha,
      time: '10:00',
      name: 'Ana',
      email: 'ana@gmail.com',
    });

    expect(reserva).toBeDefined();
    expect(reserva.name).toBe('Ana');
    expect(reserva.email).toBe('ana@gmail.com');
    expect(reserva.time).toBe('10:00');
  });

  // CASOS NEGATIVOS

  it('CP-NE001: Validar correo de administrador (Formato Inválido)', () => {
    expect(() => {
      register({
        name: 'Carolina',
        email: 'perezgarciacarolinaa',
        password: 'password123',
        confirmPassword: 'password123',
      });
    }).toThrow('Formato de email inválido');
  });

  it('CP-NE002: Registro con contraseña demasiado corta', () => {
    expect(() => {
      register({
        name: 'Maria',
        email: 'marianueva@gmail.com',
        password: '12345', // Solo 5 caracteres
        confirmPassword: '12345',
      });
    }).toThrow('La contraseña debe tener al menos 8 caracteres');
  });

  it('CP-NE003: Registro con mail ya existente', () => {
    expect(() => {
      register({
        name: 'Pedro',
        email: 'caro@gmail.com', 
        password: 'ClaveSegura123',
        confirmPassword: 'ClaveSegura123',
      });
    }).toThrow('El correo ya está registrado');
  });

  it('CP-NE004: Registro fallido por longitud de contraseña (Ej: "admin")', () => {
    expect(() => {
      register({
        name: 'Admin',
        email: 'admin.nuevo@gmail.com',
        password: 'admin', // Clave insegura
        confirmPassword: 'admin',
      });
    }).toThrow('La contraseña debe tener al menos 8 caracteres');
  });

  it('CP-NE005: Intento de reserva en una fecha pasada', () => {
    const ayer = new Date();
    ayer.setDate(ayer.getDate() - 1); // Forzamos al sistema a crear un turno en el pasado

    expect(() => {
      createBooking({
        eventTypeId: 'seguimiento',
        date: ayer,
        time: '10:00',
        name: 'Paciente Pasado',
        email: 'pasado@gmail.com',
      });
    }).toThrow('Este horario ya no está disponible.');
  });

});