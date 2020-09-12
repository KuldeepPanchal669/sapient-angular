import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable()
export class SpaceService {

  private url = 'https://api.spacexdata.com/v3/launches';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders(
      {
        "content-type": "application/json",
      }
    )
  };

  constructor(
    private _http: HttpClient,
  ) { }

  /** GET heroes from the server */
  getSpaceProgramsApi(params): Observable<any> {
    
    const headers = new HttpHeaders().set("content-type", "application/json");
    return this.callRestful("GET", this.url, { params: params });
    // _http.get(this.url, { params: params, headers: headers });
  }

  callRestful(type: string, url: string, options?: { params?: {}, body?: {}, headerData?: {} }) {
    let params;
    let body;

    if (options != undefined && options['params'] != undefined)
      params = options['params'];
    if (options != undefined && options['body'] != undefined)
      body = options['body'];

    let headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
    };

    switch (type) {
      case 'GET':
        let getOptions = {};
        getOptions = { params };
        return this._http.get(url, getOptions).pipe(map(res => {
          return res;
        }));
      default:
        return null;
    }
  }

  private handleError(err: HttpErrorResponse | any) {

  }
}
