import { Component, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import * as _ from 'lodash';
import { CookieConfig, Version } from '@util/variable';
import * as moment from 'moment'
@Injectable()
export class TokenService {
    private readonly TOKEN_KEY = 'user-token';
    constructor(private _cookieService: CookieService) {

    }
    /**
     * @function GetToken dưới Cookie
     */
    public getToken(): string {
        return this._cookieService.get(this.TOKEN_KEY);
    }

    /**
     * @function setToken lưu token dưới cookie
     * @param token chuỗi token
     */
    public setToken(token: string): void {
        this._cookieService.put(this.TOKEN_KEY, token);
    }

    /**
     * @function clearToken Xóa token dưới cookie
     */
    public clearToken(): void {
        this._cookieService.remove(this.TOKEN_KEY);
    }

    /**
     * @function isTokenExists check token có tồn tại dưới cookie hay không
     */
    public isTokenExists(): boolean {
        return _.isNil(this._cookieService.get(this.TOKEN_KEY));
    }

    /**
     * @function isVersionExists check version có tồn tại hay không và kiểm tra version
     */
    public isVersionExists(): boolean {
        if (_.isNil(this._cookieService.get(Version.VERSION))) {
            return _.isNil(this._cookieService.get(Version.VERSION));
        }
        let value = this._cookieService.get(Version.VERSION);
        return value !== Version.VERSION_ID;
    }

    /**
     * @function buildTokenForAjax 
     */
    public buildTokenForAjax(): any {
        return { 'Authorization': `JWT ${this.getToken()}`, 'app-key': Version.APP_ID };
    }

}
