import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderby'
})
export class Orderby implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!Array.isArray(value)) return value;
    if (value[0][args])
      return value.sort((a: Object, b: Object) => {
        if (a[args] > b[args]) {
          return 1;
        } else {
          return -1;
        }
      });
    return value.sort((a: any, b: any) => {
      if (a > b) {
        return 1;
      } else {
        return -1;
      }
    });
  }

}
