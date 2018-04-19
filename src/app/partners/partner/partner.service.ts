import { Injectable } from '@angular/core';

import { BackendService } from '../../backend/backend.service'

@Injectable()
export class PartnerService {
  private backendService : BackendService;

  constructor(pBackendService : BackendService) {
    this.backendService = pBackendService;
   }

  public getPartnerPromise(partnerName) {
   return this.backendService.resource("GET", "partner/" + partnerName, null);
  }

  public addNote(partnerName, newNote) {
    return this.backendService.resource("PUT", "partner/note/" + partnerName, newNote);
  }

  //Make sure fields match a pattern, if they dont print a message and take out of result
  public validateFields(updateObject) {
    console.log("Update fields are confirmed")
    //TODO: implement. Do nothing for now.
    return updateObject
  }

  public update(id, updateObject) {
    console.log("Calling update project with object: " + JSON.stringify(updateObject));
    return this.backendService.updateEntity("partner", id, updateObject);
  }

}
