import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { IMyDpOptions, IMyDateModel, IMyDate } from 'mydatepicker';

@Component({
    selector: 'date-time-picker',
    template: `
    <my-date-picker [options]="myDatePickerOptions"
    (dateChanged)="onDateChanged($event)" [selDate]="selDate||''" [placeholder]='placeholder'></my-date-picker>
    `
})
export class DateTimePickerContactsComponent implements OnInit {
    @Input() date_chosen: string;
    @Input() placeholder: string = 'dd/MM/yyyy';


    /**
     * sự kiện được trả về
     */
    @Output() datetimeTrigger = new EventEmitter();
    /**
     * gia tri mac dinh
     */
    private selDate: any;
    /**
     * cấu hình cho datetime picker
     */
    private myDatePickerOptions: IMyDpOptions = {
        todayBtnTxt: 'Hôm nay',
        dateFormat: 'dd/mm/yyyy',
        editableDateField: false,
        openSelectorOnInputClick: true,
    };
    constructor() {
    }
    ngOnInit() {
        if (this.date_chosen) {
            let d: Date = new Date(this.date_chosen);
            this.selDate = {
                day: d.getDate(),
                year: d.getFullYear(),
                month: d.getMonth() + 1
            }
        }
    }
    //user reinit component
    public init() {
        if (this.date_chosen) {
            let d: Date = new Date(this.date_chosen);
            this.selDate = {
                day: d.getDate(),
                year: d.getFullYear(),
                month: d.getMonth() + 1
            }
        }
    }
    /**
     * sự kiện khi chọn datetime
     */
    onDateChanged = ($event: IMyDateModel) => {
        /**
         * neu nhu clear thi se tro lai thanh placeholder
         */
        if (!$event.jsdate)
            this.selDate = ""
        this.datetimeTrigger.emit($event.jsdate);
    }
    onLoadDate(d) {
        this.selDate = d;
    }
}