import { RegisterDto, User } from '@/types/user';

const users: User[] = [
  {
    email: 'bruno@test.com',
    password: '123456',
    name: 'Bruno',
  },
];

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
    name,
    email,
    password,
  };

  users.push(newUser);
  return users[users.length - 1];
}
