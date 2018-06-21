import {Entity, EntityBuilder} from './entity';

export class Project extends Entity {
  public _name: string;
  public _programName: string;
  public _yearRun: string;
  public _semester: string;

  constructor(pCopy: ProjectBuilder) {
    super(pCopy);
    this._name = pCopy.projectName;
    this._programName = pCopy.projectProgramName;
    this._yearRun = pCopy.projectYearRun;
    this._semester = pCopy.projectSemester;
    this._display = {
      Name: this._name,
      'Program Name': this._programName,
      'Year Run': this._yearRun,
      Semester: this._semester
    };
  }

  public static fromObject(object: Object): Project {
    const builder: ProjectBuilder  = new ProjectBuilder();
    let property;
    if (property = object['Name']) {
      builder.name(property);
      builder.name(property);
    }
    if (property = object['Program']) {
      builder.programName(property);
    }
    if (property = object['Year']) {
      builder.yearRun(property);
    }
    if (property = object['Semester']) {
      builder.semester(property);
    }
    if (property = object['Notes']) {
      builder.notes(property);
    }
    return builder.build();
  }

  public static getFormProperties(): Array<string> {
    return ['Name', 'Program Name', 'Year Run', 'Semester'];
  }

  public getTableProperties(): Array<string> {
    return ['Name', 'Program Name', 'Year Run', 'Semester'];
  }
}

export class ProjectBuilder extends EntityBuilder {
  public projectName: string;
  public projectProgramName: string;
  public projectYearRun: string;
  public projectSemester: string; // TODO: should this be int of some sort?

  constructor() {
    super();
  }

  public name(pName: string) {
    this.projectName = pName;
  }

  public programName(pProgramName: string) {
    this.projectProgramName = pProgramName;
  }

  public yearRun(pYearRun: string) {
    this.projectYearRun = pYearRun;
  }

  public semester(pSemester: string) {
    this.projectSemester = pSemester;
  }

  public build(): Project {
    return new Project(this);
  }
}
