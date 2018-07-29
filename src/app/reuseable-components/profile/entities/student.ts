import {Entity, EntityBuilder} from './entity';

export class Student extends Entity {
  public _name: string;
  public _netId: string;
  public _studentId: string;
  public _college: string;
  public _gender: string;
  public _gradYear: string; // Can be int?
  public _phone: string;
  public _email: string;
  public _localAddress: string;
  public _primaryAddress: string;
  public _majors: Array<string>;
  public _minors: Array<string>;
  public _gpa: string;
  public _citizenship: string;
  public _citizenshipCountry: string;
  public _ethnicity: string;
  public _pursueCertificate: boolean;
  public _interestCertificate: boolean;

  constructor(pCopy: StudentBuilder) {
    super(pCopy);
    this._name = pCopy.studentName;
    this._netId = pCopy.studentNetId;
    this._studentId = pCopy.studentStudentId;
    this._college = pCopy.studentCollege;
    this._gender = pCopy.studentGender;
    this._gradYear = pCopy.studentGradYear;
    this._phone = pCopy.studentPhone;
    this._email = pCopy.studentEmail;
    this._localAddress = pCopy.studentLocalAddress;
    this._primaryAddress = pCopy.studentPrimaryAddress;
    this._majors = pCopy.studentMajors;
    this._minors = pCopy.studentMinors;
    this._gpa = pCopy.studentGpa;
    this._citizenship = pCopy.studentCitizenship;
    this._citizenshipCountry = pCopy.studentCitizenshipCountry;
    this._ethnicity = pCopy.studentEthnicity;
    this._pursueCertificate = pCopy.studentPursueCertificate;
    this._interestCertificate = pCopy.studentInterestCertificate;
    // need to update this when update backendView is updated to encompass all data
    this._display = {
      Name: this._name,
      'Net ID': this._netId,
      'Student ID': this._studentId,
      College: this._college,
      Gender: this._gender,
      'Graduation Year' : this._gradYear,
      'Phone': this._phone,
      Email: this._email,
      'Local Address': this._localAddress,
      'Primary Address': this._primaryAddress,
      Majors: this._majors.join(', '),
      Minors: this._minors.join(', '),
      GPA: this._gpa,
      Citizenship: this._citizenship,
      'Country of Citizenship': this._citizenshipCountry,
      Ethnicity: this._ethnicity,
      'Pursuing a CCL Certificate': this._pursueCertificate,
      'Interested in a CCL Certificate': this._interestCertificate
    };
  }

  public static fromObject(object: Object): Student {
    const builder: StudentBuilder = new StudentBuilder();
    const name = object['Name'];
    builder.name(name);
    builder.profile(name);
    builder.netId(object['Net ID']);
    builder.studentId(object['Student ID']);
    builder.college(object['College']);
    builder.gender(object['Gender']);
    builder.gradYear(object['Graduation Year']);
    builder.phone(object['Phone']);
    builder.email(object['Email']);
    builder.localAddress(object['Local Address']);
    builder.primaryAddress(object['Primary Address']);
    builder.majors(object['Majors']);
    builder.minors(object['Minors']);
    builder.gpa(object['GPA']);
    builder.citizenship(object['Citizenship']);
    builder.citizenshipCountry(object['Country of Citizenship']);
    builder.ethnicity(object['Ethnicity']);
    builder.pursueCertificate(object['Pursuing a CCL Certificate']);
    builder.interestCertificate(object['Interested in a CCL Certificate']);
    builder.notes(object['Notes']);
    return builder.build();
  }

  public getTableProperties(): Array<string> {
    return ['Name', 'Email', 'Majors', 'Minors', 'Graduation Year'];
  }

  public updateDisplay(student: Student) {
    this._display = student._display;
    this._profile = student._name;
  }
}

export class StudentBuilder extends EntityBuilder {
  public studentName: string;
  public studentNetId: string;
  public studentStudentId: string;
  public studentCollege: string;
  public studentGender: string;
  public studentGradYear: string;
  public studentPhone: string;
  public studentEmail: string;
  public studentLocalAddress;
  public studentPrimaryAddress;
  public studentMajors: Array<string>;
  public studentMinors: Array<string>;
  public studentGpa: string;
  public studentCitizenship: string;
  public studentCitizenshipCountry: string;
  public studentEthnicity: string;
  public studentPursueCertificate: boolean;
  public studentInterestCertificate: boolean;

  constructor() {
    super();
  }

  public name(pName: string) {
    this.studentName = pName;
  }

  public netId(pNetId: string) {
    this.studentNetId = pNetId;
  }
  public studentId(pStudentId: string) {
    this.studentStudentId = pStudentId;
  }
  public college(pCollege: string) {
    this.studentCollege = pCollege;
  }
  public gender(pGender: string) {
    this.studentGender = pGender;
  }

  public gradYear(pGradYear: string) {
    this.studentGradYear = pGradYear;
  }

  public phone(pPhone: string) {
    this.studentPhone = pPhone;
  }

  public email(pEmail: string) {
    this.studentEmail = pEmail;
  }

  public localAddress(pLocalAddress: string) {
    this.studentLocalAddress = pLocalAddress;
  }

  public primaryAddress(pPrimaryAddress: string) {
    this.studentPrimaryAddress = pPrimaryAddress;
    return this;
  }

  public majors(pMajors: Array<string>) {
    this.studentMajors = pMajors;
  }

  public minors(pMinors: Array<string>) {
    this.studentMinors = pMinors;
  }

  public gpa(pGpa: string) {
    this.studentGpa = pGpa;
  }

  public citizenship(pCitizenship: string) {
    this.studentCitizenship = pCitizenship;
    return this;
  }

  public citizenshipCountry(pCitizenshipCountry: string) {
    this.studentCitizenshipCountry = pCitizenshipCountry;
    return this;
  }

  public ethnicity(pEthnicity: string) {
    this.studentEthnicity = pEthnicity;
    return this;
  }

  public pursueCertificate(pPursueCertificate: boolean) {
    this.studentPursueCertificate = pPursueCertificate;
    return this;
  }

  public interestCertificate(pInterestCertificate: boolean) {
    this.studentInterestCertificate = pInterestCertificate;
    return this;
  }

  public build(): Student {
    return new Student(this);
  }
}
