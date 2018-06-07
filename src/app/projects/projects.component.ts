import { Component, OnInit, ViewChild } from '@angular/core';

import { ProjectsService } from './projects.service';

import { ProgramsService } from '../programs/programs.service';

import { PartnersService } from '../partners/partners.service';

import { BackendService } from '../backend/backend.service';

import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css', '../app.component.css']
})
export class ProjectsComponent implements OnInit {

  public programs: Array<Object>;
  public programSelected : string;

  public partners: Array<Object> = [
    {name: "Partner 1"} //TODO: fill this in
  ]
  public partnerSelected : string;

  public semesters: Array<Object> = [
    {"name" : "Fall"},
    {"name" : "Spring"},
    {"name" : "Summer"}
  ];
  public semesterSelected: string;

  constructor(
    private projectsService: ProjectsService,
    private programsService: ProgramsService,
    private backendService: BackendService,
    private partnersService: PartnersService
  ) { }

  ngOnInit() {
    console.log("Init for program component")

    var programsPromise = this.programsService.getProgramsPromise();
    programsPromise.then((programs) => {
      this.programs = programs;
    })

    this.partnersService.getPartnersPromise().then(partners => {
      this.partners = partners.sort(this.compareFunction)
    })
  }

  private compareFunction(a, b) {
    return a["name"] < b["name"] ? a["name"] === b["name"] ? 0 : -1 : 1
  }

  public submitQuery() {
    const program = this.programSelected === undefined ? "NA" : this.programSelected; //NA is the way to say exclude this from query
    const partner = this.partnerSelected === undefined ? "NA" : this.partnerSelected;
    // const issue = this.issueSelected === undefined ? "NA" : this.issueSelected;
    const semester = this.semesterSelected === undefined ? "NA" : this.semesterSelected;
    const yearStart = (<HTMLInputElement>document.querySelector("#yearStart")).value;
    const yearEnd = (<HTMLInputElement>document.querySelector("#yearEnd")).value;

    window.location.href =
    "#/projectResults/" +
      program + "/" +
      partner + "/" +
      // issue + "/" +
      semester + "/" +
      yearStart + "/" + yearEnd;
  }

  //TODO: refactor somewhere
  private makeQuery(method, endpoint) {
    return this.backendService.resource(method, endpoint, null)
  }

}
