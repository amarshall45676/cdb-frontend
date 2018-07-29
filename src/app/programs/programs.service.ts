import { Injectable } from '@angular/core';

import { BackendService } from '../backend/backend.service';
import {Router} from '@angular/router';

@Injectable()
export class ProgramsService {

  constructor(private router: Router, private backendService: BackendService) {
   }

   public getProgramViewsPromiseForStudent(studentName) {
    return this.backendService.resource('GET', `program/student/${studentName}`, null);
   }

   public getProgramViewsPromiseForStudentParticipation(studentName, participation) {
    return this.backendService.resource('GET', `program/student/${studentName}/${participation}`, null);
   }

   public getProgramViewsPromiseForPartner(partnerName) {
    return this.backendService.resource('GET', `program/partner/${partnerName}`, null);
   }

  public getProgramsPromise() {
   return this.backendService.resource('GET', `program/`, null);
  }

  public viewProfile(id) {
    const object = {
      id: id
    };
    this.router.navigate(['program', object]);
    // console.log('View profile for program with ID: ' + id);
    // window.location.href = `#/program/${id}`;
  }

}
