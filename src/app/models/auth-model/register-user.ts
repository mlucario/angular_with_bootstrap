// NOTE this class have property same as my back end request 
// username password confirm_password role

export class RegisterUser {
  username: string = '';
  password: string = '';
  confirm_password: string = '';
  role: string = '';

  constructor(
    email: string,
    password: string,
    confirm_password: string,
    role: string
  ) {
    this.username = email;
    this.password = password;
    this.confirm_password = confirm_password;
    this.role = role;
  }
}
