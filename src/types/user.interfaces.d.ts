import type { RolesEnum } from './roles.enum';

export interface IUser {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: RolesEnum;
}
