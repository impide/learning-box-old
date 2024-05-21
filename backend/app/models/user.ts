import { Role } from "../enums/roles";

export interface SignupModel {
  pseudo: string;
  email: string;
  password: string;
  avatarUrl: string;
  role: Role;
}