import { Component, OnInit, ViewChild } from '@angular/core';

import { ProjectsService } from './projects.service';

import { ProgramsService } from '../programs/programs.service';

import { PartnersService } from '../partners/partners.service';

import { BackendService } from '../backend/backend.service';

import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  private projectsService: ProjectsService;
  private programsService: ProgramsService;
  private backendService: BackendService;

  private programs: Array<Object>;
  private programSelected : string;

  private partners: Array<Object> = [
    {name: "Partner 1"} //TODO: fill this in
  ]
  private partnerSelected : string;

  private semesters: Array<Object> = [
    {"name" : "Fall"},
    {"name" : "Spring"},
    {"name" : "Summer"}
  ];
  private semesterSelected: string;

  constructor(
    pProjectsService: ProjectsService,
    pProgramsService: ProgramsService,
    pBackendService: BackendService,
    private partnersService: PartnersService
  ) {
    this.backendService = pBackendService;
    this.projectsService = pProjectsService;
    this.programsService = pProgramsService;
   }

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

  public redirectMain() {
    this.redirect("main")
  }

  public redirectProjects() {
    this.redirect("projects")
  }

  public redirectPartners() {
    this.redirect("partners")
  }

  public redirectStudents() {
    this.redirect("students")
  }
  
  public redirectAffiliates() {
    this.redirect("affiliates")
  }

  private redirect(location) {
    window.location.href = location;
  }

  public submitQuery() {
    const program = this.programSelected === undefined ? "NA" : this.programSelected; //NA is the way to say exclude this from query
    const partner = this.partnerSelected === undefined ? "NA" : this.partnerSelected;
    // const issue = this.issueSelected === undefined ? "NA" : this.issueSelected;
    const semester = this.semesterSelected === undefined ? "NA" : this.semesterSelected;
    const yearStart = (<HTMLInputElement>document.querySelector("#yearStart")).value;
    const yearEnd = (<HTMLInputElement>document.querySelector("#yearEnd")).value;

    window.location.href =
    "projectResults/" +
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
