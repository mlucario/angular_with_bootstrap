import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserToken } from '../models/auth-model/user-token';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class CanActivateWithRolesGuard implements CanActivate {
  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token =
      this.tokenStorageService.getTokenFromLocalStorage() ||
      this.tokenStorageService.getTokenFromSessionStorage();
    if (token !== '') {
      console.log('HERE1');

      // NOTE to get object we use &&  {} && {x: 1} = {x:1}
      const currentUser: UserToken =
        this.tokenStorageService.getUserFromLocalStorage() &&
        this.tokenStorageService.getUserFromSessionStorage();

        console.log(currentUser);
      if (Object.keys(currentUser).length > 0) {
        console.log('HERE2');
        // NOTE if token contain ROLES, we can decodeTOekn to get it
        const roles = currentUser.role; // NEED IMPLAEMENT TOKEN WITH ROLES IN SIDE
        // NOTE expectedRole is in app-routing.modules.ts
        const expectedRole = next.data.expectedRole;
        // NOTE expectedRole define in app.routing.modules.ts
        if (roles === expectedRole) {
          console.log('HERE3');
          return true;
        } else {
          alert("You don't have permission for this page!");
          return false;
        }
      } else {
        console.log('HERE4');
        this.router.navigate(['signin']);
        return false;
      }
    } else {
      this.router.navigate(['signin']);
      return false; // use can't use the particular route
    }
  }
}
