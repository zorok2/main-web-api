import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'printHalfTime'
})
export class PrintHalfTimePipe implements PipeTransform {
    transform(time: string): string {
        return ' ' + moment(time).format('DD/MM/YYYY');
    }
}