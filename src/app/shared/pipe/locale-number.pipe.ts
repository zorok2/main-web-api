import { Pipe, PipeTransform } from '@angular/core';
import { CookieService } from "ngx-cookie";
import * as numeral from 'numeral'
import * as _ from "lodash";
import 'numeral/locales';

@Pipe({
    name: 'localeNumber'
})
export class LocaleNumberPipe implements PipeTransform {
    private lang;

    constructor(private _cookieService: CookieService) {
        this.lang = this._cookieService.get("lang") || 'en'
        // numeral.locale(this.lang)
        numeral.locale("en")
    }

    transform(value, unit = "") {
        if (_.isFinite(Number(value))) {
            return numeral(Number(value)).format(this.lang === "vi" ? '0,0.00' : '0,0.00') + " " + unit;
        }
        return value + " " + unit;
    }

    detransform(value) {
        return numeral(value).value();
    }
}