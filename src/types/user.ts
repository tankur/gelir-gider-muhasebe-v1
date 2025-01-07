export enum UserRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
  USER = 'user'
}

export interface User {
  id: number;
  username: string;
  password: string;
  fullName: string;
  role: UserRole;
  isActive: boolean;
  profileImage?: string;
}