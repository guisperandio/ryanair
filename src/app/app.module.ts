import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchPipe } from './pipes/search.pipe';
import { HttpModule } from '@angular/http';

/*
 * Platform and Environment providers/directives/pipes
 */
import { environment } from 'environments/environment';
import { AppRouteModule, ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';
import { HomeComponent } from './home';
import { XLargeDirective } from './home/x-large';

import '../styles/styles.scss';
import '../styles/headings.css';
import { SearchComponent } from './search/search.component';
import { AirportsService, CountriesService,
  CheapFlightsService, RoutesService, OptionConverterService, PayloadService } from './services';
import { APP_CONFIG, APP_CONFIG_TOKEN } from '../../config/config';
import { SearchFormComponent } from './search-form/search-form.component';
import { AirportsComponent } from './airports/airports.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { FlightResultsComponent } from './flight-results/flight-results.component';
import { FlightResultComponent } from './flight-result/flight-result.component';
// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

interface StoreType {
  state: InternalStateType;
  restoreInputValues: () => void;
  disposeOldHosts: () => void;
}

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    HomeComponent,
    XLargeDirective,
    SearchComponent,
    SearchFormComponent,
    AirportsComponent,
    AutocompleteComponent,
    SearchPipe,
    FlightResultsComponent,
    FlightResultComponent
  ],
  /**
   * Import Angular's modules.
   */
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    AppRouteModule,
    RouterModule.forRoot(ROUTES, {
      useHash: Boolean(history.pushState) === false,
      preloadingStrategy: PreloadAllModules
    }),
  ],
  /**
   * Expose our Services and Providers into Angular's dependency injection.
   */
  providers: [
    environment.ENV_PROVIDERS,
    APP_PROVIDERS,
    AirportsService,
    CheapFlightsService,
    CountriesService,
    RoutesService,
    OptionConverterService,
    PayloadService,
    { provide: APP_CONFIG_TOKEN, useValue: APP_CONFIG }
  ]
})
export class AppModule {}
