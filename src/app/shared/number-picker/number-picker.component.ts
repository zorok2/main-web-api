import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
@Component({
    selector: 'number-picker',
    templateUrl: 'number-picker.component.html',
    styleUrls: ['number-picker.component.scss']
})
export class NumberPickerComponent implements OnInit {
    @Output() valueChange = new EventEmitter();
    @Input() min?: number;
    @Input() max?: number;
    @Input() step?: number;
    @Input() value: any;
    ngOnInit(): void {
        this.value = parseInt(this.value);
    }
    down() {
        if (this.value == this.min) {
            this.value = this.max
        } else {
            this.value = this.value - 1;
        }
        this.valueChange.emit(this.value);
    }
    up() {
        if (this.value == this.max) {
            this.value = this.min
        } else {
            this.value = this.value + 1;
        }
        this.valueChange.emit(this.value);
    }
    change() {
        // if (this.value < this.min) {
        //     this.value = this.min
        // } else if (this.value > this.max) {
        //     this.value = this.max
        // }
    }
}