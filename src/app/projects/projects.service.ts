import { Injectable } from '@angular/core';

import { BackendService } from '../backend/backend.service';

// Interacts with the ProjectResource class on the backend

@Injectable()
export class ProjectsService {
  private backendService: BackendService;

  constructor(pBackendService: BackendService) {
    this.backendService = pBackendService;
   }

  public getProgramsPromise() {
   return this.backendService.resource('GET', `program/`, null);
  }

  public getProjectsWithStudentPromise(partnerName) {
    return this.backendService.resource(
      'GET', `project/partner/${partnerName}/withStudents`, null);
  }

  public getProjectAffiliatesPromise(projectName) {
   return this.backendService.resource(
     'GET', `program/project/${projectName}/affiliates`, null);
  }

  public getProjectPromise(projectName) {
    return this.backendService.resource('GET', `project/${projectName}`, null);
  }
}
