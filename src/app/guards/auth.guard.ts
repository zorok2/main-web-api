import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../components/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private _authService: AuthService, private _router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        /**
         * Lấy URL hiện tại user đang cố truy cập
         */
        let url: string = state.url;
        /**
         * Check Login
         */
        return this.checkLogin(url);
    }

    private checkLogin(url: string): boolean {
        /**
         * Nếu có token dưới cookie thì pass
         */
        if (this._authService.isLoggedIn()) {
            return true;
        }
        /**
         * Nếu không có thì lưu lại URL
         * chuyển qua trang Login
         */
        this._authService.redirectUrl = url;
        this._router.navigate(['admin/login']);
        return false;
    }
}
