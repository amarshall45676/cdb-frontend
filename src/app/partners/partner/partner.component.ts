import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { PartnerService } from './partner.service';
import { StudentsService } from '../../students/students.service';
import { ProjectsService } from '../../projects/projects.service';
import { ProgramsService } from '../../programs/programs.service';
import { UtilsService } from '../../utils/utils.service';

import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.css', '../../app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PartnerComponent implements OnInit {
  //TODO: on close of dialog should refresh id?(How to only refresh one partner entry?)
    //Might be better to just update the entry in the table, not send a full request
  public programs: Array<Object>;
  public projects: Array<Object>;
  public students: Array<Object>;

  constructor(private route: ActivatedRoute,
    public partnerService: PartnerService,
    private studentsService: StudentsService,
    private projectsService: ProjectsService,
    private programsService: ProgramsService,
    private utilsService: UtilsService,
    @Inject(MAT_DIALOG_DATA) public id: string)
  {
  } //TODO: rename this id to be partnerName

  ngOnInit() {
    this.programsService.getProgramViewsPromiseForPartner(this.id).then(programViews => {
      console.log("Program Views: " + JSON.stringify(programViews))
      this.programs = programViews;
      this.programs.sort(this.utilsService.comparisonFunction2);
    });
  }
}
