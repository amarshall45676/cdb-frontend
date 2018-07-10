import {Entity, EntityBuilder} from './entity';

export class Program extends Entity {
  public _name: string;
  public _purpose: string;
  public _type: string; // Can be Act, Learn, or Create Change
  public _numStudent: number;
  public _numPartners: number;
  public _percentStudents: number;
  public _percentDidAnotherProgram: number;
  public _percentAcceptance: number;

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

  public updateDisplay(program: Program) {
    this._display = program._display;
    this._profile = program._name;
  }
}

export class ProgramBuilder extends EntityBuilder {
  public programName: string;
  public programPurpose: string;
  public programType: string;
  public programNumStudents: number;
  public programNumPartners: number;
  public programPercentStudents: number;
  public programPercentDidAnotherProgram: number;
  public programPercentAcceptance: number;

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

  public numStudents(pNumStudents: number) {
    this.programNumStudents = pNumStudents;
  }

  public numPartners(pNumPartners: number) {
    this.programNumPartners = pNumPartners;
  }

  // TODO: what does percent students mean
  public percentStudents(pPercentStudents: number) {
    this.programPercentStudents = pPercentStudents;
  }

  public percentDidAnotherProgram(pPercentDidAnotherProgram: number) {
    this.programPercentDidAnotherProgram = pPercentDidAnotherProgram;
  }

  public percentAcceptance(pPercentAcceptance: number) {
    this.programPercentAcceptance = pPercentAcceptance;
  }

  public build(): Program {
    return new Program(this);
  }

}
