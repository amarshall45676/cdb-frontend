import { Injectable } from '@angular/core';

import { BackendService } from '../../backend/backend.service'

//This class is for dealing with the profile for a certain project

@Injectable()
export class ProjectService {

  private backendService : BackendService;

  constructor(pBackendService : BackendService) {
    this.backendService = pBackendService;
   }

   public addNote(projectName, newNote) {
     return this.backendService.resource("PUT", "project/note/" + projectName, newNote);
  }

   //Make sure fields match a pattern, if they dont print a message and take out of result
   public validateFields(updateObject) {
     console.log("Update fields are confirmed")
     //TODO: implement. Do nothing for now.
     return updateObject;
   }

   public update(id, updateObject) {
     console.log("Calling update with object: " + JSON.stringify(updateObject));
     return this.backendService.updateEntity("project", id, updateObject);
   }
}
