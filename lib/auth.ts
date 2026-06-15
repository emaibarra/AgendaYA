const users = [
  {
    email: 'bruno@test.com',
    password: '123456',
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

  return true;
}
