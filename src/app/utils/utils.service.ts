import { Injectable } from '@angular/core';

@Injectable()
export class UtilsService {

  constructor() { }

  public comparisonFunction(viewA, viewB) {
    if (viewA["Name"] < viewB["Name"]) {
      return -1;
    }
    else if (viewA["Name"] == viewB["Name"]) {
      return 0;
    } else {
      return 1;
    }
  }

  public comparisonFunction2(viewA, viewB) {
    if (viewA["programName"] < viewB["programName"]) {
      return -1;
    }
    else if (viewA["programName"] == viewB["programName"]) {
      return 0;
    } else {
      return 1;
    }
  }

}
