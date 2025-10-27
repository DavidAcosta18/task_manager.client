import type { RolesEnum } from './roles.enum';

export interface IUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: RolesEnum;
  isEnabled: boolean;
}
