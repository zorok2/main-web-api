import { NgModule } from '@angular/core';
import { CustomNgSelectComponent } from '@shared/forms/form-element/ng-select/ng-select.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      NgSelectModule,
    ],
    declarations: [CustomNgSelectComponent],
    exports: [CustomNgSelectComponent]
})
export class HutechNgSelectModule { }