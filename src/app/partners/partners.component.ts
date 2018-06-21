import { Component, OnInit, ViewChild } from '@angular/core';

import { ProgramsService } from '../programs/programs.service';

import { BackendService } from '../backend/backend.service';

import { UtilsService } from '../utils/utils.service';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.css', '../app.component.css']
})
export class PartnersComponent implements OnInit {
  public emptyQuery = '#/partnerResults';
  // TODO: make these change over time based off of data, and also the current year
  public startYear = 2012;
  public endYear = 2018;

  public types: Array<Object> = [
    {'name' : 'Act'},
    {'name' : 'Learn'},
    {'name' : 'Create Change'}
  ];
  public typeSelected: string;

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

  public programs: Array<Object>; // programs for the query

  public programSelected: string;

  constructor(
     private programsService: ProgramsService,
     private backendService: BackendService) {}

  ngOnInit() {
    console.log('Init for partner component');

    this.programsService.getProgramsPromise().then(programs => {
      this.programs = programs;
      this.programs.sort(UtilsService.comparisonFunction);
    });
  }

  public submitQuery() {
    const program = this.programSelected === undefined ? 'NA' : this.programSelected; // NA is the way to say exclude this from query
    const socialIssue = this.issueSelected === undefined ? 'NA' : this.issueSelected;
    const type = this.typeSelected === undefined ? 'NA' : this.typeSelected;
    const semester = this.semesterSelected === undefined ? 'NA' : this.semesterSelected;
    const yearStart = (<HTMLInputElement>document.querySelector('#yearStart')).value;
    const yearEnd = (<HTMLInputElement>document.querySelector('#yearEnd')).value;

    window.location.href = `#/partnerResults/${program}/${socialIssue}/${type}/${semester}/${yearStart}/${yearEnd}`;
  }
}
