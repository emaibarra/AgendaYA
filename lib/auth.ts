import { RegisterDto, ConfirmAccountDto } from '@/types/user';
import { users } from '@/data/users';

const MAX_INTENTOS_FALLIDOS = 5;
const DURACION_BLOQUEO_MS = 15 * 60 * 1000;

export function login(email: string, password: string) {
  const user = users.find((u) => u.email === email);

  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  // Agregamos la validación antes de verificar la contraseña
  if (user.isConfirmed === false) {
    throw new Error('Debes confirmar tu cuenta antes de ingresar');
  }

  const now = Date.now();
  const lockedUntil = user.lockedUntil?.getTime();

  if (lockedUntil && now < lockedUntil) {
    throw new Error('Cuenta bloqueada por intentos fallidos. Intentá nuevamente en 15 minutos.');
  }

  if (lockedUntil && now >= lockedUntil) {
    user.lockedUntil = undefined;
    user.failedAttempts = 0;
  }

  if (user.password !== password) {
    user.failedAttempts = (user.failedAttempts ?? 0) + 1;

    if (user.failedAttempts >= MAX_INTENTOS_FALLIDOS) {
      user.lockedUntil = new Date(now + DURACION_BLOQUEO_MS);
      throw new Error('Cuenta bloqueada por intentos fallidos. Intentá nuevamente en 15 minutos.');
    }

    throw new Error('Contraseña incorrecta');
  }

  // Login correcto -> se reinicia el contador de intentos fallidos.
  user.failedAttempts = 0;
  return user;
}

export function register(data: RegisterDto) {
  const { email, password, name, confirmPassword } = data;

  if (!email || !password || !name || !confirmPassword) {
    throw new Error('Todos los campos son obligatorios');
  }

  // agregamos la validación del formato de email para que pase el test
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error('Formato de email inválido');
  }

  if (users.find((u) => u.email === email)) {
    throw new Error('El correo ya está registrado');
  }

  if (password.length < 8) {
    throw new Error('La contraseña debe tener al menos 8 caracteres');
  }

  if (password !== confirmPassword) {
    throw new Error('Las contraseñas no coinciden');
  }

  // un usuario recién registrado entra sin confirmar
  const newUser = {
    id: users.length + 1,
    email,
    password,
    name,
    isConfirmed: false,
  };

  users.push(newUser);

  return users[users.length - 1];
}

export function confirmAccount(data: ConfirmAccountDto) {
  if (data.expired) {
    throw new Error('El enlace de confirmación ha expirado');
  }

  return {
    activated: true,
    redirectTo: '/login',
  };
}

export function recoverPassword(email: string) {
  if (!email) {
    throw new Error('El correo electrónico es obligatorio');
  }

  const user = users.find((u) => u.email === email);

  if (!user) {
    throw new Error('No existe una cuenta asociada a ese correo electrónico');
  }

  // Simulación del envío del correo de recuperación
  return {
    success: true,
    message: 'Se envió un enlace para recuperar la contraseña',
  };
}
