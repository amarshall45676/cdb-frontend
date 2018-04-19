import { Component, OnInit } from '@angular/core';

import {BackendService} from '../backend/backend.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  public loginURL = "http://localhost:2222/auth";

  constructor(private backendService: BackendService) { }

  ngOnInit() {
  }

  public login() {
    window.location.href = this.loginURL;
  }
}
