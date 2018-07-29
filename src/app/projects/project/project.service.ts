import { Injectable } from '@angular/core';

import { BackendService } from '../../backend/backend.service';

import { ProfileService } from '../../reuseable-components/profile/profile.service';

// This class is for dealing with the profile for a certain project

@Injectable()
export class ProjectService extends ProfileService {

  constructor(backendService: BackendService) {
    super(backendService, 'project');
   }

   // Make sure fields match a pattern, if they dont print a message and take out of result
   public validateFields(updateObject) {
     const errors = [];
     return errors;
   }

}
