import { Injectable } from '@angular/core';

import { BackendService } from '../../backend/backend.service';

import { ProfileService } from '../../reuseable-components/profile/profile.service';
import {UtilsService} from '../../utils/utils.service';
import {Program} from '../../reuseable-components/profile/entities/program';

@Injectable()
export class ProgramService extends ProfileService {

  constructor(pBackendService: BackendService) {
    super(pBackendService, 'program');
    this.backendService = pBackendService;
   }

  public getProgramPromise(programName): Promise<void | Program> {
   return this.backendService.resource('GET', `program/${programName}`, null)
     .then(object => {
     return Program.fromObject(object);
   }).catch((error) => {
       window.alert('This program doesn\'t exists. This will redirect to the main page and you can pick the program from there.');
       window.location.href = '#/main';
     });
  }

  public validateFields(updateObjects) {
    const errors = [];
    return errors;
  }

  public getEvalsPromise(programName) {
    return this.backendService.resource('GET', `program/evaluations/${programName}`, null);
  }

}
