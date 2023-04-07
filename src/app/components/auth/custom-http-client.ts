import { Injectable } from '@angular/core';

import { HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent, HttpErrorResponse, HttpParams, } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Version } from '@util/variable';
import { TokenService } from '@components/auth/token.service';
import { Router } from '@angular/router';
import { NotificationService } from '@shared/utils/notification.service';

@Injectable()
export class HttpClientCustom implements HttpInterceptor {

    constructor(
        private _tokenService: TokenService,
        private router: Router,
        private notificationService: NotificationService
    ) {
    }


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<
        HttpSentEvent
        | HttpHeaderResponse
        | HttpProgressEvent
        | HttpResponse<any>
        | HttpUserEvent<any>> {
        return next.handle(this.setAuthorizationHeader(req))
            .catch((event) => {
                if (event instanceof HttpErrorResponse) {
                    return this.catch401(event);
                }
            });
    }

    private setAuthorizationHeader(req: HttpRequest<any>): HttpRequest<any> {
        // Make a clone of the request then append the Authorization Header
        // Other way of writing :
        // return req.clone({headers: req.headers.set('Authorization', this.authService.token )});
        const token = this._tokenService.getToken();
        return req.clone({
            setHeaders: {
                Authorization: `JWT ${token}`,
                "app-key": Version.APP_ID,
            },

        })

    }

    // Response Interceptor
    private catch401(error: HttpErrorResponse): Observable<any> {
        // Check if we had 401 response
        if (error.status === 401) {
            // redirect to Login page for example
            this.notificationService.smartMessageBox({
                title: "Phiên bản làm việc hết hạn?",
                content: "Phiên bản làm việc hết hạn. Vui lòng đăng nhập lại",
                buttons: '[Đăng nhập lại]'
            }, (ButtonPressed) => {
                if (ButtonPressed === "Đăng nhập lại") {
                    this.router.navigate(['/admin/login']);

                }
            })
            return Observable.throw(error);
        }
        return Observable.throw(error);
    }
}


