import { Component, OnInit, ViewChild } from '@angular/core';

import { ProjectsService } from './projects.service';
import { ProgramsService } from '../programs/programs.service';
import { PartnersService } from '../partners/partners.service';
import { BackendService } from '../backend/backend.service';
import { UtilsService } from '../utils/utils.service';

import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css', '../app.component.css']
})
export class ProjectsComponent implements OnInit {
  public emptyQuery: string = "#/projectResults";
  //TODO: make these change over time based off of data, and also the current year
  public startYear = 2012;
  public endYear = 2018;

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
    private partnersService: PartnersService,
    private utilsService: UtilsService
  ) { }

  ngOnInit() {
    console.log("Init for program component")

    var programsPromise = this.programsService.getProgramsPromise();
    programsPromise.then((programs) => {
      this.programs = programs;
      this.programs.sort(this.utilsService.comparisonFunction)
    })

    this.partnersService.getPartnersPromise().then(partners => {
      this.partners = partners;
      this.partners.sort(this.utilsService.comparisonFunction)
    })
  }

  public submitQuery() {
    const program = this.programSelected === undefined ? "NA" : this.programSelected; //NA is the way to say exclude this from query
    const partner = this.partnerSelected === undefined ? "NA" : this.partnerSelected;
    const semester = this.semesterSelected === undefined ? "NA" : this.semesterSelected;
    const yearStart = (<HTMLInputElement>document.querySelector("#yearStart")).value;
    const yearEnd = (<HTMLInputElement>document.querySelector("#yearEnd")).value;

    window.location.href =
    "#/projectResults/" +
      program + "/" +
      partner + "/" +
      semester + "/" +
      yearStart + "/" + yearEnd;
  }
}
