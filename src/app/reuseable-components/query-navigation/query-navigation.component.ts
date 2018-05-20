import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-query-navigation',
  templateUrl: './query-navigation.component.html',
  styleUrls: ['./query-navigation.component.css', '../../app.component.css']
})
export class QueryNavigationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  public redirectMain() {
    this.redirect("#/main")
  }

  public redirectProjects() {
    this.redirect("#/projects")
  }

  public redirectPartners() {
    this.redirect("#/partners")
  }

  public redirectStudents() {
    this.redirect("#/students")
  }

  public redirectAffiliates() {
    this.redirect("#/affiliates")
  } //TODO: need to do the affiliates component

  private redirect(location) {
    window.location.href = location; //TODO:router navigate is better?
  }

}
