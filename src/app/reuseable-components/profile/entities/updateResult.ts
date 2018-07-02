import {Entity} from './entity';

export class UpdateResult {
  public _success: boolean;
  public _entity: Entity;


  constructor(pSuccess: boolean, pEntity: Entity) {
    this._success = pSuccess;
    this._entity = pEntity;
  }
}
