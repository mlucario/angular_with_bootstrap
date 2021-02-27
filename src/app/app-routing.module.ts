import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './components/account/profile/profile.component';
import { SignOutComponent } from './components/account/sign-out/sign-out.component';
import { SigninComponent } from './components/account/signin/signin.component';
import { SignupComponent } from './components/account/signup/signup.component';
import { DashboardComponent } from './components/manager/dashboard/dashboard.component';
import { CanActivateWithRolesGuard } from './guards/guardswithroles.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'manager/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'manager/dashboard',
    component: DashboardComponent,
    data: {
      expectedRole: 'admin'
    },
    canActivate: [CanActivateWithRolesGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    data: {
      expectedRole: 'employee'
    },
    canActivate: [CanActivateWithRolesGuard]
  },
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
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
