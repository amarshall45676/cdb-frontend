import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../authGuard/auth.service';
import { BackendService } from '../../backend/backend.service';

@Component({
  selector: 'app-query-navigation',
  templateUrl: './query-navigation.component.html',
  styleUrls: ['./query-navigation.component.css', '../../app.component.css']
})
export class QueryNavigationComponent implements OnInit {

  constructor(private backendService: BackendService, private authService: AuthService) { }

  ngOnInit() {
  }

  public logout() {
    this.backendService.logout().then(r => {
      window.location.href = `#/landing`
      this.authService.logout();
      window.alert("You were succesfully logged out")
    })
  }

}
