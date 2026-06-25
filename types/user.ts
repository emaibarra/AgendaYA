export interface RegisterDto {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  isConfirmed: boolean;
  lockedUntil?: Date | null;
  failedAttempts?: number;
}

export interface ConfirmAccountDto {
  token: string;
  expired: boolean;
}
