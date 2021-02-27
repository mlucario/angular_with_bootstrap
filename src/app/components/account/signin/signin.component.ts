import { Component, OnInit } from '@angular/core';
import { SignInAccount } from '../../../models/auth-model/sign-in-user';
import { AuthService } from '../../../services/auth.service';
import { TokenStorageService } from '../../../services/token-storage.service';

import isEmail from 'validator/lib/isEmail';
import { UserToken } from 'src/app/models/auth-model/user-token';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  signInAccount: SignInAccount = new SignInAccount('', '');
  errors: any = {};
  rememberMe: boolean = false;
  isSubmitted: boolean = false;
  errorMessage: string = '';
  constructor(
    private authService: AuthService,
    private tokenStorageService: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.rememberMe = false;
    this.errorMessage = '';
    this.signInAccount.username = 'nhonquy2@gmail.com';
    this.signInAccount.password = '12345678';
  }

  validate(): void {
    // ! clear all erros before check
    this.errors = {};
    // fullname validate
    const { username, password } = this.signInAccount;

    if (username === undefined || username === '') {
      this.errors.username = 'Username should not be blank';
    } else {
      if (!isEmail(username)) {
        this.errors.username = 'Username is invalid email!';
      }
    }

    if (password === undefined || password === '') {
      this.errors.password = 'Password should not be blank';
    } else {
      if (password.length < 6) {
        this.errors.password = 'Password is too short';
      }
    }
  }

  signIn(): void {
    this.validate();    
    if (Object.keys(this.errors).length === 0) {
      this.isSubmitted = true;
      this.authService.signIn(this.signInAccount,this.rememberMe).subscribe(
        (response: any) => {
          if (response) {
            // MY BACK END SETUP TO DETECT FAIL SIGN IN
            const { id, username, role_privileges, accessToken,role } = response;

            const currentUser = new UserToken(
              id,
              username,
              role_privileges,
              accessToken,
              role
            );
            
            if (this.rememberMe) {
              this.tokenStorageService.saveTokenToLocalStorage(accessToken);
              this.tokenStorageService.saveUserToLocalStorage(currentUser);
            } else {
              this.tokenStorageService.saveTokenToSessionStorage(accessToken);
              this.tokenStorageService.saveUserToSessionStorage(currentUser);
            }
          }
        },
        (errors) => {
          this.errorMessage = errors.error.messages || 'FAIL TO SIGN IN';
        }
      );
    }
    // reset
    this.isSubmitted = false;
    this.errorMessage = '';
  }
}
