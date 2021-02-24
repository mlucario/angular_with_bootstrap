import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';

// * LOADING
import { LoadingComponent } from './components/commons/loading/loading.component';
import { DashboardComponent } from './components/manager/dashboard/dashboard.component';
import { ProfileComponent } from './components/account/profile/profile.component';
import { SigninComponent } from './components/account/signin/signin.component';
import { SignupComponent } from './components/account/signup/signup.component';
import { SignOutComponent } from './components/account/sign-out/sign-out.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoadingComponent,
    DashboardComponent,
    ProfileComponent,
    SigninComponent,
    SignupComponent,
    SignOutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
