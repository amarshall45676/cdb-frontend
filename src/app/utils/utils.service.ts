import { Injectable } from '@angular/core';
import {Entity} from '../reuseable-components/profile/entities/entity';
import {Partner} from '../reuseable-components/profile/entities/partner';
import {Program} from '../reuseable-components/profile/entities/program';
import {Project} from '../reuseable-components/profile/entities/project';
import {Student} from '../reuseable-components/profile/entities/student';
import {UpdateResult} from '../reuseable-components/profile/entities/updateResult';

@Injectable()
export class UtilsService {

  constructor() { }

  public static comparisonFunction(viewA, viewB) {
    if (viewA['Name'] < viewB['Name']) {
      return -1;
    }
    if (viewA['Name'] === viewB['Name']) {
      return 0;
    } else {
      return 1;
    }
  }

  public static comparisonFunction2(viewA, viewB) {
    if (viewA['programName'] < viewB['programName']) {
      return -1;
    }
    if (viewA['programName'] === viewB['programName']) {
      return 0;
    } else {
      return 1;
    }
  }

  public static removeElementFromArray(array, element) {
    const index = array.indexOf(element);
    array.splice(index, 1);
  }


  public static EntityFromObject(object: Object, type: string): Entity {
    if (type === 'partner') {
      return Partner.fromObject(object);
    }
    if (type === 'program') {
      return Program.fromObject(object);
    }
    if (type === 'project') {
      return Project.fromObject(object);
    }
    if (type === 'student') {
      return Student.fromObject(object);
    } else {
      window.alert('problem wit app, ask someone to fix');
      return null;
    }
  }

  public static UpdateResultFromObject(object: Object, type: string): UpdateResult {
    const success = object['success'];
    if (success) {
      return new UpdateResult(success, UtilsService.EntityFromObject(object['result'], type));
    } else {
      return new UpdateResult(success, null);
    }
  }

  // Change this is there is data from earlier
  public static getEarliestYear(): number {
    return 2008;
  }

  public static getCurrentYear(): number {
    const date: Date = new Date(Date.now());
    return date.getFullYear();
  }
}
