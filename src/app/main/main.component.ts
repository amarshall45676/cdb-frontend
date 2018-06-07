import { Component, OnInit } from '@angular/core';

import {ProgramsService} from '../programs/programs.service';

import {BackendService} from '../backend/backend.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css', '../app.component.css']
})
export class MainComponent implements OnInit {
  public programs;

  constructor(
    private programsService: ProgramsService,
    private backendService: BackendService
  ) { }

  private comparisonFunction(programA, programB) {
    if (programA["name"] < programB["name"]) {
      return -1;
    }
    else if (programA["name"] == programB["name"]) {
      return 0;
    } else {
      return 1;
    }
  }

  ngOnInit() {
    this.programsService.getProgramsPromise().then((programs) => {
      this.programs = programs.sort(this.comparisonFunction);
    })
  }

  public viewProgram(programName) {
    console.log("Want to view: " + programName)
    //TODO: call the service method
    this.programsService.viewProfile(programName);
  }
}
