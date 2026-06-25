type User = {
  email: string;
  password: string;
  name: string;
  failedAttempts?: number;
  lockedUntil?: number;
};

const users: User[] = [
  {
    email: 'bruno@test.com',
    password: '123456',
    name: 'Bruno',
  },
];

const MAX_INTENTOS_FALLIDOS = 5;
const DURACION_BLOQUEO_MS = 15 * 60 * 1000;

export function login(email: string, password: string) {
  const user = users.find((u) => u.email === email);

  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  // Si el bloqueo sigue, se rechaza el intento sin verificar la contraseña.
  if (user.lockedUntil && Date.now() < user.lockedUntil) {
    throw new Error('Cuenta bloqueada por intentos fallidos. Intentá nuevamente en 15 minutos.');
  }

  // Si el bloqueo ya venció, se reinicia el contador antes de evaluar el intento actual.
  if (user.lockedUntil && Date.now() >= user.lockedUntil) {
    user.lockedUntil = undefined;
    user.failedAttempts = 0;
  }

  if (user.password !== password) {
    user.failedAttempts = (user.failedAttempts ?? 0) + 1;

    if (user.failedAttempts >= MAX_INTENTOS_FALLIDOS) {
      user.lockedUntil = Date.now() + DURACION_BLOQUEO_MS;
      throw new Error('Cuenta bloqueada por intentos fallidos. Intentá nuevamente en 15 minutos.');
    }

    throw new Error('Contraseña incorrecta');
  }

  // Login correcto -> se reinicia el contador de intentos fallidos.
  user.failedAttempts = 0;
  return user;
}

type RegisterInput = {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
};

export function register(data: RegisterInput) {
  const { email, password, name, confirmPassword } = data;

  if (!email || !password || !name || !confirmPassword) {
    throw new Error('Todos los campos son obligatorios');
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

  users.push({ email, password, name });
  return users[users.length - 1];
}
