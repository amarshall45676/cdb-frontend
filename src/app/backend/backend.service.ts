import { Injectable } from '@angular/core';

@Injectable()
export class BackendService {
  url = 'http://localhost:2222';
  CASLogin = "http://localhost:2222/auth"
  CASLogout = "http://localhost:2222/auth/auth2"

  constructor() { }

  public resource(method, endpoint, payload) {
    var options: RequestInit
    if (method != "GET") {
      options = {
        method,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: ''
    }
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
      }
    }

    return fetch(`${this.url}/${endpoint}`, options)
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

  public uploadFile(formData) {
    var options: RequestInit
    options = {
      method : "POST",
      body : formData
    }

    return fetch(`${this.url}/data/file`, options)
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

  public login() {
    console.log("In login request")
    var options: RequestInit = {
        method : "GET",
        credentials: 'include',
        headers: {
        },
        mode: 'no-cors'
    }
    return fetch(`${this.CASLogin}`, options)
        .then(r => {
            if (r.status === 0) { //Always has a status of 0 when succeeding
                return r;
            } else {
                // useful for debugging, but remove in production
                throw new Error(r.statusText);
            }
        })
  }

  public logout() {
    var options: RequestInit = {
        method : "GET",
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    return fetch(`${this.CASLogout}`, options)
        .then(r => {
            if (r.status === 200) {
                return r;
            } else {
                // useful for debugging, but remove in production
                throw new Error(r.statusText);
            }
        })
  }

  //Returns promise that contains the fieldName to the new updated value
  public updateEntity(entityName, entityId, newValues) {
    const endpoint = entityName + "/" + entityId;
    return this.resource("PUT", endpoint, newValues);
  }

}
