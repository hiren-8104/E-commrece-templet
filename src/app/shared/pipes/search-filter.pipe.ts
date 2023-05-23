import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(value: any[], args: any): any {
    const regexp = new RegExp(args, 'g');

    if (args) {
      return value.filter(filter => regexp.test(filter.title));
    }
    return value;
  }

}
