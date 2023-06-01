import { Pipe, PipeTransform } from '@angular/core';
import { ipAddress } from '../constant/ipaddress';

@Pipe({
  name: 'imgconcate'
})
export class ImgconcatePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    var concateValur = ipAddress.concat(value);
    return concateValur;
  }

}
