import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { StudentService } from './student.service';

import { PartnersService } from '../../partners/partners.service';

import { ProgramsService } from '../../programs/programs.service';

import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css', '../../app.component.css']
})
export class StudentComponent implements OnInit {
  private student: Object;

  displayMapping = {
    major_one: "1st Major",
    major_two: "2nd Major",
    grad_year: "Graduation Year"
  } // Map object display to display on frontend

  public studentService

  public partners: Array<Object>;

  public programs: Array<Object>;

  public programsApplied: Array<Object>;
  public programsRejected: Array<Object>;
  public programsParticipated: Array<Object>;
  //Inputs
  private nameInput;
  private emailInput;
  private gradYearInput;
  private firstMajorInput;
  private secondMajorInput;
  private minorInput;
  private schoolInput;

  constructor(
    private route: ActivatedRoute,
    studentService: StudentService,
    private partnersService: PartnersService,
    private programsService: ProgramsService,
    @Inject(MAT_DIALOG_DATA) public id: string
  ) {
    this.studentService = studentService;
  }

  ngOnInit() {
    // Initalize Inputs
    this.nameInput = document.getElementById("studentNameInput");
    this.emailInput = document.getElementById("emailInput");
    this.gradYearInput = document.getElementById("gradYearInput");
    this.firstMajorInput = document.getElementById("firstMajorInput");
    this.secondMajorInput = document.getElementById("secondMajorInput");
    this.minorInput = document.getElementById("minorInput");
    this.schoolInput = document.getElementById("schoolInput");

    var partnersPromise = this.partnersService.getPartnersPromiseForStudent(this.id);
    partnersPromise.then((partners) => {
      this.partners = partners;
    })

    this.programsService.getProgramViewsPromiseForStudentParticipation(this.id, "participated").then(programViews => {
      this.programsParticipated = programViews;
    });

    this.programsService.getProgramViewsPromiseForStudentParticipation(this.id, "applied").then(programViews => {
      this.programsApplied = programViews;
    });

    this.programsService.getProgramViewsPromiseForStudentParticipation(this.id, "rejected").then(programViews => {
      this.programsRejected = programViews;
    });
  }
}
