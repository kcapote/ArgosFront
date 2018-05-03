import { Pipe, PipeTransform } from '@angular/core';
import { pipe } from 'rxjs';
import { Util } from '../util/util';

@Pipe({
  name: 'formatRut'
})
export class FormatRutPipe implements PipeTransform {

  transform(value: string): string {

    return  Util.formatRut(value);
  }



}
