import { User } from '@/types/user';

export const users: User[] = [
  {
    id: 1,
    email: 'bruno@test.com',
    password: '123456',
    name: 'Bruno',
    isConfirmed: true, // Usuario normal, puede entrar
  },
  {
    id: 2,
    email: 'noconfirmado@test.com',
    password: '123456',
    name: 'Invitado',
    isConfirmed: false, // Usuario que el test va a intentar loguear
  },
  {
    id: 3,
    email: 'caro@gmail.com',
    password: '123456',
    name: 'caro',
    isConfirmed: true,
  },
  {
    id: 4,
    email: 'valen@gmail.com',
    password: '123456',
    name: 'valen',
    isConfirmed: true,
  },
  {
    id: 5,
    email: 'fer@gmail.com',
    password: '123456',
    name: 'fer',
    isConfirmed: true,
  },
];
