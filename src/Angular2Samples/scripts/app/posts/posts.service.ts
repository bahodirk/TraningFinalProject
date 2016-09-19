import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class PostsService {
  private _url = 'http://localhost:5000/api/posts';

  constructor(private _http: Http) { }

  getPosts(filter?) {
    let url = this._url;
    if (filter && filter.userId) {
      url += '?userId=' + filter.userId;
    }
    return this._http.get(url)
      .map(res => res.json());
  }

  getComments(postId) {
    return this._http.get(this._url + '/' + postId + '/comments')
      .map(res => res.json());
  }
}