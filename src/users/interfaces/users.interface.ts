import { Role } from "src/roles/entities/Role.entity";

export interface IUser {
  id: number | string;
  name: null | string;
  email: string;
  password: string;
  phoneNumber?: string,
  createdAt: Date;
  updatedAt: Date;
  role: Role
}