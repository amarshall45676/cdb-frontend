import { Injectable } from '@angular/core';

import { BackendService } from '../../backend/backend.service';

import { ProfileService } from '../../reuseable-components/profile/profile.service';

@Injectable()
export class StudentService extends ProfileService {

  constructor(pBackendService: BackendService) {
    super(pBackendService, 'student');
  }

  // Make sure fields match a pattern, if they dont print a message and take out of result
  public validateFields(updateObject) {
    // console.log('Update fields')
    // var newObject = {}
    // //TODO: implement. Do nothing for now.
    // for(var key in updateObject) {
    //   const value = updateObject[key];
    //   if (value !== '') {
    //     newObject[key] = value;
    //   }
    // }
    // return newObject;
    return updateObject;
  }


}
