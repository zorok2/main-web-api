import { Component, Input, Self, forwardRef, OnChanges } from '@angular/core';
import { ControlValueAccessor, NgModel, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ba-checkbox',
  styleUrls: ['./baCheckbox.scss'],
  templateUrl: './baCheckbox.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BaCheckbox),
      multi: true
    }
  ]
})
export class BaCheckbox implements ControlValueAccessor, OnChanges {
  @Input() disabled: boolean;
  @Input() label: string;
  @Input() value: string;
  @Input() baCheckboxClass: string;
  @Input() checked: boolean = false;
  private propagateChange = (_: any) => { };

  // public model: NgModel;
  public state: boolean;

  public constructor() {
    // this.model = state;
    // state.valueAccessor = this;
  }

  public onChange(value: any): void {
    this.checked = value;
    this.state = value;
    this.propagateChange(value);
  }

  ngOnChanges(value) {
    if (value.checked) {
      this.state = value.checked.currentValue;
    }

  }

  public onTouch(value: any): void { }
  public writeValue(state: any): void {
    this.state = state;
  }

  public registerOnChange(fn: any): void {
    this.propagateChange = fn;
    // this.onChange = function (state: boolean) {
    //   this.writeValue(state);
    //   // this.model.viewToModelUpdate(state);
    // }
  }

  public registerOnTouched(fn: any): void { this.onTouch = fn; }
}
