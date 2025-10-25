export enum Roles {
  MANAGER = 'MANAGER',
  ADMIN = 'ADMIN',
}

export interface IAuthResponseDTO {
  token: string;
  userId: number;
  email: string;
  name: string;
  roles: Roles[];
}
