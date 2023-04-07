import { Injectable } from '@angular/core';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { CookieService } from 'ngx-cookie';
import { CookieConfig } from '@util/variable';

@Injectable()
export class ManageStateService {

    constructor(private localStorageService: LocalStorageService,
        private sessionStorageService: SessionStorageService,
        private cookieService: CookieService) {
    }

    public save(key: string, value: any) {
        this.cookieService.putObject(key, value);
    }

    public saveWithExpired(key: string, value: any) {
        this.cookieService.put(key, value);
    }

    public load(key: string): any {
        return this.cookieService.getObject(key);
    }

    public saveSession(key: string, value: any) {
        this.sessionStorageService.store(key, value);
    }

    public loadSession(key: string): any {
        return this.sessionStorageService.retrieve(key);
    }

    public clear(key: string) {
        this.cookieService.remove(key);
    }

    public clearSession() {
        this.sessionStorageService.clear();
    }

    public removeSession(key: string) {
        this.sessionStorageService.clear(key)
    }
}