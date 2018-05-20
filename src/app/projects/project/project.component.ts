import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { ProjectsService } from '../projects.service';

import { ProjectService } from './project.service';

import { StudentsService } from '../../students/students.service';

import { PartnersService } from '../../partners/partners.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css', '../../app.component.css']
})
export class ProjectComponent implements OnInit {
  private id;
  private sub;
  public project: Object;
  public evals : Array<Object>;

  //TODO: need to fill with the project profile info wanted

  public partners:Array<Object> = [
    {
      name: "Test Partner 1"
    },
    {
      name: "Test Partner 2"
    }
  ];

  public affiliates:Array<Object> = [
    {
      name: "Test Affiliate 1"
    },
    {
      name: "Test Affiliate 2"
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

  private nameInput;
  private programInput;
  private yearInput;
  private semesterInput;

  constructor(
    private route: ActivatedRoute,
    private projectsService: ProjectsService,
    private projectService: ProjectService,
    private studentsService: StudentsService,
    private partnersService: PartnersService
    ) { }

  ngOnInit() {
    this.nameInput = document.getElementById("nameInput");
    this.programInput = document.getElementById("programInput");
    this.yearInput = document.getElementById("yearInput");
    this.semesterInput = document.getElementById("semesterInput");

    this.sub = this.route.params.subscribe(params => {

       this.id = params['id'];
       //Get the specific program info from the database
       var projectPromise = this.projectsService.getProjectPromise(this.id);
       projectPromise.then((project) => {
         console.log("Project is: " + JSON.stringify(project))
         this.project = project;
       });

       var studentsPromise = this.studentsService.getStudentsPromiseForProject(this.id);
       studentsPromise.then((students) => {
         console.log("Students: " + JSON.stringify(students))
         this.students = students;
       });

       var partnersPromise = this.partnersService.getPartnersPromiseForProject(this.id);
       partnersPromise.then((partners) => {
         this.partners = partners;
       });

       var affiliatesPromise = this.projectsService.getProjectAffiliatesPromise(this.id);
       affiliatesPromise.then((affiliates) => {
         this.affiliates = affiliates;
       });
    });
  }

  public makeNote() {
  const date = new Date(Date.now());
  const content = (<HTMLInputElement>document.getElementById("notes")).value;

  const newNote = {
    note: content,
    date: date
  }

  const notePromise = this.projectService.addNote(this.id, newNote);

  notePromise.then((newProject) => {
    this.project = newProject;
  })
}

  public updateFields() {
    //Retrieve values
    const name = this.nameInput.value;
    const program = this.programInput.value;
    const semester = this.semesterInput.value;
    const year = this.yearInput.value;

    //Put in an object
    const updateObject = {
      name: name,
      program: program,
      year: year,
      semester: semester
    }
    //Make sure only validated fields go through
    //TODO: how to print out failures in validation?
    const validatedObject = this.projectService.validateFields(updateObject)

    //Call update object function
    const updatedProjectPromise = this.projectService.update(this.id, validatedObject); //TODO: can change this.id
    //TODO: change this!
    updatedProjectPromise.then(newProject => {
      console.log("New Project: " + JSON.stringify(newProject))
      this.project = newProject;
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
