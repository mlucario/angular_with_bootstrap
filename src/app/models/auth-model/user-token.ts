export class UserToken {
  id: string;
  username: string;
  role_privileges: string[];
  accessToken: string;
  role: string;
  constructor(
    id: string,
    username: string,
    role_privileges: string[],
    accessToken: string,
    role: string
  ) {
    this.id = id;
    this.username = username;
    this.role_privileges = role_privileges;
    this.accessToken = accessToken;
    this.role = role;
  }
}
