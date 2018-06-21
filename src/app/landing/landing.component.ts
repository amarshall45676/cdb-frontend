// TODO if ever figure out how to make this work without window.location.href use backendService
// import {BackendService} from '../backend/backend.service'; private backendService: BackendService,

import { Component, OnInit } from '@angular/core';

import { AuthService } from '../authGuard/auth.service';

import { URLService } from '../url/url.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css', '../app.component.css']
})
export class LandingComponent implements OnInit {

  constructor(private urlService: URLService, private authService: AuthService) { }

  ngOnInit() {
  }

  public login() {
    this.authService.login(); // Tell the frontend I am logging in
    window.location.href = `${this.urlService.getBackendURL()}/auth`; // Make request to backend to login
  }
}
