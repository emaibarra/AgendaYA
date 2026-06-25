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
}

export interface ConfirmAccountDto {
  token: string;
  expired: boolean;
}
