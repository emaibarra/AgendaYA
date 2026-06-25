import { RegisterDto, ConfirmAccountDto } from '@/types/user';
import { users } from '@/data/users';

export function login(email: string, password: string) {
  console.log('usuarios', users);
  const user = users.find((u) => u.email === email);

  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  // Agregamos la validación antes de verificar la contraseña
  if (user.isConfirmed === false) {
    throw new Error('Debes confirmar tu cuenta antes de ingresar');
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

  // agregamos la validación del formato de email para que pase el test
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error('Formato de email inválido');
  }

  if (users.find((u) => u.email === email)) {
    throw new Error('El correo ya está registrado');
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
