/**
Class to store all of the frontend entities
*/
//TODO: use these!
export class Entity {
  public Notes;
}

export class Partner extends Entity {
  public name : string;
  public address : string;
  public city : string;
  public zipcode : string; //TODO: should this be int of some sort?
  public phone: string;
  public url: string;
}

export class Program extends Entity {
  public name : string;
  public purpose: string;
  public type: string; //Can be Act, Learn, or Create Change
}

export class Project extends Entity {
  public name : string;
  public programName: string;
  public yearRun: string;
  public semester: string;
}

export class Student extends Entity {
  public name : string;
  public majors: Array<string>; //Should this just be a single string?
  public minors: Array<string>;
  public phone: string;
  public gpa: string; //Can be int?
  public gradYear: string; //Can be int?
  public email: string;
}
