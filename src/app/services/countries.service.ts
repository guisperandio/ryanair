import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/observable';
import { Country } from '../models/country.model';
import { AppConfig, APP_CONFIG_TOKEN } from '../../../config/config';

@Injectable()
export class CountriesService {
  private apiUrl: string;
  constructor(private http: Http, @Inject(APP_CONFIG_TOKEN) config: AppConfig) {
    this.apiUrl = config.apiUrls.airports;
  }

  public getCountries(): Observable<Country[]> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.apiUrl, { headers })
      .map((res: Response) => res.json().countries);
  }

}
