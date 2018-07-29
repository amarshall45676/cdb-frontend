export class Note {
  public _note: string;
  public _userId: string;
  public _creationDate: string;
  public _note_id: string;

  constructor(pNote: string, pUserId: string, pCreationDate: string, pNoteId: string) {
    this._note = pNote;
    this._userId = pUserId;
    this._creationDate = pCreationDate;
    this._note_id = pNoteId;
  }

  public static fromObject(pObject: Object) {
    return new Note(pObject['note'], pObject['userId'], pObject['viewDate'], pObject['noteId']);
  }
}
