export class User {
    id?: number;
    username?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    token?: string;
    email?: string;
}


export interface UserChangePassword {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }