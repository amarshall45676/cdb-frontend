import { Component, OnInit, ViewChild } from '@angular/core';

import { StudentsService } from './students.service';
import { BackendService } from '../backend/backend.service';
import { PartnersService } from '../partners/partners.service';
import { ProgramsService } from '../programs/programs.service';
import { UtilsService } from '../utils/utils.service';

import {FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSelectChange} from '@angular/material';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css', '../app.component.css']
})
export class StudentsComponent implements OnInit {
  public emptyQuery = '#/studentResults';

  public startYear = UtilsService.getEarliestYear();
  public endYear = UtilsService.getCurrentYear();

  public partnerSelected: string;
  partners: Array<Object> = [
    {name: 'Partner 1'}
  ];

  public semesters: Array<Object> = [
    {'name' : 'Fall'},
    {'name' : 'Spring'},
    {'name' : 'Summer'}
    // ,{'name' : 'Full Year'}
  ];
  public semesterSelected: string;

  public programControl: FormControl = new FormControl();

  public participationArray = [
    { value: 'Participated in ', viewValue: 'Applied, Participated', backendValue: 'Participated'  },
    { value: 'Applied to ', viewValue: 'Applied, Rejected', backendValue: 'Applied'  },
    { value: 'Rejected Offer for ', viewValue: 'Applied, Didn\'t Participate', backendValue: 'Rejected'  }
  ];

  public notParticipation = { value: 'Didn\'t apply to a ', viewValue: 'Didn\'t Apply', backendValue: 'Not Applied' };

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
        program['participation'] = this.participationArray;
        program['notParticipation'] = this.notParticipation;
        program['disableNot'] = false;
        program['disableOthers'] = false;
      });
      this.programs = programs;
      this.programs.sort(UtilsService.comparisonFunction);
    });
  }

  public submitQuery() {
    const partner = this.partnerSelected === undefined ? 'NA' : this.partnerSelected; // NA is the way to say exclude this from query
    console.log(this.programControl.value);
    const program = (this.programControl.value === undefined || this.programControl.value === null) ? 'NA' :
      this.programControl.value.map(controlObject => {
        // Program control value should be the programName:pariticpation, so take that from the object for each value
        return controlObject.program.Name + ':' + controlObject.participation.backendValue;
      }).join(',');
    const semester = this.semesterSelected === undefined ? 'NA' : this.semesterSelected;
    const yearStart = (<HTMLInputElement>document.querySelector('#yearStart')).value;
    const yearEnd = (<HTMLInputElement>document.querySelector('#yearEnd')).value;
    const object = {
      partner: partner,
      program: program,
      semester: semester,
      yearStart: yearStart,
      yearEnd: yearEnd
    };

    this.router.navigate(['studentResults', object]);
  }

  public combineProgram(value, program) {
    return {
      program: program,
      participation: value
    };
  }
  // This doesnt work and isnt super necessary
  // public doSomething(event: MatSelectChange) {
  //   console.log(event.source.selected);
  //   this.programs.forEach((program) => {
  //     program['disableOther'] = false;
  //     program['disableNot'] = false;
  //   });
  //   event.value.forEach(chosen => {
  //     if (chosen.participation.backendValue === 'Not Applied') {
  //       chosen.program.disableOthers = true;
  //     } else {
  //       chosen.program.disableNot = true;
  //     }
  //   });
  // }
}
