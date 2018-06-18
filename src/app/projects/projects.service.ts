import { Injectable } from '@angular/core';

import { BackendService } from '../backend/backend.service'

import {ProjectComponent} from './project/project.component';

import { MatDialog, MatDialogRef} from '@angular/material';

//Interacts with the ProjectResource class on the backend

@Injectable()
export class ProjectsService {
  private programsPromise: Promise<Array<Object>>;

  private backendService : BackendService;

  constructor(pBackendService : BackendService, public dialog: MatDialog) {
    this.backendService = pBackendService;
   }

  public getProgramsPromise() {
   return this.backendService.resource("GET", "program/", null);
  }

  public getProjectsWithStudentPromise(partnerName) {
    return this.backendService.resource(
      "GET", "project/partner/" + partnerName + "/withStudents", null);
  }

  public getProjectAffiliatesPromise(projectName) {
   return this.backendService.resource(
     "GET", "program/project/" + projectName + "/affiliates", null);
  }

  public getProjectPromise(projectName) {
    return this.backendService.resource("GET", "project/" + projectName, null);
  }
}
