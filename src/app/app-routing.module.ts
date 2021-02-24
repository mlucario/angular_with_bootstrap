import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './components/account/profile/profile.component';
import { SignOutComponent } from './components/account/sign-out/sign-out.component';
import { SigninComponent } from './components/account/signin/signin.component';
import { SignupComponent } from './components/account/signup/signup.component';
import { DashboardComponent } from './components/manager/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'manager/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'manager/dashboard',
    component: DashboardComponent,
  },
  {
    path: 'account',
    component: ProfileComponent,
    children: [     
      {
        path: 'signin',
        component: SigninComponent,
      },
      {
        path: 'signup',
        component: SignupComponent,
      },
      {
        path: 'signout',
        component: SignOutComponent,
      },
      {
        path: ':id',
        component: ProfileComponent,
      }
    ]
  }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
export class AppRoutingModule { }
