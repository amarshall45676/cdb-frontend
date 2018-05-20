import { Component, OnInit, ViewChild } from '@angular/core';

import { ProgramsService } from './programs.service';

import { BackendService } from '../backend/backend.service';

import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

//TODO: what to do with this since it should be used

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css', '../app.component.css']
})
export class ProgramsComponent implements OnInit {
  private programsService: ProgramsService;
  private backendService: BackendService;

  private programs: Array<Object> = [
    {name: "HART"} //TODO: fill this in
  ]
  private programSelected : string;

  private semesters: Array<Object> = [
    {"name" : "Fall"},
    {"name" : "Spring"},
    {"name" : "Summer"}
  ];
  private semesterSelected: string;

  constructor(
    pProgramsService: ProgramsService,
    pBackendService: BackendService
  ) {
    this.backendService = pBackendService;
    this.programsService = pProgramsService;
   }

  ngOnInit() {
    console.log("Init for program component")
  }

  public submitQuery() {
    const program = this.programSelected === undefined ? "NA" : this.programSelected; //NA is the way to say exclude this from query
    // const issue = this.issueSelected === undefined ? "NA" : this.issueSelected;
    const semester = this.semesterSelected === undefined ? "NA" : this.semesterSelected;
    const yearStart = (<HTMLInputElement>document.querySelector("#yearStart")).value;
    const yearEnd = (<HTMLInputElement>document.querySelector("#yearEnd")).value;

    window.location.href =
    "programResults/" +
      program + "/" +
      // issue + "/" +
      semester + "/" +
      yearStart + "/" + yearEnd;
  }

  //TODO: refactor somewhere
  private makeQuery(method, endpoint) {
    return this.backendService.resource(method, endpoint, null)
  }

}
