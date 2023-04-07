import { Pipe, PipeTransform } from '@angular/core';
import { NumberFormatUtil } from "@util/number-format-util";

@Pipe({
    name: 'numberFormatLocale'
})
export class NumberFormatPipe implements PipeTransform {
    transform(value, locale) {
        if (locale === 'VN') {
            value = NumberFormatUtil.toVNLocale(value);
            value = NumberFormatUtil.numFormat(value);
        }
        return value;
    }
}