import { Injectable } from '@angular/core';
import {Entity} from '../reuseable-components/profile/entities/entity';
import {Partner} from '../reuseable-components/profile/entities/partner';
import {Program} from '../reuseable-components/profile/entities/program';
import {Project} from '../reuseable-components/profile/entities/project';
import {Student} from '../reuseable-components/profile/entities/student';

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
}
