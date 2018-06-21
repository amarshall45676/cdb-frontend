import {Entity, EntityBuilder} from './entity';

export class Program extends Entity {
  public _name: string;
  public _purpose: string;
  public _type: string; // Can be Act, Learn, or Create Change

  constructor(pCopy: ProgramBuilder) {
    super(pCopy);
    this._name = pCopy.programName;
    this._purpose = pCopy.programPurpose;
    this._type = pCopy.programType;
    this._display = {
      Name: this._name,
      Purpose: this._purpose,
      'Activity Type': this._type
    };
  }

  public static fromObject(object: Object): Program {
    const builder: ProgramBuilder = new ProgramBuilder();
    let property;
    if (property = object['Name']) {
      builder.name(property);
      builder.profile(property);
    }
    if (property = object['Purpose']) {
      builder.purpose(property);
    }
    if (property = object['Activity Type']) {
      builder.type(property);
    }
    if (property = object['Notes']) {
      builder.notes(property);
    }
    return builder.build();
  }

  public static getFormProperties(): Array<string> {
    return ['Name', 'Purpose', 'Activity Type'];
  }

  public getTableProperties(): Array<string> {
    return ['Name', 'Purpose', 'Activity Type'];
  }
}

export class ProgramBuilder extends EntityBuilder {
  public programName: string;
  public programPurpose: string;
  public programType: string;

  constructor() {
    super();
  }

  public name(pName: string) {
    this.programName = pName;
  }

  public purpose(pPurpose: string) {
    this.programPurpose = pPurpose;
  }

  public type(pType: string) {
    this.programType = pType;
  }

  public build(): Program {
    return new Program(this);
  }

}
