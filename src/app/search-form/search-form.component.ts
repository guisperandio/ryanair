import { Component, OnChanges, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Airport, Payload, Route, Country, Option } from '../models';
import { OptionConverterService } from '../services/option-converter.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnChanges {
  @Input() public airports: Airport[];
  @Input() public routes: Route[];
  @Input() public countries: Country[];
  @Input() public payload: Payload;
  public options: Option[] = [];
  @Input() public state = 'searchState';
  @Input() public date: string;
  @Output() private performSearch = new EventEmitter<Payload>();
  @Output() private dateChanged = new EventEmitter<any>();
  constructor(
    private optionConverterService: OptionConverterService
  ) {  }

  public onSubmit() {
    this.performSearch.emit(this.payload);
  }

  ngOnChanges() {
    if (this.airports && this.airports.length > 0) {
      this.options = this.optionConverterService
        .convert('name', 'iataCode', 'country', '', this.airports);
      console.log(this.options);
    }
  }

  doPopUp(value) {
    if(value)
      this.state = 'searchState';
    else
      this.state = 'resultState';
  }

  onFromChanged(value: string): void {
    this.payload.from = value;
  }

  onToChanged(value: string): void {
    this.payload.to = value;
  }

  checkDate(value: any, target: string){
    const dateTarget = {
      date: value.target.value,
      inputTarget: target
    }
    this.dateChanged.emit(dateTarget);
  }

}
