import { Pipe, PipeTransform } from '@angular/core';
import { Server } from './app.component';

@Pipe({
  name: 'filter',
  pure: false,
})
export class FilterPipe implements PipeTransform {
  transform(value: Server[], filter: string, propName: string): Server[] {
    if (value.length === 0 || filter === '') {
      return value;
    }

    const result = [];
    for (const item of value) {
      if (item[propName] === filter) {
        result.push(item);
      }
    }
    return result;
  }
}
