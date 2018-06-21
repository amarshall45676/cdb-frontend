import { Component, OnInit, Input } from '@angular/core';

import { ProfileService } from './profile.service';
import { Entity } from './entities/entity';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css', '../../app.component.css']
})
export class ProfileComponent implements OnInit {
  @Input() entityId: string;
  @Input() service: ProfileService; // Service for the given entity
  public entity: Entity; // This is the entity to be displayed

  // These are the properties of the object ot be displayed, retrieve from entity
  public displayProperties: Array<string>;

  constructor() {}

  ngOnInit() {
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

    // TODO: what about confirming fields?
    this.service.update(this.entityId, updateObject).then((newEntity: Entity) => {
      this.updateDisplay(newEntity);
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
}
