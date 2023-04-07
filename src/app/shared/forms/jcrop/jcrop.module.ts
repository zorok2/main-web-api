import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldComponent } from '@shared/forms/jcrop/components/field.component';
import { FieldsComponent } from '@shared/forms/jcrop/components/fields.component';
import { JcropComponent } from '@shared/forms/jcrop/components/jcrop.component';
import {CropActions} from "@shared/forms/jcrop/actions/crop.actions";
import { OptionRadioComponent } from '@shared/forms/jcrop/components/option-radio.component';
import { OptionToggleComponent } from '@shared/forms/jcrop/components/option-toggle.component';
import {OptionsActions} from "@shared/forms/jcrop/actions/options.actions";
import {FormsModule} from "@angular/forms";
import { JcropPreviewComponent } from '@shared/forms/jcrop/components/jcrop-preview.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [FieldComponent, FieldsComponent, JcropComponent,
    OptionRadioComponent, OptionToggleComponent, JcropPreviewComponent],
  exports: [FieldComponent, FieldsComponent, JcropComponent,
    OptionRadioComponent, OptionToggleComponent, JcropPreviewComponent],
  providers: [CropActions, OptionsActions]
})
export class JcropModule { }
