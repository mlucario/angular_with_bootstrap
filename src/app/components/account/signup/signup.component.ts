import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IsPasswordsMatched } from './is-password-matched';

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
  constructor(private builder: FormBuilder) {}

  ngOnInit(): void {}

  createForm(): any {
    return {
      email: ['', Validators.compose([Validators.required, Validators.email])],
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
    if(this.signUpForm.invalid){
      console.log('Error Can\'t Submit');
      // pop up an modal
      return;
    }
    console.log('submitted');
    console.log(this.signUpForm.value);

  }
}
