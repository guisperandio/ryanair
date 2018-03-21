import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/observable';
import { CheapFlight } from '../models/cheap-flight.model';
import { AppConfig, APP_CONFIG_TOKEN } from '../../../config/config';

@Injectable()
export class CheapFlightsService {

    private apiUrl: string;
    constructor(private http: Http, @Inject(APP_CONFIG_TOKEN) config: AppConfig) {
        this.apiUrl = config.apiUrls.cheapFlights;
    }

    public getCheapFlights(params: any):
    Observable<CheapFlight[]> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http
            .get(`${this.apiUrl}from/${params.from}/to/${params.to}/${params.startDate}/${params.endDate}/250/unique`,
            { headers })
            .map((res: Response) => res.json().flights);
    }

}
