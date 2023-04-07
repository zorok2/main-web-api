import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'printTime'
})
export class PrintTimePipe implements PipeTransform {
    transform(time: string): string {
        return ' ' + moment(time).locale('vi').fromNow();
    }
}