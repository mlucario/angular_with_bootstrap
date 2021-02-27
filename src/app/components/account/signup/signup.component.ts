import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IsPasswordsMatched } from './is-password-matched';
import { AuthService } from '../../../services/auth.service';
import { RegisterUser } from '../../../models/auth-model/register-user';
import { tap } from 'rxjs/operators';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup = this.builder.group(this.createForm(), {
    validators: [IsPasswordsMatched('password', 'passwordConfirm')],
  });
  isSubmitted: boolean = false;
  signUpResult : string = "";
  // LIST ERRORS MESSAGE
  // Email
  emailRequire = 'Email is empty.';
  emailPattern = 'Email is invalid.';

  // Password
  passwordRequire = 'Password is empty.';
  passwordPattern = 'Password is invalid.';
  passwordMinLenght = 'Password is too short.';

  // Password Confirm
  passwordNotMatch = "Password confirm doesn't match";
  constructor(private builder: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {}

  createForm(): any {
    return {
      email: [
        '',
        Validators.compose([Validators.required, Validators.email]),
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/^([^\s]*$)/),
          Validators.minLength(6),
        ],
      ],
      passwordConfirm: [
        '',
        [
          Validators.required,
          Validators.pattern(/^([^\s]*$)/),
          Validators.minLength(6),
        ],
      ],
      agreement: [false, Validators.requiredTrue],
    };
  }

  get f(): any {
    return this.signUpForm.controls;
  }

  onSubmit(): void {
    console.log('ON SUBMIT');
    this.isSubmitted = true;
    const btn = document.getElementById('signUpModel');
    if (this.signUpForm.invalid) {
      console.log("Error Can't Submit");
      return;
    }
    const { email, password, passwordConfirm } = this.signUpForm.value;
    // ALWAYS SETUP NEW USER IS employee _ STANDARD
    // ! THERE ARE 3 ROLES FOR DEMO
    // * employee - manager - admin
    const registerUser = new RegisterUser(
      email,
      password,
      passwordConfirm,
      'employee'
    );

    this.authService.signUp(registerUser).subscribe(
      (response : RegisterUser)=> {
        if(response){
          console.log(response);
          this.signUpResult = "Create account successfully! ";
          btn?.click();
          this.signUpForm.reset();          
          
        }else{
          this.signUpResult = "Website doesn\'t allow to create new user right now. Please come back later on!"
          btn?.click();
          console.log('error');
        }
      }
    )
    this.isSubmitted = false;
  }
}
