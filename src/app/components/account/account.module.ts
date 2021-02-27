import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ProfileComponent } from './profile/profile.component';
import { SignOutComponent } from './sign-out/sign-out.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [
    ProfileComponent,
    SigninComponent,
    SignupComponent,
    SignOutComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  exports: [
    ProfileComponent,
    SigninComponent,
    SignupComponent,
    SignOutComponent,
  ],

  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AccountModule {}
