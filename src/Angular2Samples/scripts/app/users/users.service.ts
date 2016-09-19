import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { User } from './user';
@Injectable()
export class UsersService {
  private _url = 'http://localhost:5000/api/users';
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers })
  constructor(private _http: Http) {}
  
  getUsers() {
    return this._http.get(this._url)
      .map(res => res.json());
  }

  addUser(user) {
    return this._http.post(this._url, JSON.stringify(user), this.options);
  }

  getUser(userId) {
    return this._http.get(this.getUserUrl(userId))
      .map(res => res.json());
  }

  updateUser(user) {
    return this._http.put(this.getUserUrl(user.id), JSON.stringify(user), this.options);
  }

  deleteUser(userId) {
    return this._http.delete(this.getUserUrl(userId));
  }

  private getUserUrl(userId) {
    return this._url + '/' + userId;
  }
}