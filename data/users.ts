import { User } from '@/types/user';

export const users: User[] = [
  {
    id: 1,
    email: 'bruno@test.com',
    password: '123456',
    name: 'Bruno',
    isConfirmed: true, // Usuario normal, puede entrar
    provider: 'local',
  },
  {
    id: 2,
    email: 'noconfirmado@test.com',
    password: '123456',
    name: 'Invitado',
    isConfirmed: false, // Usuario que el test va a intentar loguear
    provider: 'local',
  },
  {
    id: 3,
    email: 'caro@gmail.com',
    password: '123456',
    name: 'caro',
    isConfirmed: true,
    provider: 'local',
  },
  {
    id: 4,
    email: 'valen@gmail.com',
    password: '123456',
    name: 'valen',
    isConfirmed: true,
    provider: 'google',
  },
  {
    id: 5,
    email: 'fer@gmail.com',
    password: '123456',
    name: 'fer',
    isConfirmed: true,
    provider: 'local',
  },
  {
    id: 6,
    email: 'ema@gmail.com',
    password: '123',
    name: 'ema',
    isConfirmed: true,
    provider: 'local',
  },
];
