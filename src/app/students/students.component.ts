import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentsService } from './students.service';
import { BackendService } from '../backend/backend.service';

import { PartnersService } from '../partners/partners.service';

import { ProgramsService } from '../programs/programs.service';

import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  private partnerSelected : string;
  private partners: Array<Object> = [
    {name: "Partner 1"}
  ]

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

  public programControl: FormControl = new FormControl();

//TODO: make it so you cannot select anything else if the first one is selected
  private participationArray = [
    { value: 'Not applied to a ', viewValue: 'Didn\'t Apply' },
    { value: 'Participated in ', viewValue: 'Applied, Participated' },
    { value: 'Applied to ', viewValue: 'Applied, Rejected' },
    { value: 'Rejected Offer for ', viewValue: 'Applied, Didn\'t Participate' }
  ]

  programs : Array<Object>;
  /*
  = [
   {
     name: 'HART',
     participation: this.participationArray
   },
   {
     name: 'LRME',
     participation: this.participationArray
   },
   {
     name: 'GEO1x',
     disabled: true,
     participation: this.participationArray
   }
 ];
  */


  constructor(
    private studentsService: StudentsService,
     private backendService: BackendService,
     private partnersService: PartnersService,
     private programsService: ProgramsService
   ) {
   }

  ngOnInit() {
    this.partnersService.getPartnersPromise().then(partners => {
      this.partners = partners.sort(this.compareFunction)
    })

    this.programsService.getProgramsPromise().then((programs) => {
      programs.forEach((program) => {
        program["participation"] = this.participationArray; //Add the participation value to the object
      })
      this.programs = programs;
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
    const partner = this.partnerSelected === undefined ? "NA" : this.partnerSelected; //NA is the way to say exclude this from query
    const program = this.programControl.value == undefined ? "NA" : this.programControl.value;
    //TODO: want to condense the "Applied to HART" part here?
    const issue = this.issueSelected === undefined ? "NA" : this.issueSelected;
    const semester = this.semesterSelected === undefined ? "NA" : this.semesterSelected;
    const yearStart = (<HTMLInputElement>document.querySelector("#yearStart")).value;
    const yearEnd = (<HTMLInputElement>document.querySelector("#yearEnd")).value;

    window.location.href =
    "studentResults/" +
      partner + "/" +
      program + "/" +
      issue + "/" +
      semester + "/" +
      yearStart + "/" + yearEnd;
  }

  private makeQuery(method, endpoint) {
    return this.backendService.resource(method, endpoint, null)
  }

}
