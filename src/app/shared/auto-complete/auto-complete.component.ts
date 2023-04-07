import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { ManageStateService } from "@shared/manage-state.service";
import { IAddOnComponent } from "@shared/add-on.interface";
import 'rxjs/add/observable/interval';

export interface OptionAutoComplete {
    textPlaceholder?: string;
    arrayValueShow: any;
    arrayValueShowItem: any;
    nameValueImage?: string;
    keyCookie?: string;
    loadCookie?: boolean;
}

@Component({
    selector: 'auto-complete',
    templateUrl: 'auto-complete.component.html',
    styleUrls: ['auto-complete.component.scss']
})
export class AutoCompleteComponent implements OnInit, IAddOnComponent {
    public valueInput: string;
    private MaNVSelected: string;
    @Output() valueChange = new EventEmitter();
    @Output() valueSelected = new EventEmitter();
    // @Input() textPlaceholder: string;
    // @Input() arrayValueShow: any;
    // @Input() arrayValueShowItem: any;
    // @Input() nameValueImage: string;
    // @Input() keyCookie: string;
    // @Input() loadCookie: boolean = true;
    subTimer = Observable.interval(500);
    subTimerEnter = Observable.interval(1000);
    private sub: any;
    private subEnter: any;
    private data: any = [];
    private listValueSelect: any = [];
    private indexSelected: number = 0;
    private _keyValue = 'auto-complete-search-';
    private selected: boolean = false;
    private _option: OptionAutoComplete;
    private defaultOption: OptionAutoComplete = {
        loadCookie: true,
        textPlaceholder: 'Nhập nội dung',
        arrayValueShow: ['null'],
        arrayValueShowItem: ['null']
    }
    ngOnInit(): void {
        if (!this._option) {
            this._option = this.defaultOption;
        }
        if (this._option.loadCookie) {
            this.loadState();
        }
    }
    constructor(private manageStateService: ManageStateService) {

    }
    @Input()
    public get option() {
        return this._option;
    }
    public set option(value) {
        if (value != undefined) {
            this._option = value;
        }
    }
    private valueInputChange(value: any) {
        this.selected = false;
        if (value.key != "Enter" && value.key != "ArrowDown" && value.key != "ArrowUp") {
            //delay 500ms mới send value to client
            if (!this.sub || this.sub.closed) {
                this.sub = this.subTimer.subscribe(x => {
                    this.pushValueChange();
                })
            }
        }
    }
    private pushValueChange() {
        this.saveState();
        this.valueChange.emit(this.valueInput);
        this.sub.unsubscribe();
    }
    private selectItem(index: number) {
        var valueShow = [];
        if (this.data.length > 0) {
            for (let item of this._option.arrayValueShowItem) {
                valueShow.push(this.data[index][item]);
                this.MaNVSelected = this.data[index].ma_nhan_vien;
                this.valueInput = valueShow.join(' - ');
                //build xong value show thi luu cookie
                this.saveState();
            }
            this.data = [];
            this.selected = true;
            this.valueSelected.emit(this.listValueSelect[index])
        }
    }
    public parseData(listData) {
        this.data = [];
        if (listData) {

            var i = 0;
            for (let item of listData) {
                var item1 = [];
                for (let item2 of this._option.arrayValueShow) {
                    item1[item2] = item[item2];
                }
                if (this._option.nameValueImage) {
                    item1[this._option.nameValueImage] = item[this._option.nameValueImage];
                }
                this.listValueSelect[i] = item;
                this.data[i] = item1;
                i++;
            }
        }
    }

    public loaddata(listData) {
        this.data = [];
        if (listData) {
            var i = 0;
            for (let item of listData) {
                var item1 = [];
                for (let item2 of this._option.arrayValueShow) {
                    item1[item2] = item[item2];
                }
                if (this._option.nameValueImage) {
                    item1[this._option.nameValueImage] = item[this._option.nameValueImage];
                }
                i++;
            }
        }
        this.valueInput = listData[0].ma_nhan_vien + ' - ' + listData[0].ho_ten;
    }
    
    Down(event: KeyboardEvent) {
        if (this.indexSelected < this.data.length - 1)
            this.indexSelected = this.indexSelected + 1;
    }
    Up(event: KeyboardEvent) {
        if (this.indexSelected > 0)
            this.indexSelected = this.indexSelected - 1;
    }
    Enter(event: KeyboardEvent) {
        this.selectItem(this.indexSelected);
    }
    Clear() {
        this.valueInput = null;
    }
    private saveState() {
        this.manageStateService.save(this._keyValue + ":" + this._option.keyCookie, this.MaNVSelected);
    }
    private loadState() {
        this.valueInput = this.manageStateService.load(this._keyValue + ":" + this._option.keyCookie);
    }
    public getState() {
        return { name: 'ma_nguoi_xin_so', value: this.MaNVSelected };
    }
} 
