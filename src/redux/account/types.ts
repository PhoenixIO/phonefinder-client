export enum Role {
  User = 'user',
  Admin = 'admin',
}

export type AccountState = {
  email: string;
  roles: Role[];
}
