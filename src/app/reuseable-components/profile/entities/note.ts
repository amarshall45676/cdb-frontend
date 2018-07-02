export class Note {
  public _note: string;
  public _userId: string;
  public _creationDate: string;

  constructor(pNote: string, pUserId: string, pCreationDate: string) {
    this._note = pNote;
    this._userId = pUserId;
    this._creationDate = pCreationDate;
  }

  public static fromObject(pObject: Object) {
    return new Note(pObject['note'], pObject['userId'], pObject['viewDate']);
  }
}
