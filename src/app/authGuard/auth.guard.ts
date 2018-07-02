import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
// private router: Router,

  constructor(private authService: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> | boolean {

      // return true;
      // TODO: take this out if working locally
    if (this.authService.getIsLoggedIn()) {
      return true;
    } else {
      window.alert('You are not authroized to see this page!')
      window.location.href = '#/landing';
      // TODO: redirect them to the home page, and have helpful error alert
      return false;
    }
  }
}
