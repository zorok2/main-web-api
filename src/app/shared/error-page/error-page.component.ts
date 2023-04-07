import { Component, ViewChild, Input } from '@angular/core';
import { Router } from "@angular/router";

@Component({
    selector: 'error-page',
    templateUrl: './error-page.component.html',
    styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent {

    @Input() icon
    @Input() title
    @Input() description
    @Input("code") set values(value) {
        switch (value) {
            case 1:
                this.icon = "fa fa-exclamation-circle fg-crimson"
                this.title = "Hiện tại không kết nối được tới server, xin hãy kiểm tra thiết bị có kết nối internet hay không"
                this.description = "Nếu có internet mà lỗi này vẫn hiện xin hãy báo lại với chúng tôi"
                break;
            case 2:

                break;
            default:
                break;
        }
    }


    constructor(private router: Router) {

    }

    private goToDashBoard = () => {
        this.router.navigate(['/admin/dashboard']);
    }
}