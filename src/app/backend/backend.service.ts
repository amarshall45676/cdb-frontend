import { Injectable } from '@angular/core';

import { URLService } from '../url/url.service';
import {FormGroup} from '@angular/forms';

@Injectable()
export class BackendService {
  private baseBackend: string;

  constructor(private urlService: URLService) {
    this.baseBackend = this.urlService.getBackendURL();
   }

   // Encodes the string so it can be sent via a request. This makes it so characters like "(" or "?" dont mess with things
   private static encodeEndpoint(endpoint: string): string {
    const split = endpoint.split('/');
    const result = split.map(string => {
      return encodeURIComponent(string);
    }).join('/');
    return result;
   }

   // Turns the given obejct into a form for submission to backend
  private static objectToForm(object: Object) {
    const formData: FormData = new FormData(); // Printing this out is weird be careful, use .get()
    for (const key in object) {
      formData.append(key, object[key]);
    }

    return formData;
  }

  // Main method used to make a request to the backend
  public resource(method, endpoint, payload) {
    let options: RequestInit;
    if (method !== 'GET') { // Only non get can have a body
      options = {
        method,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: ''
      };
      if (payload) {
        options.body = JSON.stringify(payload);
      }
    } else {
      options = {
        method,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
      };
    }

    // Make request to the backend
    return fetch(`${this.baseBackend}/${BackendService.encodeEndpoint(endpoint)}`, options) // Make request to backend
        .then(r => {
            if (r.status === 200) {
                if (r.headers.get('Content-Type').indexOf('json') > 0) {
                    return r.json();
                } else {
                    return r.text();
                }
            } else {
                // useful for debugging, but remove in production
                throw new Error(r.statusText);
            }
        });
  }

  // Calls function to create an entity
  public createEntity(type: string, form: FormGroup) {
    return this.makeEntity(`${type}/`, BackendService.objectToForm(form.value));
  }

  // Makes the given entity given some form data
  public makeEntity(endpoint, formData) {
    const options: RequestInit = {
      method : 'POST',
      body : formData,
      credentials : 'include' // include credential on request so authenticated
    };

    return fetch(`${this.baseBackend}/${BackendService.encodeEndpoint(endpoint)}`, options) // Make request to backend
      .then(r => {
        if (r.status === 200) {
          if (r.headers.get('Content-Type').indexOf('json') > 0) {
            return r.json();
          } else {
            return r.text();
          }
        } else {
          // useful for debugging, but remove in production
          throw new Error(r.statusText);
        }
      });
  }

  // Upload a file to the right place. File type specifies where the request should be sent to
  public uploadFileGeneral(formData, fileType) {
    const options: RequestInit = {
      method : 'POST',
      body : formData,
      credentials : 'include' // include credential on request so authenticated
    };

    return fetch(`${this.baseBackend}/data/file/${fileType}`, options)
        .then(r => {
            if (r.status === 200) {
                if (r.headers.get('Content-Type').indexOf('json') > 0) {
                    return r.json();
                } else {
                    return r.text();
                }
            } else {
                // useful for debugging, but remove in production
                throw new Error(r.statusText);
            }
        });
  }

  // Logs the user out of the application
  public logout() {
    const options: RequestInit = {
        method : 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    return fetch(`${this.baseBackend}/auth/logout`, options)
        .then(r => {
            if (r.status === 200) {
                return r;
            } else {
                // useful for debugging, but remove in production
                throw new Error(r.statusText);
            }
        });
  }

  // Returns promise that contains the fieldName to the new updated value
  public updateEntity(entityType: string, entityId: string, newValues: Object) {
    const endpoint = `${entityType}/${entityId}`;
    return this.resource('PUT', endpoint, newValues);
  }

}
