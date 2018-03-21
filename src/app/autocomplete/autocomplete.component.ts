import {
  Component, Input, Output, OnInit, EventEmitter, ViewChild, ElementRef, AfterViewChecked,
  OnChanges, SimpleChanges
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { SearchPipe } from '../pipes/search.pipe';
import { Option, Route, Country } from '../models';
import { OptionConverterService } from '../services';
@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css'],
  providers: [SearchPipe]
})
export class AutocompleteComponent implements OnInit, OnChanges, AfterViewChecked {
  public popUp = false;
  public selectedAirport: string;
  @Input() public options: Option[];
  @Input() public routes: Route[];
  @Input() public optionsRoutes: Option[];
  @Input() public countries: Country[];
  @Input() private value: string;
  private optionValue: Option[];
  @Output() private valueChanged = new EventEmitter<any>();
  
  constructor( private optionConverterService: OptionConverterService ){}

  ngOnInit() {
    if(!this.value){
      this.value = 'Choose an airport';
    } else {
      this.optionValue = this.optionConverterService
        .convert('name', 'iataCode', 'country', this.value, this.options);
      console.log(this.optionValue);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    
  }

  ngAfterViewChecked(): void{
    if(this.optionsRoutes){
      this.options = this.optionsRoutes;
    }
  }

  doPopUp(value){
    this.value = '';
    this.popUp = value;
  }

  chooseAirport(label, value){
    const airportData = {
      iata: value,
      airportName: label
    }
    this.selectedAirport = label;
    this.valueChanged.emit(airportData);
    this.doPopUp(false);
  }
}
