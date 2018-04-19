import { Injectable } from '@angular/core';

import { BackendService } from '../../backend/backend.service';

@Injectable()
export class StudentService {
  private backendService : BackendService;

  constructor(pBackendService: BackendService) {
    this.backendService = pBackendService;
  }

  public getStudentPromise(studentName) {
    return this.backendService.resource("GET", "student/" + studentName, null);
  }

  public addNote(studentName, newNote) {
  return this.backendService.resource("PUT", "student/note/" + studentName, newNote);
}

  //Make sure fields match a pattern, if they dont print a message and take out of result
  public validateFields(updateObject) {
    // console.log("Update fields")
    // var newObject = {}
    // //TODO: implement. Do nothing for now.
    // for(var key in updateObject) {
    //   const value = updateObject[key];
    //   if (value !== "") {
    //     newObject[key] = value;
    //   }
    // }
    // return newObject;
    return updateObject;
  }

  public update(id, updateObject) {
    console.log("Calling update with object: " + JSON.stringify(updateObject));
    return this.backendService.updateEntity("student", id, updateObject);
  }

}
