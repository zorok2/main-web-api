import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../components/auth/auth.service';

@Injectable()
export class ResetPasswordGuard implements CanActivate {

    constructor(private _router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url;

        if (!route.queryParams.token) {
            this._router.navigate(['admin/login']);
            return false;
        }
        return true;
    }
}
