import { Injectable } from '@angular/core';

import { BackendService } from '../backend/backend.service'

@Injectable()
export class AffiliatesService {

  constructor(private backendService : BackendService) { }

  public getAffiliatesPromise() {
   return this.backendService.resource("GET", "affiliate/", null);
  }

  public getAffiliatePromise(affiliateName) {
   return this.backendService.resource("GET", "affiliate/" + affiliateName, null);
  }

  public viewProfile(id) {
    console.log("View profile for partner with ID: " + id);

    window.location.href = "affiliate/" + id;
    // this.openDialog(id);
  }

}
