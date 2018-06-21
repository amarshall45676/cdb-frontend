import { Injectable } from '@angular/core';

import { BackendService } from '../backend/backend.service';

@Injectable()
export class PartnersService {
  private backendService: BackendService;

  constructor(
    pBackendService: BackendService) {
    this.backendService = pBackendService;
   }

  public getPartnersPromise() {
   return this.backendService.resource('GET', 'partner/', null);
  }


  public getPartnersPromiseForProject(projectName) {
    return this.backendService.resource('GET', `partner/project/${projectName}`, null);
  }

  public getPartnersPromiseForStudent(studentName) {
    return this.backendService.resource('GET', `partner/student/${studentName}`, null);
  }

  public getPartnersPromiseForProgram(programName) {
    return this.backendService.resource('GET', `partner/program/${programName}`, null);
  }

}
