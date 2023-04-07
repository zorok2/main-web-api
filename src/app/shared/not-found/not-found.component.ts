import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
@Component({
    selector: 'not-found',
    template: `
    <div class="alert alert-info">
    Yêu cầu tìm kiếm không tìm thấy dữ liệu. Yêu cầu thực hiện lúc {{timeSendRequest }}
    </div>
    `
})
export class NotFoundComponent implements OnInit {
    private timeSendRequest;
    constructor() {
    }
    ngOnInit() {
        this.timeSendRequest = moment(new Date()).format("HH:mm:ss ngày DD/MM/YYYY")
    }
}