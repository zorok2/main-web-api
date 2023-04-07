import { Component, OnInit, Input, forwardRef, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { UrlVariable } from '@util/variable';
declare var $: any;

@Component({
    selector: 'select2-input',
    template: `
    <select class="select2" multiple="multiple" style="width:100%;" data-placeholder="Mời bạn chọn hoặc nhập tag" data-allow-clear="true"></select> 
    `,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => Select2InputComponent),
        }
    ]
})
export class Select2InputComponent implements OnInit {
    /**
     * @description Danh sách đầy đủ 
     * Khai báo trong select2 -> data:array
     * [array.id] -> chứa mảng id (value)
     * [array.text] -> chứa text (textcontent)
     * tạo ra thẻ tag HTML:<option value=array.id[index]>array.text[index]</option>
     */
    @Input() public array: Array<{ id: number, text: string }> = [];
    /**
    * @description Danh sách được chọn sẵn (ví dụ: getone -> đã chọn sẵn 1 vài cái)
    * [arrayselected.id] -> chứa mảng id (value)
    * [arrayselected.text] -> chứa text (textcontent)
    * tạo ra thẻ tag HTML:<option value=arrayselected.id[index]>arrayselected.text[index]</option>
    */
    @Input() public arrayselected: Array<{ id: number, text: string }> = [];

    @Input() public allowclear: boolean = true;

    @Output() public onChangeValue: EventEmitter<Array<{ id: number, text: string }>> = new EventEmitter<Array<{ id: number, text: string }>>();

    /**
    * @function hàm khởi tạo select2
    * @description 
    * tạo thẻ option đã được chọn sẵn
    * tạo thẻ select2
    * tạo sự kiện cho select2 
    */
    ngOnInit() {
        this.deleteSameValueSelected();// xóa giá trị trùng
        this.initSelect2(); // tạo select2
        this.initSelectOption(); // tạo các thẻ options
        this.initEvents(); // events chọn giá trị
    }

    /**
     * @function tạo select2 cho select
     */
    private initSelect2 = () => {
        $(".select2").select2({
            data: this.array, // get dữ array
            allowClear: this.allowclear // cho phép xóa toàn bộ cái đã chọn trong arrayselected
        });
    }

    /**
     * @function xóa những cái đã được chọn rồi
     * @description
     * 1/ dùng arrayselected tìm những cái có trong array 
     * 2/ tìm ra index trong id và text
     * 3/ -> xóa id và text theo index tìm được
     */

    private deleteSameValueSelected = () => {
        // kiểm tra coi có tồn tài ko
        if (this.arrayselected)
            // kiểm tra có phần tử ko
            if (this.arrayselected.length > 0) {
                // so sánh giá trị trong mảng đã có và mảng tổng thể -> trùng xóa bên tổng thể
                this.arrayselected.forEach((value, i) => {
                    let index = this.array.findIndex(value_a => value_a.id == value.id);
                    this.array.splice(index, 1);
                });
            }
    }


    /**
     * @function khởi tạo thẻ option
     * @description
     * chỉ khởi tạo những cái đã được chọn sẵn
     */
    private initSelectOption = () => {
        // kiểm tra xem có phần tử trong mảng ko nếu ko có thì không cần tạo thẻ option
        if (this.arrayselected.length)
            this.arrayselected.forEach((value) => {
                $("select.select2").append(`<option value=${value.id} disabled selected="selected">${value.text}</option>`);
            });
    }


    /**
     * @function chọn giá trị hoặc xóa giá trị đã chọn
     * @description 
     * dùng để chứa danh sách giá trị mà người dùng chọn
     * 1 mảng chứa id -> lấy evt.params.data.id
     * 1 mảng chứa name -> lấy evt.params.data.text
     */
    private initEvents = () => {
        // thêm
        $('.select2').on('select2:select', (evt) => {
            evt.params.data.disabled = true;
            this.arrayselected.push({
                id: evt.params.data.id,
                text: evt.params.data.text
            });
            this.onChangeValue.emit(this.arrayselected);
        });

        //xóa
        $('.select2').on('select2:unselect', (evt) => {
            evt.params.data.disabled = false;
            let index = this.arrayselected.findIndex(value => value.id == evt.params.data.id);
            this.arrayselected.splice(index, 1);
            this.onChangeValue.emit(this.arrayselected);
        });
    }

}
