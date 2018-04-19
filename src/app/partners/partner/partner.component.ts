import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { PartnerService } from './partner.service';

import { StudentsService } from '../../students/students.service';

import { ProgramsService } from '../../programs/programs.service';

import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PartnerComponent implements OnInit {
  private sub;
  public partner: Object;

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

  public students: Array<Object> = [
    {
      name: "Student 1"
    },
    {
      name: "Student 2"
    }
  ];

  private nameInput;

  constructor(private route: ActivatedRoute,
     private partnerService: PartnerService,
     private studentsService: StudentsService,
     private programsService: ProgramsService,
      @Inject(MAT_DIALOG_DATA) public data: string) { } //TODO: rename this data to be partnerName

  ngOnInit() {
    // Initalize Inputs
    this.nameInput = document.getElementById("nameInput");

    //Get the specific program info from the database
    var partnerPromise = this.partnerService.getPartnerPromise(this.data);
    partnerPromise.then((partner) => {
     this.partner = partner;
    });

    var studentsPromise = this.studentsService.getStudentsPromiseForPartner(this.data);
    studentsPromise.then((students) => {
     this.students = students;
    });

    this.programsService.getProgramViewsPromiseForPartner(this.data).then(programViews => {
      this.programs = programViews;
    });
  }
  //TODO: should have the different on close abilities if there is something that should happen on close

  public makeNote() {
    const date = new Date(Date.now());
    const content = (<HTMLInputElement>document.getElementById("notes")).value;

    const newNote = {
      note: content,
      date: date
    }

    const notePromise = this.partnerService.addNote(this.data, newNote);

    notePromise.then((newPartner) => {
      this.partner = newPartner
    })
  }

  public updateFields() {
    //Retrieve values
    const name = this.nameInput.value;

    //Put in an object
    const updateObject = {
      name: name
    }
    //Make sure only validated fields go through
    //TODO: how to print out failures in validation?
    const validatedObject = this.partnerService.validateFields(updateObject)

    //Call update object function
    const updatedPartnerPromise = this.partnerService.update(this.data, validatedObject);
    //TODO: change this!
    updatedPartnerPromise.then(newPartner => {
      this.partner = newPartner;
    })
  }

}
