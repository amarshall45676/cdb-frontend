import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { PartnerService } from './partner.service';

import { StudentsService } from '../../students/students.service';

import { ProgramsService } from '../../programs/programs.service';

import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.css', '../../app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PartnerComponent implements OnInit {
  //TODO: on close of dialog should refresh id?(How to only refresh one partner entry?)
    //Might be better to just update the entry in the table, not send a full request

  public partner: Object;

  public programs: Array<Object>;

  public students: Array<Object>;

  public displayMapping = {
    addressLine1 : "NA",
    addressLine2 : "NA",
    phone: "NA",
    socialIssues : "NA",
    url: "NA"
  }

  private nameInput;
  private cityInput;
  private stateInput;
  private zipcodeInput;

  constructor(private route: ActivatedRoute,
    public partnerService: PartnerService,
    private studentsService: StudentsService,
    private programsService: ProgramsService,
    @Inject(MAT_DIALOG_DATA) public id: string)
  {
  } //TODO: rename this id to be partnerName

  ngOnInit() {
    // Initalize Inputs
    this.nameInput = document.getElementById("nameInput");
    this.cityInput = document.getElementById("cityInput");
    this.stateInput = document.getElementById("stateInput");
    this.zipcodeInput = document.getElementById("zipcodeInput");

    //Get the specific program info from the idbase
    var partnerPromise = this.partnerService.getPartnerPromise(this.id);
    partnerPromise.then((partner) => {
     this.partner = partner;
    });

    var studentsPromise = this.studentsService.getStudentsPromiseForPartner(this.id);
    studentsPromise.then((students) => {
     this.students = students;
    });

    this.programsService.getProgramViewsPromiseForPartner(this.id).then(programViews => {
      this.programs = programViews;
    });
  }
}
