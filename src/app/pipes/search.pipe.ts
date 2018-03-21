import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
@Injectable()
export class SearchPipe implements PipeTransform {
  transform (items: any[], searchText: any): any {
    if ( !items || !searchText ) {
      return items;
    }
    return items.filter(item => item.label.indexOf(searchText) !== -1 || item.country.name.indexOf(searchText) !== -1);
  }
}
