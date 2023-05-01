import { Role } from "../enums/roles";

export class SignupModel {
  email: string;
  pseudo: string;
  password: string;
  avatarUrl: string;
  role: Role;
}
