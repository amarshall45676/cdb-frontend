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
  styleUrls: ['./students.component.css', '../app.component.css']
})
export class StudentsComponent implements OnInit {
  public partnerSelected : string; //TODO: want to give each of these a getter and setter?
  partners: Array<Object> = [
    {name: "Partner 1"}
  ]

  public issues: Array<Object> = [
    {"name" : "Traffic"},
    {"name" : "Police"},
    {"name" : "Road Safety"}
  ];
  public issueSelected: string;

  public semesters: Array<Object> = [
    {"name" : "Fall"},
    {"name" : "Spring"},
    {"name" : "Summer"}
    // ,{"name" : "Full Year"}
  ];
  public semesterSelected: string;

  public programControl: FormControl = new FormControl();

//TODO: make it so you cannot select anything else if the first one is selected
  public participationArray = [
    { value: 'Didn\'t apply to a ', viewValue: 'Didn\'t Apply', backendValue: "Not Applied" },
    { value: 'Participated in ', viewValue: 'Applied, Participated', backendValue: "Participated"  },
    { value: 'Applied to ', viewValue: 'Applied, Rejected', backendValue: "Applied"  },
    { value: 'Rejected Offer for ', viewValue: 'Applied, Didn\'t Participate', backendValue: "Rejected"  }
  ]

  public programs : Array<Object>;


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
        program["participation"] = JSON.parse(JSON.stringify(this.participationArray)); //Add the participation value to the object, deep copy
        program["participation"].forEach((participation) => {
          participation.programName = program.name
        })
        // console.log(program)
      })
      this.programs = programs;
    })
  }

  private compareFunction(a, b) {
    return a["name"] < b["name"] ? a["name"] === b["name"] ? 0 : -1 : 1
  }

  public submitQuery() {
    //TODO: need to change program control!
    const partner = this.partnerSelected === undefined ? "NA" : this.partnerSelected; //NA is the way to say exclude this from query
    // console.log("Initial value: " + JSON.stringify(this.programControl.value))
    const program = this.programControl.value == undefined ? "NA" :
      this.programControl.value.map(object => {
        // console.log("Object: " + JSON.stringify(object))
        return object.programName + ":" + object.backendValue; //TODO: map this to a string, then join by commas
      }).join(",")

    // console.log("Program for query: " + program)
    //TODO: want to condense the "Applied to HART" part here?
    const issue = this.issueSelected === undefined ? "NA" : this.issueSelected;
    const semester = this.semesterSelected === undefined ? "NA" : this.semesterSelected;
    const yearStart = (<HTMLInputElement>document.querySelector("#yearStart")).value;
    const yearEnd = (<HTMLInputElement>document.querySelector("#yearEnd")).value;

    window.location.href =
    "#/studentResults/" +
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
