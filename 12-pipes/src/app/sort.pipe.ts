import { Pipe, PipeTransform } from '@angular/core';
import { Server } from './app.component';

@Pipe({
  name: 'sort',
  pure: false,
})
export class SortPipe implements PipeTransform {
  transform(value: Server[], propName: string): unknown {
    console.log('%csort.pipe.ts line:9 value', 'color: #007acc;', value);
    return value.sort((a: Server, b: Server) => {
      if (a[propName] > b[propName]) {
        return 1;
      } else {
        return -1;
      }
    });
  }
}
