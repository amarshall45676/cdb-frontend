import { Component, OnInit, Inject, ViewEncapsulation} from '@angular/core';

import { ProjectService } from './project.service';
import { StudentsService } from '../../students/students.service';
import { PartnersService } from '../../partners/partners.service';
import { UtilsService } from '../../utils/utils.service';

import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css', '../../app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProjectComponent implements OnInit {
  public partners: Array<Object>;
  public students: Array<Object>;

  public projectService: ProjectService;

  constructor(projectService: ProjectService,
    private studentsService: StudentsService,
    private partnersService: PartnersService,
    private dialogRef: MatDialogRef<ProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public id: string) {
      this.projectService = projectService; // Not public because sharing with child
     }

  ngOnInit() {
    this.studentsService.getStudentsPromiseForProject(this.id).then((students) => {
      this.students = students;
      this.students.sort(UtilsService.comparisonFunction);
    });

     this.partnersService.getPartnersPromiseForProject(this.id).then((partners) => {
     this.partners = partners;
     this.partners.sort(UtilsService.comparisonFunction);
    });
  }
}
