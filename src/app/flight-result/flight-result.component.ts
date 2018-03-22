import { Component, AfterViewChecked, Input, OnInit } from '@angular/core';
import { CheapFlight } from '../models';

@Component({
  selector: 'app-flight-result',
  templateUrl: './flight-result.component.html',
  styleUrls: ['./flight-result.component.css']
})
export class FlightResultComponent implements AfterViewChecked, OnInit {

  @Input() public cheapFlight: CheapFlight[];
  public dateFrom: any;
  public dateTo: any;
  public timeFrom: any;
  public timeTo: any;
 
  ngAfterViewChecked() {
  }
  ngOnInit() {
    this.dateFrom = this.getData('dateFrom');
    this.dateTo = this.getData('dateTo');

    this.cheapFlight['price'] = Math.round(this.cheapFlight['price']) + ',00';
  }

  getData(dateValue) {
    const paramDate: string = this.cheapFlight[dateValue].toString();
    const date = new Date(paramDate);
    const day = (date.getDate().toString().length === 2) ?
      date.getDate() : '0' + date.getDate().toString();

    const weekDay = this.getWeekDay(date.getDay());
    const month = this.getMonth(date.getMonth());
    const hours = (date.getHours().toString().length > 1) ? date.getHours() 
      : '0' + date.getHours().toString();
    const minutes = (date.getMinutes().toString().length > 1) ? date.getMinutes() 
      : '0' + date.getMinutes().toString();

    const objDate = {
      date: `${weekDay} ${day} ${month}`,
      hour: `${hours}:${minutes}`
    };

    return objDate;
  }

  getTime(timeValue){
    
  }

  getWeekDay(day) {
    const weekDay = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return weekDay[day];
  }

  getMonth(month){
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[month];
  }
}
