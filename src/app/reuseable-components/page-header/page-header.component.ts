import { Component, OnInit, Input } from '@angular/core';

import { AuthService } from '../../authGuard/auth.service';

import { BackendService } from '../../backend/backend.service';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css', '../../app.component.css']
})
export class PageHeaderComponent implements OnInit {
  @Input() title: string = "default title";
  @Input() queryNav: boolean = false; //Make abilty to show a query nav bard optional

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
