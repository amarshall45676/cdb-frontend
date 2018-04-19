import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { ProgramService } from './program.service';

import { StudentsService } from '../../students/students.service';

import { PartnersService } from '../../partners/partners.service';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css']
})
export class ProgramComponent implements OnInit {
  private id;
  private sub;

  private numStudents;
  private numPartners;
  private percentStudents;
  private percentStudentsDidAnother;
  private percentAcceptance;

  public notes:Array<Object> = [
    // {
    //   content: "stuff 1",
    //   author : "arm6",
    //   date: "test"
    // },
    // {
    //   content: "stuff 2",
    //   author : "arm6",
    //   date: "test"
    // }
  ];
  public program: Object;
  public evals : Array<Object>;

  public partners:Array<Object> = [
    {
      name: "Test Partner 1"
    },
    {
      name: "Test Partner 2"
    }
  ];

  public students:Array<Object> = [
    {
      name: "Test Student 1"
    },
    {
      name: "Test Student 2"
    }
  ];

  public programs:Array<Object> = [
    {
      name: "Test Program 1",
      projects : [
        {name: "Test Project 1"}
      ]
    },
    {
      name: "Test Program 2",
      projects : [
        {name: "Test Project 2"},
        {name: "Test Project 3"}
      ]
    }
  ];

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
         console.log("Students: " + JSON.stringify(students))
         this.students = students;
       })

       var partnersPromise = this.partnersService.getPartnersPromiseForProgram(this.id)
       partnersPromise.then((partners) => {
         console.log("Partners: " + JSON.stringify(partners))
         this.partners = partners;
       })

       this.programService.getNumStudents(this.id).then((answer) => {
         this.numStudents = answer;
       })

       this.programService.getNumPartners(this.id).then((answer) => {
         this.numPartners = answer;
       })

       this.programService.getPercentStudents(this.id).then((answer) => {
         this.percentStudents = answer;
       })

       this.programService.getPercentStudentsDidAnother(this.id).then((answer) => {
         this.percentStudentsDidAnother = answer;
       })

       this.programService.getPercentAcceptance(this.id).then((answer) => {
         this.percentAcceptance = answer;
       })
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

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
