import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
/**
 * Đây là error modal, mục đích là dùng để hiện lỗi
 * Khi hiện lên modal sẽ chặn mọi input từ bàn phím, chuột tới trang sở hữu modal,
 * Vì thế nên khuyên dùng khi gặp lỗi nặng hay lỗi mà không thể nào tiếp tục được
 * 
 * Nhận vào 3 giá trị
 *  + title -> tiêu đề lỗi
 *  + message -> nội dung lỗi
 *  + buttonBackOption -> là một object gồm 2 properties text, fn
 *      + text -> là tiêu đề của nút back trong modal
 *      + fn -> là hàm mà nút back đó sẽ gọi khi được ấn vào
 */
@Component({
    selector: 'error-modal',
    templateUrl: './error-modal.component.html',
    styleUrls: ['./error-modal.component.css']
})
export class ErrorModalComponent {
    private _message: string = "";
    private _title: string = "";
    private _buttonBackOption = {};
    @ViewChild('modal') private modal: ModalDirective;

    public show(title: string, message: string, buttonBackOption: { text: string, fn: Function }) {
        this._message = message;
        this._title = title;
        this._buttonBackOption = buttonBackOption;
        this.modal.show();
    }

    public hide() {
        this.modal.hide();
    }
}