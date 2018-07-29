import {Entity, EntityBuilder} from './entity';

export class Program extends Entity {
  public _name: string;
  public _purpose: string;
  public _type: string; // Can be Act, Learn, or Create Change
  public _numStudents: number;
  public _numPartners: number;
  public _percentStudents: string;
  public _percentDidAnotherProgram: string;
  public _percentAcceptance: string;

  constructor(pCopy: ProgramBuilder) {
    super(pCopy);
    this._name = pCopy.programName;
    this._purpose = pCopy.programPurpose;
    this._type = pCopy.programType;
    this._numStudents = pCopy.programNumStudents;
    this._numPartners = pCopy.programNumPartners;
    this._percentStudents = Program.toPercent(pCopy.programPercentStudents);
    this._percentDidAnotherProgram = Program.toPercent(pCopy.programPercentDidAnotherProgram);
    this._percentAcceptance = Program.toPercent(pCopy.programPercentAcceptance);
    this._display = {
      Name: this._name,
      Purpose: this._purpose,
      'Activity Type': this._type
    };
  }

  private static toPercent(val: number) {
    return isNaN(val) ? 'Unable to be calculated' : `${val.toString().substring(0, 5)} %`;
  }

  public static fromObject(object: Object): Program {
    const builder: ProgramBuilder = new ProgramBuilder();
    const name = object['Name'];
    builder.name(name);
    builder.profile(name);
    builder.purpose(object['Purpose']);
    builder.type(object['Activity Type']);
    // Get internal FAQ Object, then add it to this object
    const faq: Object = object['FAQ'];
    if (faq != null) {
      builder.numStudents(faq['numStudents']);
      builder.numPartners(faq['numPartners']);
      builder.percentStudents(faq['percentStudents']);
      builder.percentDidAnotherProgram(faq['percentDidAnother']);
      builder.percentAcceptance(faq['percentAcceptance']);
    }
    builder.notes(object['Notes']);
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

  // This is the percent of total students that did a program that did this program
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
