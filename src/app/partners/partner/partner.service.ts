import { Injectable } from '@angular/core';

import { BackendService } from '../../backend/backend.service';

import { ProfileService } from '../../reuseable-components/profile/profile.service';

@Injectable()
export class PartnerService extends ProfileService {

  constructor(pBackendService: BackendService) {
    super(pBackendService, 'partner');
   }

  // Make sure fields match a pattern, if they dont print a message and take out of result
  public validateFields(updateObject) {
    console.log('Update fields are confirmed');
    // TODO: implement. Do nothing for now.
    return updateObject;
  }

}
