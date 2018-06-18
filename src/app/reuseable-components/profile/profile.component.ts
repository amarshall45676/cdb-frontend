import { Component, OnInit, Input } from '@angular/core';

import { ProfileService } from './profile.service';

//TODO: use these!
import { Entity } from './entities';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css', '../../app.component.css']
})
export class ProfileComponent implements OnInit {
  @Input() entity: string;
  @Input() service: ProfileService; // Service for the given entity
  entityObject: Entity; // This is the entity to be displayed
  //TODO: use these!
  // Properties should be put to uppercase for frontend to display nicely
  displayProperties: Array<string>; // These are the properties of the object ot be displayed(Should be all in the object)

  constructor() {}

  ngOnInit() {
    this.service.getEntityPromise(this.entity).then((entityObject) => {
      this.updateDisplay(entityObject);
    })
  }

  public updateDisplay(entity) {
    this.entityObject = entity;
    const keys = Object.keys(entity)
    const noteIndex = keys.indexOf("Notes");
    keys.splice(noteIndex, 1);
    this.displayProperties = keys;
  }

  // Update the entity displayed based on the input from the user
  public updateEntity() {
    const updateObject = {}
    let elements = document.getElementsByClassName("newValues")
    for(var i = 0; i < elements.length; i++) {
      var property = this.displayProperties[i]
      const value = (<HTMLInputElement>elements[i]).value;
      updateObject[property] = value
    }
    //TODO: what about confirming fields?
    this.service.update(this.entity, updateObject).then((newEntity) => {
      this.updateDisplay(newEntity)
    })
    //TODO: clear inputs
  }

  // Make a note for the given entity
  public makeNote() {
    const content = (<HTMLInputElement>document.getElementById("notes")).value;

    const newNote = {
      note: content
    }

    const notePromise = this.service.addNote(this.entity, newNote);

    notePromise.then((newEntity) => {
      this.updateDisplay(newEntity)
    })
  }
}
