import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderby'
})
export class Orderby implements PipeTransform {

  transform(value: any, args?: any): any {
    args = args.split(',');
    let key = args[0];
    let order = args[1] === 'desc' ? -1 : 1;
    if (!Array.isArray(value)) return value;
    if (!value.length) return value;
    if (value[0][key])
      return value.sort((a: Object, b: Object) => {
        if (a[key] > b[key]) {
          return order;
        } else {
          return -order;
        }
      });
    return value.sort((a: any, b: any) => {
      if (a > b) {
        return order;
      } else {
        return -order;
      }
    });
  }

}
