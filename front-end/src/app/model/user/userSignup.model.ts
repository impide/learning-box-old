export class UserSignup {
  constructor(public pseudo: string, public email: string, public password: string, public avatar: string, public role: number) {
    this.pseudo = pseudo;
    this.email = email;
    this.password = password;
    this.avatar = avatar;
    this.role = role;
  }
}
