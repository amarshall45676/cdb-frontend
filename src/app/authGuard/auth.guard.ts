import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  private baseURL = "http://localhost:4200/";
  // private baseURL = "http://cdb.surge.sh/";
//private router: Router,

  constructor(private authService: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this.authService.getIsLoggedIn()) {
      return true;
    } else {
      window.alert("You are not authroized to see this page!")
      window.location.href = "#/landing";
      //TODO: redirect them to the home page, and have helpful error alert
      return false;
    }
  }
}
