import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kicker'
})
export class Kicker implements PipeTransform {

  transform(value: any, args?: any): any {
    if (typeof value !== 'string') return value;
    return value.substr(0, args || 100);

  }

}
