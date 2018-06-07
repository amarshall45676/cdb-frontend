import { Injectable } from '@angular/core';

import { BackendService } from '../backend/backend.service'

import {PartnerComponent} from './partner/partner.component';

import { MatDialog, MatDialogRef} from '@angular/material';

@Injectable()
export class PartnersService {
  private partnersPromise: Promise<Array<Object>>;

  private backendService : BackendService;

  constructor(
    pBackendService : BackendService,
    public dialog: MatDialog)
   {
    this.backendService = pBackendService;
   }

  public getPartnersPromise() {
   return this.backendService.resource("GET", "partner/", null);
  }


  public getPartnersPromiseForProject(projectName) {
    return this.backendService.resource("GET", "partner/project/" + projectName, null);
  }

  public getPartnersPromiseForStudent(studentName) {
    return this.backendService.resource("GET", "partner/student/" + studentName, null);
  }

  public getPartnersPromiseForProgram(programName) {
    return this.backendService.resource("GET", "partner/program/" + programName, null);
  }

}
