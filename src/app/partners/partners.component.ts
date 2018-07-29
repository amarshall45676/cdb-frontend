import { Component, OnInit, ViewChild } from '@angular/core';

import { ProgramsService } from '../programs/programs.service';

import { BackendService } from '../backend/backend.service';

import { UtilsService } from '../utils/utils.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.css', '../app.component.css']
})
export class PartnersComponent implements OnInit {
  public emptyQuery = '#/partnerResults';

  public startYear = UtilsService.getEarliestYear();
  public endYear = UtilsService.getCurrentYear();

  public types: Array<Object> = [
    {'name' : 'Act'},
    {'name' : 'Learn'},
    {'name' : 'Create Change'}
  ];
  public typeSelected: string;

  public semesters: Array<Object> = [
    {'name' : 'Fall'},
    {'name' : 'Spring'},
    {'name' : 'Summer'}
    // ,{'name' : 'Full Year'}
  ];
  public semesterSelected: string;

  public programs: Array<Object>; // programs for the query

  public programSelected: string;

  constructor(
     private programsService: ProgramsService,
     private router: Router) {}

  ngOnInit() {
    this.programsService.getProgramsPromise().then(programs => {
      this.programs = programs;
      this.programs.sort(UtilsService.comparisonFunction);
    });
  }

  public submitQuery() {
    // NA is the way to say exclude this from query
    const program = this.programSelected === undefined ? 'NA' : this.programSelected;
    const type = this.typeSelected === undefined ? 'NA' : this.typeSelected;
    const semester = this.semesterSelected === undefined ? 'NA' : this.semesterSelected;
    const yearStart = (<HTMLInputElement>document.querySelector('#yearStart')).value;
    const yearEnd = (<HTMLInputElement>document.querySelector('#yearEnd')).value;
    const object = {
      program: program,
      type: type,
      semester: semester,
      yearStart: yearStart,
      yearEnd: yearEnd
    };

    this.router.navigate(['partnerResults', object]);
  }
}
