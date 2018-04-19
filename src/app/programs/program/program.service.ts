import { Injectable } from '@angular/core';

import { BackendService } from '../../backend/backend.service'

@Injectable()
export class ProgramService {
  private backendService : BackendService;

  constructor(pBackendService : BackendService) {
    this.backendService = pBackendService;
   }

  public getProgramPromise(programName) {
   return this.backendService.resource("GET", "program/" + programName, null);
  }

  public getEvalsPromise(programName) {
    return this.backendService.resource("GET", "program/evaluations/" + programName, null);
  }

  public getNumStudents(programName) {
    return this.backendService.resource("GET", "program/numStudents/" + programName, null);
  }

  public getNumPartners(programName) {
    return this.backendService.resource("GET", "program/numPartners/" + programName, null);
  }

  public getPercentStudents(programName) {
    return this.backendService.resource("GET", "program/percentStudents/" + programName, null);
  }

  public getPercentStudentsDidAnother(programName) {
    return this.backendService.resource("GET", "program/percentStudentsDidAnother/" + programName, null);
  }

  public getPercentAcceptance(programName) {
    return this.backendService.resource("GET", "program/percentAcceptance/" + programName, null);
  }

}
