import { Component, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { CheapFlight } from '../models';
import { CheapFlightsService, PayloadService } from '../services';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-flight-results',
  templateUrl: './flight-results.component.html',
  styleUrls: ['./flight-results.component.css']
})
export class FlightResultsComponent implements OnInit {
  public cheapFlights: CheapFlight[];
  public params: any;
  private endDate: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private cheapFlightsService: CheapFlightsService,
    private payloadService: PayloadService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.params = params;
      const { from, to, startDate, endDate } = params;
      this.payloadService.setPayload({ from, to, startDate, endDate });
      this.cheapFlightsService.getCheapFlights(this.params)
        .subscribe((data) => {
          this.cheapFlights = data;
        });
    });
  }

}
