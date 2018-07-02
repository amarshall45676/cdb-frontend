import { Component, OnInit, ViewChild } from '@angular/core';

import { StudentsService } from './students.service';
import { BackendService } from '../backend/backend.service';
import { PartnersService } from '../partners/partners.service';
import { ProgramsService } from '../programs/programs.service';
import { UtilsService } from '../utils/utils.service';

import {FormControl} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css', '../app.component.css']
})
export class StudentsComponent implements OnInit {
  public emptyQuery = '#/studentResults';
  // TODO: make these change over time based off of data, and also the current year
  public startYear = 2012;
  public endYear = 2018;

  public partnerSelected: string; // TODO: want to give each of these a getter and setter?
  partners: Array<Object> = [
    {name: 'Partner 1'}
  ];

  public issues: Array<Object> = [
    {'name' : 'Traffic'},
    {'name' : 'Police'},
    {'name' : 'Road Safety'}
  ];
  public issueSelected: string;

  public semesters: Array<Object> = [
    {'name' : 'Fall'},
    {'name' : 'Spring'},
    {'name' : 'Summer'}
    // ,{'name' : 'Full Year'}
  ];
  public semesterSelected: string;

  public programControl: FormControl = new FormControl();

  // TODO: make it so you cannot select anything else if the first one is selected
  public participationArray = [
    { value: 'Didn\'t apply to a ', viewValue: 'Didn\'t Apply', backendValue: 'Not Applied' },
    { value: 'Participated in ', viewValue: 'Applied, Participated', backendValue: 'Participated'  },
    { value: 'Applied to ', viewValue: 'Applied, Rejected', backendValue: 'Applied'  },
    { value: 'Rejected Offer for ', viewValue: 'Applied, Didn\'t Participate', backendValue: 'Rejected'  }
  ];

  public programs: Array<Object>;


  constructor(
    private studentsService: StudentsService,
     private backendService: BackendService,
     private partnersService: PartnersService,
     private programsService: ProgramsService,
     private router: Router) {}

  ngOnInit() {
    this.partnersService.getPartnersPromise().then(partners => {
      this.partners = partners;
      partners.sort(UtilsService.comparisonFunction);
    });

    this.programsService.getProgramsPromise().then((programs) => {
      programs.forEach((program) => {
        // Add the participation value to the object, deep copy
        program['participation'] = JSON.parse(JSON.stringify(this.participationArray));
        program['participation'].forEach((participation) => {
          participation.programName = program.Name;
        });
      });
      this.programs = programs;
      this.programs.sort(UtilsService.comparisonFunction);
    });
  }

  public submitQuery() {
    const partner = this.partnerSelected === undefined ? 'NA' : this.partnerSelected; // NA is the way to say exclude this from query
    const program = (this.programControl.value === undefined || this.programControl.value === null) ? 'NA' :
      this.programControl.value.map(controlObject => {
        return controlObject.programName + ':' + controlObject.backendValue; // TODO: explain this
      }).join(',');
    const issue = this.issueSelected === undefined ? 'NA' : this.issueSelected;
    const semester = this.semesterSelected === undefined ? 'NA' : this.semesterSelected;
    const yearStart = (<HTMLInputElement>document.querySelector('#yearStart')).value;
    const yearEnd = (<HTMLInputElement>document.querySelector('#yearEnd')).value;
    const object = {
      partner: partner,
      program: program,
      issue: issue,
      semester: semester,
      yearStart: yearStart,
      yearEnd: yearEnd
    };

    this.router.navigate(['studentResults', object]);
  }
}
