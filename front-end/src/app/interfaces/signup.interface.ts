import { Role } from "../enums/roles";

export interface ISignup {
  email: string;
  pseudo: string;
  password: string;
  avatarUrl: string;
  role: Role;
}
