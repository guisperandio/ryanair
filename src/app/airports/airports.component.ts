import { SearchPipe } from '../pipes/search.pipe';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/debounceTime';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Option, Route, Country } from '../models';
import { RoutesService, OptionConverterService } from '../services';

@Component({
  selector: 'app-airports',
  templateUrl: './airports.component.html',
  styleUrls: ['./airports.component.css'],
  providers: [SearchPipe]
})
export class AirportsComponent {
  @Input() public options: Option[];
  @Input() public from: string;
  @Input() public to: string;
  @Input() public countries: Observable<Country[]>;
  public routes: Route[];
  public optionsRoutes: Option[];
  @Output() private fromChanged = new EventEmitter<string>();
  @Output() private toChanged = new EventEmitter<string>();

  constructor(
    private routesService: RoutesService,
    private optionConverterService: OptionConverterService
  ) {  }

  onFromChanged(value: string) {
    this.from = value;
    this.fromChanged.emit(value);
    this.routesService.getRoutes(this.from, this.options)
      .subscribe((data) => {
        this.routes = data;
        this.optionsRoutes = this.optionConverterService
        .convert('label', 'value', 'country', this.routes, this.options);
      });
    
    if (this.from === this.to) {
      this.to = '';
      this.toChanged.emit('');
    }
  }

  onToChanged(value: string){
    this.to = value;
    this.toChanged.emit(value);
  }

}
