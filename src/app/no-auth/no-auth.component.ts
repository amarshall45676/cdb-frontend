import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authGuard/auth.service'

@Component({
  selector: 'app-no-auth',
  templateUrl: './no-auth.component.html',
  styleUrls: ['./no-auth.component.css', '../app.component.css']
})
export class NoAuthComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.logout();
  }

}
