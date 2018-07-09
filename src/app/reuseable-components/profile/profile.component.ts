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
  @Input() entityId: string;
  @Input() service: ProfileService; // Service for the given entity
  @Input() dialogRef: MatDialogRef<T>; // So that the table can be updated on close, typed based off of calling component

  public entity: Entity; // This is the entity to be displayed
  public isDialog;

  // These are the properties of the object ot be displayed, retrieve from entity
  public displayProperties: Array<string>;


  private static clearErrors() {
    document.getElementById('errors').innerHTML = '';
  }

  private static addError(error: string) {
    const value = document.getElementById('errors').innerHTML;
    document.getElementById('errors').innerHTML = `${value} <br> ${error}`;
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
    const updateObject = {};
    const elements = document.getElementsByClassName('newValues');
    for (let i = 0; i < elements.length; i++) {
      const property = this.displayProperties[i]; // this makes the display properties coupled to how the object i update, note great
      updateObject[property] = (<HTMLInputElement>elements[i]).value;
      // Clear inputs
      (<HTMLInputElement>elements[i]).value = '';
    }

    // TODO: what about confirming fields?, then use adding error, also should there be any trimming of data?
    this.service.update(this.entityId, updateObject).then((result: UpdateResult) => {
      console.log(`Result: ${JSON.stringify(result)}`);
      if (result._success) {
        // If name was updated, update the entityId
        if (updateObject['Name'] !== '') {
          this.entityId = updateObject['Name'];
          console.log('Entity ID update to: ' + this.entityId);
        }
        this.updateDisplay(result._entity);
      } else {
        ProfileComponent.clearErrors();
        ProfileComponent.addError('This name is already in use. Please use another');
      }
    });
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
