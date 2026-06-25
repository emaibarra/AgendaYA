import { RegisterDto, User } from '@/types/user';

const users: User[] = [
  {
    email: 'bruno@test.com',
    password: '123456',
    name: 'Bruno',
    isConfirmed: true, // Usuario normal, puede entrar
  },
  {
    email: 'noconfirmado@test.com',
    password: '123456',
    name: 'Invitado',
    isConfirmed: false, // Usuario que el test va a intentar loguear
  },
];

export function login(email: string, password: string) {
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
  users.push({ email, password, name, isConfirmed: false });

  return users[users.length - 1];
}
