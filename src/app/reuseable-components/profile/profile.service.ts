import { BackendService } from '../../backend/backend.service';
import {Entity} from './entities/entity';
import {UtilsService} from '../../utils/utils.service';
import {UpdateResult} from './entities/updateResult';

export abstract class ProfileService {
  public backendService: BackendService;
  public entityType: string; // e.g. student, project, program etc.

  constructor(backendService: BackendService, entityType: string) {
    this.backendService = backendService;
    this.entityType = entityType;
  }

  /**
  entity: Entity to be update, e.g. for a student this could be Andrew Marshall
  newNote: Note to add to the given entity
  */
  public addNote(entityId: string, newNote): Promise<Entity> {
    return this.backendService.resource('PUT', `${this.entityType}/note/${entityId}`, newNote)
      .then(object => {
        return UtilsService.EntityFromObject(object, this.entityType);
      });
  }

  /**
  entity: Entity to be update, e.g. for a student this could be Andrew Marshall
  newNote: Note to add to the given entity
  */
  public deleteNote(entityId: string, noteId: string): Promise<Entity> {
    return this.backendService.resource('DELETE', `${this.entityType}/${entityId}/${noteId}`, null)
      .then(object => {
        return UtilsService.EntityFromObject(object, this.entityType);
      });
  }

  // TODO: need to implement this
  // Make sure fields match a pattern, if they dont print a message and take out of result
  abstract validateFields(updateObject);

  // Update the given entity with the given updateObject
  public update(entityId: string, updateObject: Object): Promise<UpdateResult> {
    return this.backendService.updateEntity(this.entityType, entityId, updateObject).then(object => {
      return UtilsService.UpdateResultFromObject(object, this.entityType);
    });
  }

  public getEntityPromise(entityId: string): Promise<Entity> {
    return this.backendService.resource('GET', `${this.entityType}/${entityId}`, null)
      .then(object => {
        return UtilsService.EntityFromObject(object, this.entityType);
      });
  }
}
