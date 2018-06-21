import { Injectable } from '@angular/core';

import { URLService } from '../url/url.service';

@Injectable()
export class BackendService {
  baseBackend;

  constructor(private urlService: URLService) {
    this.baseBackend = this.urlService.getBackendURL();
   }

  public resource(method, endpoint, payload) {
    let options: RequestInit;
    if (method !== 'GET') {
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

    return fetch(`${this.baseBackend}/${endpoint}`, options) // Make request to backend
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

  public makeEntity(endpoint, formData) {
    const options: RequestInit = {
      method : 'POST',
      body : formData,
      credentials : 'include' // include credential on request so authenticated
    };

    return fetch(`${this.baseBackend}/${endpoint}`, options) // Make request to backend
      .then(r => {
        // TODO: should this change?
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

  public uploadFileGeneral(formData, fileType) {
    const options: RequestInit = {
      method : 'POST',
      body : formData,
      credentials : 'include' // include credential on request so authenticated
    };

    return fetch(`${this.baseBackend}/data/file/${fileType}`, options)
        .then(r => {
          // console.log(r)
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

  // TODO: not sure how to make the login work with a sigle reqeust and OAuth
    // public login() {
    //   console.log('In login request')
    //   var options: RequestInit = {
    //       method : 'GET',
    //       credentials: 'include',
    //       headers: {
    //       }
    //       ,mode: 'no-cors'
    //   }
    //   return fetch(`${this.CASLogin}`, options)
    //       .then(r => {
    //           if (r.status === 0) { //Always has a status of 0 when succeeding
    //               return r;
    //           } else {
    //               // useful for debugging, but remove in production
    //               throw new Error(r.statusText);
    //           }
    //       })
    // }

}
