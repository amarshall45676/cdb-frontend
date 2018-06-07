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
  private id;
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
    private programService: ProgramService,
    private studentsService: StudentsService,
    private partnersService: PartnersService
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = params['id'];

       //Get the specific program info from the database
       var programPromise = this.programService.getProgramPromise(this.id);
       programPromise.then((program) => {
         this.program = program;
       });

       // var evalsPromise = this.programService.getEvalsPromise(this.id);
       // evalsPromise.then((evals) => {
       //   this.evals = evals;
       // });

       var studentsPromise = this.studentsService.getStudentsPromiseForProgram(this.id)
       studentsPromise.then((students) => {
         // console.log("Students: " + JSON.stringify(students))
         this.students = students;
       })

       var partnersPromise = this.partnersService.getPartnersPromiseForProgram(this.id)
       partnersPromise.then((partners) => {
         // console.log("Partners: " + JSON.stringify(partners))
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

//TODO: refactor this code to use profile resusable component
  public makeNote() {
    const author = "arm6"
    const date = new Date(Date.now());
    const content = (<HTMLInputElement>document.getElementById("notes")).value;

    console.log("Stuff read is: " + content);
    console.log("Date is: " + date);
    console.log("Author is: " + author);

    const newNote = {
      author: author,
      content: content,
      date: date
    }

    console.log(JSON.stringify(newNote))
    this.notes.push(newNote);//TODO: add in backend
  }

}
