import { Component, ViewChild, Input } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
    selector: 'progress-bar-modal',
    templateUrl: './progress-bar-modal.component.html'
})
export class ProgressBarModal {
    @ViewChild('modal') private modal: ModalDirective;
    max: number;
    private _value: number;
    private _percent: number;

    public set value(value) {
        this._value = value;
        this.percent = (this.value / this.max) * 100;
    }

    public get value() {
        return this._value;
    }

    public get percent() {
        return this._percent;
    }

    public set percent(value) {
        this._percent = value;
    }

    public show(initValue, max) {
        this.max = max;
        this.value = initValue;
        this.modal.show();
    }

    public hide() {
        this.modal.hide();
        this.value = 0;
    }
}