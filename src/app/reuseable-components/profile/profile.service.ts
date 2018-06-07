import { BackendService } from '../../backend/backend.service'

export abstract class ProfileService {
  backendService: BackendService;
  entityType: string; // e.g. student, project, program etc.

  constructor(backendService: BackendService, entityType: string) {
    this.backendService = backendService;
    this.entityType = entityType;
  }

  /**
  entity: Entity to be update, e.g. for a student this could be Andrew Marshall
  newNote: Note to add to the given entity
  */
  public addNote(entity, newNote) {
    return this.backendService.resource("PUT", this.entityType + "/note/" + entity, newNote);
  }

  // //Make sure fields match a pattern, if they dont print a message and take out of result
  abstract validateFields(updateObject);

  // Update the given entity with the given updateObject
  public update(entity, updateObject) {
    return this.backendService.updateEntity(this.entityType, entity, updateObject);
  }

  public getEntityPromise(entity) {
    return this.backendService.resource("GET", this.entityType +"/" + entity, null);
  }

}
