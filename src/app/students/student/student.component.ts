import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { StudentService } from './student.service';

import { PartnersService } from '../../partners/partners.service';

import { ProgramsService } from '../../programs/programs.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  private id;
  private sub;
  private student: Object;

  public partners: Array<Object> = [
    {
      name: "Test Partner 1"
    },
    {
      name: "Test Partner 2"
    }
  ];

  public programs: Array<Object> = [
    {
      name: "Test Program 1",
      projects: [{"name": "Test Project 1"}, {"name" : "Test Project 2"}]
    },
    {
      name: "Test Program 2",
      projects: [{"name": "Test Project 3"}]
    }
  ];

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
    private studentService: StudentService,
    private partnersService: PartnersService,
    private programsService: ProgramsService
  ) { }

  ngOnInit() {
    // Initalize Inputs
    this.nameInput = document.getElementById("studentNameInput");
    this.emailInput = document.getElementById("emailInput");
    this.gradYearInput = document.getElementById("gradYearInput");
    this.firstMajorInput = document.getElementById("firstMajorInput");
    this.secondMajorInput = document.getElementById("secondMajorInput");
    this.minorInput = document.getElementById("minorInput");
    this.schoolInput = document.getElementById("schoolInput");

    this.sub = this.route.params.subscribe(params => {
       this.id = params['id'];
       console.log(this.id)

       //Get the specific student info from the database
       var studentPromise = this.studentService.getStudentPromise(this.id);
       studentPromise.then((student) => {
         this.student = student;
         console.log("Student: " + JSON.stringify(student));
       });
       var partnersPromise = this.partnersService.getPartnersPromiseForStudent(this.id);
       partnersPromise.then((partners) => {
         this.partners = partners;
       })

       this.programsService.getProgramViewsPromiseForStudentParticipation(this.id, "participated").then(programViews => {
         console.log("Program Views: " + JSON.stringify(programViews))
         this.programsParticipated = programViews;
       });

       this.programsService.getProgramViewsPromiseForStudentParticipation(this.id, "applied").then(programViews => {
         console.log("Program Views: " + JSON.stringify(programViews))
         this.programsApplied = programViews;
       });

       this.programsService.getProgramViewsPromiseForStudentParticipation(this.id, "rejected").then(programViews => {
         console.log("Program Views: " + JSON.stringify(programViews))
         this.programsRejected = programViews;
       });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public makeNote() {
    const date = new Date(Date.now());
    const content = (<HTMLInputElement>document.getElementById("notes")).value;

    const newNote = {
      note: content,
      date: date
    }

    const notePromise = this.studentService.addNote(this.id, newNote);

    notePromise.then((newStudent) => {
      this.student = newStudent
    })
  }

  public updateFields() {
    //Retrieve values
    const name = this.nameInput.value;
    const email = this.emailInput.value;
    //TODO: confirm that the grad year is an integer
    const gradYear = this.gradYearInput.value;
    const firstMajor = this.firstMajorInput.value;
    const secondMajor = this.secondMajorInput.value;
    const minor = this.minorInput.value;
    const school = this.schoolInput.value;

    const updateObject = {
      name: name,
      email: email,
      gradYear: gradYear,
      majorOne: firstMajor,
      majorTwo: secondMajor,
      minor: minor,
      school: school
    }

    //Make sure only validated fields go through
    //TODO: how to print out failures in validation?
    const validatedObject = this.studentService.validateFields(updateObject)

    //Call update object function
    const updatedStudentPromise = this.studentService.update(this.id, validatedObject);

    updatedStudentPromise.then(newStudent => {
      console.log("New Student: " + JSON.stringify(newStudent))
      for(var key in newStudent) {
        var value = newStudent[key]
        if(value !== "") {
          this.student[key] = value;
        }
      }
      // this.student = newStudent;
    })
  }

}
