/**
Class to store all of the frontend entities
*/
import {Note} from './note';

export abstract class Entity {
  public _profile: string; // way to connect to the profile
  public _notes: Array<Note>;
  public _display: Object;

  constructor(pCopy: EntityBuilder) {
    this._profile = pCopy.entityProfile;
    this._notes = pCopy.entityNotes;
  }

  public getProperties(): Array<string> {
    return Object.keys(this._display);
  }

  public abstract getTableProperties(): Array<string>;

  // Get value to be displayed
  public getValue(pProperty: string): string {
    return this._display[pProperty];
  }

  // TODO: implement this for all classes to be called when a profile gets closed
  public abstract updateDisplay(entity: Entity);
}

export abstract class EntityBuilder {
  public entityProfile: string;
  public entityNotes: Array<Note>;

  constructor() {}

  public profile(pName: string) {
    this.entityProfile = pName;
  }

  public notes(pNotes: Array<Object>) {
    this.entityNotes = pNotes.map(object => {
      return Note.fromObject(object);
    });
  }
}
