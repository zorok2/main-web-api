import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ColorpickerDirective} from '@shared/forms/input/colorpicker.directive';
import {FileInputComponent} from '@shared/forms/input/file-input/file-input.component';
import {KnobDirective} from '@shared/forms/input/knob.directive';
import {MaskedInput} from '@shared/forms/input/masked-input.directive';
import {UiDatepickerDirective} from '@shared/forms/input/ui-datepicker.directive';
import {UiSpinner} from '@shared/forms/input/ui-spinner.directive';
import {XEditableComponent} from '@shared/forms/input/x-editable.component';
import {DuallistboxComponent} from '@shared/forms/input/duallistbox.component';
import {NouisliderDirective} from '@shared/forms/input/nouislider.directive'
import {IonSliderDirective} from '@shared/forms/input/ionslider.directive'
import {SmartSliderDirective} from '@shared/forms/input/smart-slider.directive'
import {SmartTagsDirective} from '@shared/forms/input/smart-tags.directive'
import {SmartTimepickerDirective} from '@shared/forms/input/smart-timepicker.directive'
import {SmartClockpickerDirective} from '@shared/forms/input/smart-clockpicker.directive'
// import {Select2Module} from "./select2/select2.module";
import {OnOffSwitchModule} from "@shared/forms/input/on-off-switch/on-off-switch.module";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [

    ColorpickerDirective,
    FileInputComponent,
    KnobDirective,
    MaskedInput,
    UiDatepickerDirective,
    UiSpinner,
    XEditableComponent,
    DuallistboxComponent,
    NouisliderDirective,
    IonSliderDirective,
    SmartSliderDirective,
    SmartTagsDirective,
    SmartTimepickerDirective,
    SmartClockpickerDirective,

  ],
  exports: [

    ColorpickerDirective,
    FileInputComponent,
    KnobDirective,
    MaskedInput,
    UiDatepickerDirective,
    UiSpinner,
    XEditableComponent,
    DuallistboxComponent,
    NouisliderDirective,
    IonSliderDirective,
    SmartSliderDirective,
    SmartTagsDirective,
    SmartTimepickerDirective,
    SmartClockpickerDirective,


    // Select2Module,
    OnOffSwitchModule,
  ]
})
export class SmartadminInputModule { }
