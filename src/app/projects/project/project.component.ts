import { Component, OnInit, Inject, ViewEncapsulation} from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { ProjectsService } from '../projects.service';
import { ProjectService } from './project.service';
import { StudentsService } from '../../students/students.service';
import { PartnersService } from '../../partners/partners.service';
import { UtilsService } from '../../utils/utils.service';

import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css', '../../app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProjectComponent implements OnInit {
  public partners:Array<Object>;
  public students:Array<Object>;

  public projectService: ProjectService;

  constructor(
    private route: ActivatedRoute,
    projectService: ProjectService,
    private studentsService: StudentsService,
    private partnersService: PartnersService,
    private utilsService: UtilsService,
    @Inject(MAT_DIALOG_DATA) public id: string
    ) {
      this.projectService = projectService; // Not public because sharing with child
     }

  ngOnInit() {
    var studentsPromise = this.studentsService.getStudentsPromiseForProject(this.id);
    studentsPromise.then((students) => {
      this.students = students;
      this.students.sort(this.utilsService.comparisonFunction)
    });

    var partnersPromise = this.partnersService.getPartnersPromiseForProject(this.id);
    partnersPromise.then((partners) => {
     this.partners = partners;
     this.partners.sort(this.utilsService.comparisonFunction)
    });
  }
}
