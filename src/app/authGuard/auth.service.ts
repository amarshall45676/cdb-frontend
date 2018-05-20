import { Injectable, OnInit } from '@angular/core';

import {CookieService} from "ngx-cookie";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn: boolean;

  constructor(private cookieService: CookieService) {
   }

  public getIsLoggedIn() {
    if(this.cookieService.get("loggedIn")) { //If user was saved then one has logged in
      return true;
    } else {
      return false;
    }
  }

  public login() {
    this.cookieService.putObject("loggedIn", true); //save the loggedIn object to cookies so it is persistent for the user
  }

  public logout() {
    this.cookieService.remove("loggedIn");
  }

}
