import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class URLService {
  frontendURL;
  backendURL;

  constructor() {
    if (environment.production) {
      this.frontendURL = 'https://cdb.rice.edu';
      this.backendURL = 'https://protected-chamber-70038.herokuapp.com';
    } else {
      this.frontendURL = 'http://localhost:4200';
      this.backendURL = 'http://localhost:2222';
    }
   }

  public getFrontendURL() {
    return this.frontendURL;
  }

  public getBackendURL() {
    return this.backendURL;
  }

}
