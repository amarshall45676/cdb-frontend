import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { ProgramService } from './program.service';

import { StudentsService } from '../../students/students.service';

import { PartnersService } from '../../partners/partners.service';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css', '../../app.component.css']
})
export class ProgramComponent implements OnInit {
  public id;
  private sub;

  //TODO: should make these values added to a program object, calculated before hand
  public numStudents;
  public loadingNumStudents = true;

  public numPartners;
  public loadingNumPartners = true;

  public percentStudents;
  public loadingPercentStudents = true;

  public percentStudentsDidAnother;
  public loadingPercentStudentsDidAnother = true;

  public percentAcceptance;
  public loadingPercentAcceptance= true;

  public notes:Array<Object>;
  public program; //TODO: make a program type
  public evals : Array<Object>;

  public partners:Array<Object>;

  public students:Array<Object>;

  public programs:Array<Object>;

  constructor(
    private route: ActivatedRoute,
    public programService: ProgramService, //To give access to profile component
    private studentsService: StudentsService,
    private partnersService: PartnersService
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = params['id'];

       var studentsPromise = this.studentsService.getStudentsPromiseForProgram(this.id)
       studentsPromise.then((students) => {
         this.students = students;
       })

       var partnersPromise = this.partnersService.getPartnersPromiseForProgram(this.id)
       partnersPromise.then((partners) => {
         this.partners = partners;
       })

       this.programService.getNumStudents(this.id).then((answer) => {
         this.numStudents = answer
         this.loadingNumStudents = false;
       })

       this.programService.getNumPartners(this.id).then((answer) => {
         this.numPartners = answer
         this.loadingNumPartners = false;
       })

       this.programService.getPercentStudents(this.id).then((answer) => {
         this.percentStudents = answer.toString().substring(0, 5);
         this.loadingPercentStudents = false;
       })

       this.programService.getPercentStudentsDidAnother(this.id).then((answer) => {
         this.percentStudentsDidAnother = answer.toString().substring(0, 5);
         this.loadingPercentStudentsDidAnother = false;
       })

       this.programService.getPercentAcceptance(this.id).then((answer) => {
         this.percentAcceptance = answer.toString().substring(0, 5);
         this.loadingPercentAcceptance = false;
       })
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  //TODO: no resason to have this, should just use the reusable profile component
  public updateFields() {
    return "";
  }

}
