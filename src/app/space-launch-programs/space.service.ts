import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable()
export class SpaceService {

  private url = 'https://api.spacexdata.com/v3/launches';  // URL to web api

  constructor(
    private _http: HttpClient,
  ) { }

  /** GET heroes from the server */
  getSpaceProgramsApi(params): Observable<any> {
    return this._http
      .get(this.url, { params: params })
      .pipe(
        catchError(err => this.handleError(err))
      );
  }

  handleError(err){
    alert("Something went wrong");
    return of([]);
  }
}
