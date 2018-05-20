import { Component, OnInit } from '@angular/core';

import {BackendService} from '../backend/backend.service';

import { AuthService } from '../authGuard/auth.service'

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css', '../app.component.css']
})
export class LandingComponent implements OnInit {
  // public loginURL = "http://localhost:2222/auth";
  public loginURL = "https://protected-chamber-70038.herokuapp.com/auth";

  constructor(private backendService: BackendService, private authService: AuthService) { }

  ngOnInit() {
  }

  public login() {
    this.authService.login();
    window.location.href = this.loginURL;
  }
}
