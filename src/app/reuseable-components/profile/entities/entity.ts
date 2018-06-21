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
    return Object.keys(this._display); // TODO: should only be all for profile, have separate funciton for table
  }

  public abstract getTableProperties(): Array<string>;

  // Get value to be displayed
  public getValue(pProperty: string): string {
    return this._display[pProperty];
  }
}

export abstract class EntityBuilder {
  public entityProfile: string;
  public entityNotes: Array<Note>;

  constructor() {}

  public profile(pName: string) {
    this.entityProfile = pName;
  }

  public notes(pNotes: Array<Note>) {
    this.entityNotes = pNotes;
  }
}
