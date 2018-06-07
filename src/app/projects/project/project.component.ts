import { Component, OnInit, Inject, ViewEncapsulation} from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { ProjectsService } from '../projects.service';

import { ProjectService } from './project.service';

import { StudentsService } from '../../students/students.service';

import { PartnersService } from '../../partners/partners.service';

import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css', '../../app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProjectComponent implements OnInit {
  private project: Object;

  public partners:Array<Object>;
  public students:Array<Object>;

  // public evals : Array<Object>;

  // public affiliates:Array<Object> = [
  //   {
  //     name: "Test Affiliate 1"
  //   },
  //   {
  //     name: "Test Affiliate 2"
  //   }
  // ];

  public projectService: ProjectService;

  private nameInput;
  private programInput;
  private yearInput;
  private semesterInput;

  constructor(
    private route: ActivatedRoute,
    projectService: ProjectService,
    private studentsService: StudentsService,
    private partnersService: PartnersService,
    @Inject(MAT_DIALOG_DATA) public id: string
    ) {
      this.projectService = projectService; // Not public because sharing with child
     }

  ngOnInit() {
    this.nameInput = document.getElementById("nameInput");
    this.programInput = document.getElementById("programInput");
    this.yearInput = document.getElementById("yearInput");
    this.semesterInput = document.getElementById("semesterInput");
    //TODO: can take this out?
    //Get the specific program info from the database
    //TODO: best way to use these in profile?

    var studentsPromise = this.studentsService.getStudentsPromiseForProject(this.id);
    studentsPromise.then((students) => {
     // console.log("Students: " + JSON.stringify(students))
      this.students = students;
    });

    var partnersPromise = this.partnersService.getPartnersPromiseForProject(this.id);
    partnersPromise.then((partners) => {
     this.partners = partners;
    });
      //
      // var affiliatesPromise = this.projectsService.getProjectAffiliatesPromise(this.id);
      // affiliatesPromise.then((affiliates) => {
      //   this.affiliates = affiliates;
      // });
  }
}
