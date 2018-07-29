import { Component, OnInit, ViewChild } from '@angular/core';

import { ProjectsService } from './projects.service';
import { ProgramsService } from '../programs/programs.service';
import { PartnersService } from '../partners/partners.service';
import { BackendService } from '../backend/backend.service';
import { UtilsService } from '../utils/utils.service';

import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css', '../app.component.css']
})
export class ProjectsComponent implements OnInit {
  public emptyQuery= '#/projectResults';

  public startYear = UtilsService.getEarliestYear();
  public endYear = UtilsService.getCurrentYear();

  public programs: Array<Object>;
  public programSelected: string;

  public partners: Array<Object>;
  public partnerSelected: string;

  public semesters: Array<Object> = [
    {'name' : 'Fall'},
    {'name' : 'Spring'},
    {'name' : 'Summer'}
  ];
  public semesterSelected: string;

  constructor(
    private programsService: ProgramsService,
    private partnersService: PartnersService,
    private router: Router) {}

  ngOnInit() {
    this.programsService.getProgramsPromise().then((programs) => {
      this.programs = programs;
      this.programs.sort(UtilsService.comparisonFunction);
    });

    this.partnersService.getPartnersPromise().then(partners => {
      this.partners = partners;
      this.partners.sort(UtilsService.comparisonFunction);
    });
  }

  public submitQuery() {
    const program = this.programSelected === undefined ? 'NA' : this.programSelected; // NA is the way to say exclude this from query
    const partner = this.partnerSelected === undefined ? 'NA' : this.partnerSelected;
    const semester = this.semesterSelected === undefined ? 'NA' : this.semesterSelected;
    const yearStart = (<HTMLInputElement>document.querySelector('#yearStart')).value;
    const yearEnd = (<HTMLInputElement>document.querySelector('#yearEnd')).value;
    const object = {
      program: program,
      partner: partner,
      semester: semester,
      yearStart: yearStart,
      yearEnd: yearEnd
    };

    this.router.navigate(['projectResults', object]);
  }
}
