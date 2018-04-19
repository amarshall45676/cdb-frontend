import { Injectable } from '@angular/core';

import { BackendService } from '../backend/backend.service'

@Injectable()
export class ProgramsService {
  private programsPromise: Promise<Array<Object>>;

  private backendService : BackendService;

  constructor(pBackendService : BackendService) {
    this.backendService = pBackendService;
   }

   //TODO: want to cache this request? will make 1 request then save result for other calls

   public getProgramViewsPromiseForStudent(studentName) {
    return this.backendService.resource("GET", "program/student/" + studentName, null);
   }

   public getProgramViewsPromiseForStudentParticipation(studentName, participation) {
    return this.backendService.resource("GET", "program/student/" + studentName + "/" + participation, null);
   }

   public getProgramViewsPromiseForPartner(partnerName) {
    return this.backendService.resource("GET", "program/partner/" + partnerName, null);
   }

  public getProgramsPromise() {
   return this.backendService.resource("GET", "program/", null);
  }

  public viewProfile(id) {
    console.log("View profile for program with ID: " + id);
    window.location.href = "program/" + id;
  }

}
