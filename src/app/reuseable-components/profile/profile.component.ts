import { Component, OnInit, Input } from '@angular/core';

import { ProfileService } from './profile.service';
import { Entity } from './entities/entity';
import { UpdateResult } from './entities/updateResult';
import {MatDialogRef} from '@angular/material';

import {BackendService} from '../../backend/backend.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css', '../../app.component.css']
})
export class ProfileComponent<T> implements OnInit {
  @Input() title: string;
  @Input() entityId: string; // The actuall id for the entity this profile represents
  @Input() service: ProfileService; // Service for the given entity
  @Input() dialogRef: MatDialogRef<T>; // So that the table can be updated on close, typed based off of calling component

  public entity: Entity; // This is the entity to be displayed
  public isDialog;

  // For displaying errors
  public updateErrors = false;
  public errors: Array<string>;

  // These are the properties of the object ot be displayed, retrieve from entity
  public displayProperties: Array<string>;


  private clearErrors() {
    this.updateErrors = false;
    this.errors = [];
  }

  private addError(error: string) {
    this.updateErrors = true;
    this.errors.push(error);
  }

  constructor() {}

  ngOnInit() {
    this.isDialog = (this.dialogRef !== undefined);

    this.service.getEntityPromise(this.entityId).then((entity: Entity) => {
      this.updateDisplay(entity);
    });
  }

  public updateDisplay(entity: Entity) {
    this.entity = entity;
    this.displayProperties = entity.getProperties();
  }

  // Update the entity displayed based on the input from the user
  public updateEntity() {
    this.clearErrors();
    const updateObject = {};
    // get the possivle new values from the inputs
    const elements = document.getElementsByClassName('newValues');
    for (let i = 0; i < elements.length; i++) {
      const property = this.displayProperties[i]; // this makes the display properties coupled to how the object i update, note great
      updateObject[property] = (<HTMLInputElement>elements[i]).value.trim(); // Trim off any extra whitespace
      // Clear inputs
      (<HTMLInputElement>elements[i]).value = '';
    }

    // Validate the fields look the way they should and display any errors that are there
    const errors: Array<string> = this.service.validateFields(updateObject);
    console.log('Errors: ' + JSON.stringify(errors));

    // If there are no errors update the entity on the backend then frontend
    if (errors.length === 0) {
      this.service.update(this.entityId, updateObject).then((result: UpdateResult) => {
        if (result._success) {
          this.clearErrors();
          // If name was updated, update the entityId
          if (updateObject['Name'] !== '') {
            this.entityId = updateObject['Name'];
          }
          this.updateDisplay(result._entity);
        } else {
          this.addError(`The name '${updateObject['Name']}' is already in use. Please use another`);
        }
      });
    } else {
      // Add errors to the errors component
      errors.forEach((error) => {
        this.addError(error);
      });
    }
  }

  // Make a note for the given entity
  public makeNote() {
    const content = (<HTMLInputElement>document.getElementById('notes')).value;

    const newNote = {
      note: content
    };

    this.service.addNote(this.entityId, newNote).then((newEntity: Entity) => {
      this.updateDisplay(newEntity);
    });
  }

  public closeDialog() {
    this.dialogRef.close(this.entity);
  }

  public deleteNote(noteId){
    this.service.deleteNote(this.entityId, noteId).then((newEntity: Entity) =>{
      console.log(newEntity);
      this.updateDisplay(newEntity);
    });
  }
}
