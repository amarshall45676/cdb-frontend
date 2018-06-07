import { Component, OnInit, Input } from '@angular/core';

import { ProfileService } from './profile.service';

import { Entity } from './entities';

//TODO: all this is super fucking confusing, make sure to have views no no need for voodoo magic

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css', '../../app.component.css']
})
export class ProfileComponent implements OnInit {
  @Input() entity: string;
  @Input() service: ProfileService; // Service for the given entity
  @Input() display: Object;
  //TODO: make a super type "Entity", that has all the fields needed for profile
  entityObject: Entity; // This is the entity to be displayed
  // Properties should be put to uppercase for frontend to display nicely
  displayProperties: Array<string>; // These are the properties of the object ot be displayed(Should be all in the object)

  constructor() {
   }

  ngOnInit() {
    console.log("Entity: " + JSON.stringify(this.entity))
    this.service.getEntityPromise(this.entity).then((entityObject) => {
      this.updatePageEntity(entityObject);
    })
  }
  //TODO: rename this?(confusing conflict with below)
  //Perform necessary steps to go from backend object to frontend
  //e.g.
  //Remove unwanted parts
  //need to filter out the unnecssary parts like (name -> displayName) and notes
  public updatePageEntity(entity) {
    // Change the value in the object to display more easily
    //TODO: take out this display stuff
    // for(var property in this.display) {
    //
    //   const value = entity[property]
    //   if (this.display[property] == "NA") {
    //     delete entity[property] //If value is NA then just delete and dont replace
    //   } else {
    //     delete entity[property]
    //     entity[this.display[property]] = value //Change the display value
    //   }
    // }

    this.entityObject = entity;

    //TODO: how to display properties?
    this.displayProperties = Object.keys(this.entityObject)
    // this.removeProperty("displayName")
    // this.removeProperty("notes")
    // this.removeProperty("id")
  }

  // public removeProperty(name) {
  //   const index = this.displayProperties.indexOf(name);
  //   if (index != -1) {
  //     this.displayProperties.splice(index, 1);
  //   }
  // }

  private capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // Update the entity displayed based on the input from the user
  public updateEntity() {
  //TODO: fix this
    const updateObject = {}
    //TODO: case like name where you want a dsiplay name change it
    let elements = document.getElementsByClassName("newValues")
    for(var i = 0; i < elements.length; i++) {
      var property = this.displayProperties[i]
      // if (property == "name") {
      //   property = "displayName"; // Make sure only the display name is changed
      // }
      const value = (<HTMLInputElement>elements[i]).value;
      const possibleProperty = property;//this.getProperty(property);
      const propertyFinal = possibleProperty != null ? possibleProperty : property;
      updateObject[propertyFinal] = value
    }
    console.log("Update Object: " + JSON.stringify(updateObject))
    //TODO: what about confirming fields?
    this.service.update(this.entity, updateObject).then((newEntity) => {
      // this.entity = newEntity;
      this.updatePageEntity(newEntity)
    })
    //TODO: clear inputs

  }

  // Get property from the display, given the property you are looking for
  private getProperty(property) {
    for(var key in this.display) {
      if (this.display[key] == property) {
        return key; // Get the original Property
      }
    }
  }

  // Make a note for the given entity
  public makeNote() {
    const content = (<HTMLInputElement>document.getElementById("notes")).value;

    const newNote = {
      note: content
    }

    const notePromise = this.service.addNote(this.entity, newNote);

    notePromise.then((newEntity) => {
      this.updatePageEntity(newEntity)
    })
  }

}
