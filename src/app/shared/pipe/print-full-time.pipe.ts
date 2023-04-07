import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'printFullTime'
})
export class PrintFullTimePipe implements PipeTransform {
    transform(time: string): string {
        return ' ' + moment(time).format('DD/MM/YYYY HH:mm:ss');
    }
}