import {Entity, EntityBuilder} from './entity';

export class Student extends Entity {
  public _name: string;
  public _majors: Array<string>; // Should this just be a single string?
  public _minors: Array<string>;
  public _phone: string;
  public _gpa: string; // Can be int?
  public _gradYear: string; // Can be int?
  public _email: string;

  constructor(pCopy: StudentBuilder) {
    super(pCopy);
    this._name = pCopy.studentName;
    this._majors = pCopy.studentMajors;
    this._minors = pCopy.studentMinors;
    this._phone = pCopy.studentPhone;
    this._gpa = pCopy.studentGpa;
    this._gradYear = pCopy.studentGradYear;
    this._email = pCopy.studentEmail;
    this._display = {
      Name: this._name,
      Email: this._email,
      Phone: this._phone,
      Majors: this._majors,
      Minors: this._minors,
      GPA: this._gpa,
      'Graduation Year' : this._gradYear // TODO: need to update this when update backendView to encompass all data
    };
  }

  public static fromObject(object: Object): Student {
    const builder: StudentBuilder = new StudentBuilder();
    let property;
    if (property = object['Name']) {
      builder.name(property);
      builder.profile(property);
    }
    if (property = object['Majors']) {
      builder.majors(property);
    }
    if (property = object['Minors']) {
      builder.minors(property);
    }
    if (property = object['Phone']) {
      builder.phone(property);
    }
    if (property = object['GPA']) {
      builder.gpa(property);
    }
    if (property = object['Graduation Year']) {
      builder.gradYear(property);
    }
    if (property = object['Email']) {
      builder.email(property);
    }
    if (property = object['Notes']) {
      builder.notes(property);
    }
    return builder.build();
  }

  public getTableProperties(): Array<string> {
    return ['Name', 'Email', 'Phone', 'Majors', 'Minors', 'GPA', 'Graduation Year'];
  }
}

export class StudentBuilder extends EntityBuilder {
  public studentName: string;
  public studentMajors: Array<string>;
  public studentMinors: Array<string>;
  public studentPhone: string;
  public studentGpa: string;
  public studentGradYear: string;
  public studentEmail: string;

  constructor() {
    super();
  }

  public name(pName: string) {
    this.studentName = pName;
  }

  public majors(pMajors: string) {
    this.studentMajors = [pMajors];
  }

  public minors(pMinors: string) { // fix this
    this.studentMinors = [pMinors];
  }

  public phone(pPhone: string) {
    this.studentPhone = pPhone;
  }

  public gpa(pGpa: string) {
    this.studentGpa = pGpa;
  }

  public gradYear(pGradYear: string) {
    this.studentGradYear = pGradYear;
  }

  public email(pEmail: string) {
    this.studentEmail = pEmail;
  }

  public build(): Student {
    return new Student(this);
  }
}
