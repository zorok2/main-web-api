import { Component, Input, forwardRef, ViewChild, ViewEncapsulation, ChangeDetectionStrategy, EventEmitter, Output, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { Observable } from 'rxjs/Observable';
import { concat } from 'rxjs/observable/concat';
import { of } from 'rxjs/observable/of';
import { debounceTime, distinctUntilChanged, tap, switchMap, catchError, } from 'rxjs/operators';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";
import { map } from "rxjs/operator/map";
import * as _ from 'lodash';
@Component({
    selector: 'custom-ng-select',
    template: `
    <ng-select 
        #select
        [items]="observable | async" 
        [bindLabel]="bindLabel"
        [bindValue]="bindValue"
        [placeholder]="placeholder"
        [hideSelected]="hideSelected"
        [typeahead]="input" 
        [loading]="loading"
        [multiple]="multiple"
        [(ngModel)]="selected"
        (change)="onChange($event)"
        (open)="onOpen($event)"
        (close)="onClose($event)"
        (focus)="onFocus($event)"
        (blur)="onBlur($event)"
        (clear)="onClear($event)"
        (add)="onAdd($event)"
        (scrollToEnd)="onScrollToEnd($event)"
        (remove)="onRemove($event)"
        >
        <ng-template ng-header-tmp *ngIf="hasSelectAll">
            <button (click)="selectAll()" class="btn btn-sm btn-primary">Chọn tất cả</button>
            <button (click)="unselectAll()" class="btn btn-sm btn-primary">Bỏ chọn tất cả</button>
        </ng-template>
        <ng-template ng-option-tmp let-item="item">
            <div class="media ac-media">
                <img src="{{getProp(item,bindImage)}}" *ngIf="bindImage" class="mr-3 ac-image" (error)="setDefaultImage($event)">
                <div class="media-body">
                <h5 class="mt-0">{{getProp(item,bindLabel)}}</h5>
                <small *ngIf="bindDes">{{getProp(item,bindDes)}}</small>
                </div>
            </div>
        </ng-template>
        <ng-template ng-typetosearch-tmp>
            <div class="ng-option disabled">
               Nhập để tìm kiếm ...
            </div>
        </ng-template>
        <ng-template ng-notfound-tmp let-searchTerm="searchTerm">
            <div class="ng-option disabled">
                Không tìm thấy dữ liệu cho "{{searchTerm}}"
            </div>
        </ng-template>
        <ng-template ng-loadingtext-tmp let-searchTerm="searchTerm">
            <div class="ng-option disabled">
                Đang lấy dữ liệu cho "{{searchTerm}}"
            </div>
        </ng-template>
    </ng-select>`,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CustomNgSelectComponent),
            multi: true
        }
    ]
})
export class CustomNgSelectComponent implements OnInit, ControlValueAccessor {
    @ViewChild("select") select;
    @Input() api: any;
    @Input() bindLabel: string;
    @Input() bindValue: string;
    @Input() multiple: boolean = false;
    @Input() placeholder: string = 'Chọn tag';
    @Input() hideSelected: boolean = true;
    @Input() hasSelectAll: boolean = false;

    @Input() bindImage: string;
    @Input() bindDes: string;
    @Input() defaultImage: string;

    @Output() open = new EventEmitter();
    @Output() close = new EventEmitter();
    @Output() focus = new EventEmitter();
    @Output() blur = new EventEmitter();
    @Output() clear = new EventEmitter();
    @Output() add = new EventEmitter();
    @Output() scrollToEnd = new EventEmitter();
    @Output() remove = new EventEmitter();
    @Output() change = new EventEmitter();

    private observable: any;
    private input = new Subject<string>()
    private loading;
    private selected = [];
    private list;
    private errorImage = false;

    constructor() {
    }

    ngOnInit() {
        this.observable = concat(
            of([]), // default items
            this.input.pipe(
                debounceTime(500),
                distinctUntilChanged(),
                switchMap(term => this.api(term).pipe(
                    catchError(() => of([])), // empty list on error
                    tap((items) => {
                        this.list = items;
                        this.loading = false
                    }),
                )),
            )
        );
    }

    setDefaultImage(event) {
        if (this.defaultImage) {
            event.target.src = this.defaultImage;
        } else {
            this.errorImage = true;
        }
    }

    getProp(object, path) {
        return _.at(object, path)
    }
    private onChangeCb: (_: any) => void = (e) => { };
    private onTouchedCb: () => void = () => { };
    public writeValue(value): void { this.selected = value }
    public registerOnChange(fn: any): void { this.onChangeCb = fn; }
    public registerOnTouched(fn: any): void { this.onTouchedCb = fn; }
    public setDisabledState?(isDisabled: boolean): void {
        throw new Error("Method not implemented.");
    }

    private onChange(event) {
        this.select.open();
        this.change.emit(event)
        this.onChangeCb(this.selected);
    }

    private onOpen(event) {
        this.open.emit(event)
    }
    private onClose(event) {
        this.close.emit(event)
    }
    private onFocus(event) {
        this.input.next('')
        this.focus.emit(event)
    }
    private onBlur(event) {
        this.blur.emit(event)
    }
    private onClear(event) {
        this.clear.emit(event)
    }
    private onAdd(event) {
        this.add.emit(event)
    }
    private onScrollToEnd(event) {
        this.scrollToEnd.emit(event)
    }
    private onRemove(event) {
        this.remove.emit(event)
    }

    private selectAll() {
        this.selected = this.list.map(x => x);
    }

    private unselectAll() {
        this.selected = [];
    }

}
