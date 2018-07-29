import { Injectable } from '@angular/core';

import { BackendService } from '../../backend/backend.service';

import { ProfileService } from '../../reuseable-components/profile/profile.service';

@Injectable()
export class StudentService extends ProfileService {

  constructor(pBackendService: BackendService) {
    super(pBackendService, 'student');
  }

  // Make sure fields match a pattern, if they dont return an array with the errors
  public validateFields(updateObject): Array<string> {
    const errors = [];
    this.validatePursueCCLCertificate(updateObject, errors);
    this.validateInterestCCLCertificate(updateObject, errors);
    return errors;
  }

  // Adds an error to erros if there was a problem with the pursueCCLCertificate value
  private validatePursueCCLCertificate(updateObject, errors) {
    const pursueCertificate = updateObject['Pursuing a CCL Certificate'];
    console.log(pursueCertificate);
    if (this.hasValue(pursueCertificate)) {
      if (!this.isBoolean(pursueCertificate)) {
        errors.push(`The value for 'Pursuing a CCL Certificate' can only be 'true' or 'false'`);
      }
    }
  }

  // Adds an error to erros if there was a problem with the interestCCLCertificate value
  private validateInterestCCLCertificate(updateObject, errors) {
    const interestCertificate = updateObject['Interested in a CCL Certificate'];
    console.log(interestCertificate);
    if (this.hasValue(interestCertificate)) {
      if (!this.isBoolean(interestCertificate)) {
        errors.push(`The value for Interested in a CCL Certificate can only be 'true' or 'false'`);
      }
    }
  }

  // If user didnt input anything for this value return true, otherwise falese
  private hasValue(value: string): boolean {
    return value !== undefined && value !== '';
  }

  // If the string represents a boolean value return true, otherwise false
  private isBoolean(value: string): boolean {
    return (value === 'true' || value === 'false');
  }


}
