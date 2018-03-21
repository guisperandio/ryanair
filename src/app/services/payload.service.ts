import { Observable } from 'rxjs/observable';
import { Injectable } from '@angular/core';
import { Payload } from '../models';

@Injectable()
export class PayloadService {
  public payload: Payload;
  constructor() {
    this.payload = new Payload();
  }

  setPayload(newPayload: Payload) {
    localStorage.setItem('from', newPayload.from);
    localStorage.setItem('to', newPayload.to);
    localStorage.setItem('startDate', newPayload.startDate);
    localStorage.setItem('endDate', newPayload.endDate);
  }

  getPayload(): Payload{
    this.payload.from = localStorage.getItem('from');
    this.payload.to = localStorage.getItem('to');
    this.payload.startDate = localStorage.getItem('startDate');
    this.payload.endDate = localStorage.getItem('endDate');

    Object.keys(this.payload).forEach(function(key) {
      localStorage.removeItem(key);
    });

    return this.payload;
  }
}