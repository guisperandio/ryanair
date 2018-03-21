import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/observable';
import { Airport } from '../models/airport.model';
import { AppConfig, APP_CONFIG_TOKEN } from '../../../config/config';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Injectable()
export class AirportsService {

  private apiUrl: string;

  constructor(
    private http: Http,
    private activatedRoute: ActivatedRoute,
    @Inject(APP_CONFIG_TOKEN) config: AppConfig) {
    this.apiUrl = config.apiUrls.airports;
  }

  public getAirports(): Observable<Airport[]> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http
      .get(this.apiUrl, { headers })
      .map((res: Response) => {
        return <Airport[]>res.json().airports;
      })
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }
}
