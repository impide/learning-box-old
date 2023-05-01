import { IUser } from "src/app/interfaces/user.interface";

export interface IUserData {
  message: string;
  result: IUser;
  status: number;
  token: string;
}
