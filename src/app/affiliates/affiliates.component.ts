import { Component, OnInit } from '@angular/core';

import { BackendService } from '../backend/backend.service';

@Component({
  selector: 'app-affiliates',
  templateUrl: './affiliates.component.html',
  styleUrls: ['./affiliates.component.css', '../app.component.css'] //add app.component.css for styles I want everywhere
})
export class AffiliatesComponent implements OnInit {
  private types: Array<Object> = [
    {"name" : "Faculty"},
    {"name" : "Graduate Student"},
    {"name" : "CCL Staff"}
  ];
  private typeSelected: string;

  private issues: Array<Object> = [
    {"name" : "Traffic"},
    {"name" : "Police"},
    {"name" : "Road Safety"}
  ];
  private issueSelected: string;

  private semesters: Array<Object> = [
    {"name" : "Fall"},
    {"name" : "Spring"},
    {"name" : "Summer"}
    // ,{"name" : "Full Year"}
  ];
  private semesterSelected: string;

  private departments: Array<Object> = [
    {"name" : "Math"},
    {"name" : "Political Science"},
    {"name" : "Statistics"}
  ]; //programs for the query
  private departmentSelected: string;

  constructor(
    private backendService : BackendService
  ) { }

  ngOnInit() {
    //TODO: anything here?
  }


  public submitQuery() {
    const department = this.departmentSelected === undefined ? "NA" : this.departmentSelected; //NA is the way to say exclude this from query
    const type = this.typeSelected === undefined ? "NA" : this.typeSelected;
    const issue = this.issueSelected === undefined ? "NA" : this.issueSelected;
    const semester = this.semesterSelected === undefined ? "NA" : this.semesterSelected;
    const yearStart = (<HTMLInputElement>document.querySelector("#yearStart")).value;
    const yearEnd = (<HTMLInputElement>document.querySelector("#yearEnd")).value;

    window.location.href =
    "affiliateResults/" +
      department + "/" +
      issue + "/" +
      type + "/" +
      semester + "/" +
      yearStart + "/" + yearEnd;
  }

  // TODO: refactor somewhere
  private makeQuery(method, endpoint) {
    return this.backendService.resource(method, endpoint, null);
  }

}
