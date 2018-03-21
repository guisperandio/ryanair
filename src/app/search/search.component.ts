import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';
import { AirportsService, CountriesService, PayloadService } from '../services';

import { Airport, Country, Payload } from '../models';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, AfterViewChecked {
  public airports: Airport[];
  public countries: Country[];
  public payload: Payload;
  public date: string;
  public state: string = '';

  constructor(
    private airportService: AirportsService,
    private countriesService: CountriesService,
    private payloadService: PayloadService,
    private router: Router,
    private route: ActivatedRoute
  ) {  }

  public getAirports(): void {
    this.airportService.getAirports()
      .subscribe((data) => { this.airports = data; });
  }

  public getCountries(): void {
    this.countriesService.getCountries()
      .subscribe((data) => { this.countries = data; });
  }

  public ngOnInit() {
   
    this.getCountries();
    this.getAirports();
    this.getDate();
    this.getPayload();
    
    console.log(this.payload);
  }

  public ngAfterViewChecked() {
  }

  onPerformSearch(payload: Payload) {
    this.state = 'resultState';
    this.router.navigate([payload.from.iata, payload.to.iata, payload.startDate, payload.endDate]);
  }

  getPayload(){
    this.payload = this.payloadService.getPayload();
  }

  getDate() {
    const date = new Date();
    const day = (date.getDate().toString().length === 2) ?
      date.getDate() : '0' + date.getDate().toString();
    const month = (date.getMonth().toString().length === 2) ?
      date.getMonth() + 1 : '0' + (date.getMonth() + 1);

    this.date = `${date.getFullYear()}-${month}-${day}`;
  }

  checkDate(value: any) {
    switch (value.inputTarget) {
      case 'startDate':
        this.payload.startDate = value.date;
        if (this.payload.startDate > this.payload.endDate || this.payload.endDate === null) {
          this.payload.endDate = this.get2DaysDate(this.payload.startDate);
        }
        break;
      case 'endDate':
        this.payload.endDate = value.date;
        if (this.payload.endDate < this.payload.startDate) {
          this.payload.startDate = this.payload.endDate;
        }
        break;
    }
  }

  get2DaysDate(endDate) {
    const date = new Date(endDate);
    date.setDate(date.getDate() + 2);
    const day = (date.getDate().toString().length === 2) ?
      date.getDate() : '0' + date.getDate().toString();
    const month = (date.getMonth().toString().length === 2) ?
      date.getMonth() + 1 : '0' + (date.getMonth() + 1);

    return `${date.getFullYear()}-${month}-${day}`;
  }

}
