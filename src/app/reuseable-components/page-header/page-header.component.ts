import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css', '../../app.component.css']
})
export class PageHeaderComponent implements OnInit {
  // These are inputs that will tell certain parts should be include liek query navigation or whether there should be a close button
  @Input() title = 'default title';
  @Input() queryNav = false; // Make abilty to show a query nav bard optional
  @Input() dialog = false; // Need close for profiles

  constructor() {}

  ngOnInit() {
  }
}
