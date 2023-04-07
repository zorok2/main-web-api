import { Directive, ElementRef, Renderer, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { CookieConfig } from "@util/variable";
import * as _ from 'lodash'

@Directive({
    selector: '[myauthen]',
})
export class AuthDirective implements OnInit {
    @Input() menu: string = '';
    @Input() removes: Array<string> = [];//Remove menu khi có những menu này
    constructor(public element: ElementRef, public renderer: Renderer, private _cookieService: CookieService) {
    }

    ngOnInit() {
        // console.log(this.menu)
        const keys = this._cookieService.get(CookieConfig.AUTHEN_COOKIE);
        // console.log(keys)
        if ((!keys || keys.length === 0) && +this.menu !== -1) {
            // console.log(this.menu)

            this.element.nativeElement.remove();
            return;
        }
        const authen = keys.split(",").find(x => +x === +this.menu);
        // console.log(keys.split(","))
        if (!authen && this.menu && +this.menu !== -1) {
            // console.log(this.menu, "bi xoa")
            this.element.nativeElement.remove();
        } else {
            this.removes.forEach(x => {
                let index = _.findIndex(keys.split(","), o => {
                    return +o === +x
                })
                if (index >= 0) {
                    this.element.nativeElement.remove();
                }
            })
        }
    }
}
