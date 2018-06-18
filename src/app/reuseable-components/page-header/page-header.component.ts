import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css', '../../app.component.css']
})
export class PageHeaderComponent implements OnInit {
  @Input() title: string = "default title";
  @Input() queryNav: boolean = false; //Make abilty to show a query nav bard optional

  constructor() { }

  ngOnInit() {
  }
}
