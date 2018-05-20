import { Component, OnInit, ViewChild } from '@angular/core';

import { ProgramsService } from '../programs/programs.service';

import { BackendService } from '../backend/backend.service';

import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.css', '../app.component.css']
})
export class PartnersComponent implements OnInit {
  private types: Array<Object> = [
    {"name" : "Act"},
    {"name" : "Learn"},
    {"name" : "Create Change"}
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

  private programs: Array<Object>; //programs for the query

  private programSelected: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
     private programsService: ProgramsService,
     private backendService: BackendService) {
   }

  ngOnInit() {
    console.log("Init for partner component")

    this.programsService.getProgramsPromise().then(programs => {
      console.log(JSON.stringify(programs))
      this.programs = programs
    })
  }

  public submitQuery() {
    const program = this.programSelected === undefined ? "NA" : this.programSelected; //NA is the way to say exclude this from query
    const type = this.typeSelected === undefined ? "NA" : this.typeSelected;
    const issue = this.issueSelected === undefined ? "NA" : this.issueSelected;
    const semester = this.semesterSelected === undefined ? "NA" : this.semesterSelected;
    const yearStart = (<HTMLInputElement>document.querySelector("#yearStart")).value;
    const yearEnd = (<HTMLInputElement>document.querySelector("#yearEnd")).value;

    window.location.href =
    "#/partnerResults/" +
      program + "/" +
      issue + "/" +
      type + "/" +
      semester + "/" +
      yearStart + "/" + yearEnd;
  }

  //TODO: refactor somewhere
  private makeQuery(method, endpoint) {
    return this.backendService.resource(method, endpoint, null)
  }

}
