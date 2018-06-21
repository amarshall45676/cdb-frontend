import { Component, OnInit } from '@angular/core';

import {ProgramsService} from '../programs/programs.service';

import {BackendService} from '../backend/backend.service';

import { UtilsService } from '../utils/utils.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css', '../app.component.css']
})
export class MainComponent implements OnInit {
  public programs;

  constructor(
    private programsService: ProgramsService,
    private backendService: BackendService,
  ) { }

  ngOnInit() {
    this.programsService.getProgramsPromise().then((programs) => {
      this.programs = programs.sort(UtilsService.comparisonFunction);
    });
  }

  public viewProgram(programName) {
    console.log('Want to view: ' + programName);
    this.programsService.viewProfile(programName);
  }
}
