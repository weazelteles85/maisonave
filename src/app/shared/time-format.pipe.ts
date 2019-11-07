import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {

  transform(value: number, args?: any): string {
    let hour = 'select';
    let minutes = 'select';
    let AMPM = 'select';

    if (value > 11.5) {
      AMPM = 'PM';
    } else {
      AMPM = 'AM';
    }
    if (value > 12.5) {
      hour = (Math.floor(value) - 12).toString();
    } else {
      hour = Math.floor(value).toString();
    }

    if (value % 1 !== 0) {
      minutes = '30';
    } else {
      minutes = '00';
    }
    if (value === 0) {
      return 'Closed';
    }
    return `${hour}:${minutes} ${AMPM}`;
  }

}
