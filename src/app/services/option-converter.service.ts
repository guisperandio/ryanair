import { Injectable } from '@angular/core';
import { Option } from '../models';

@Injectable()
export class OptionConverterService {

  public convert(labelProp: string, valueProp: string, countryProp: string, filter: any, data: any[]): Option[] {
    if (data) {
      return data.map((element: any) => 
      ({ label: element[labelProp], value: element[valueProp], country: element[countryProp] }))
      .filter(function(data) {
        if (!filter) {
          return data;
        } else {
          if (filter.includes(data.value)) {
            return data.value;
          }
        }
      });
    }
  }
}
