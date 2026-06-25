import { ConfirmAccountDto, RegisterDto, User } from '@/types/user';
import { users } from '@/data/users';

export function login(email: string, password: string) {
  const user = users.find((u) => u.email === email);

  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  if (user.password !== password) {
    throw new Error('Contraseña incorrecta');
  }

  return user;
}

export function register(data: RegisterDto) {
  const { email, password, name, confirmPassword } = data;

  if (!email || !password || !name || !confirmPassword) {
    throw new Error('Todos los campos son obligatorios');
  }

  if (users.find((u) => u.email === email)) {
    throw new Error('El correo ya está registrado');
  }

  if (password !== confirmPassword) {
    throw new Error('Las contraseñas no coinciden');
  }

  const newUser: User = {
    id: users.length + 1,
    name,
    email,
    password,
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
