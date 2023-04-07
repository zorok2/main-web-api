import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { CustomAutocompleteComponent } from '@shared/forms/form-element/ng-autocomplete/ng-autocomplete.component';

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      NgSelectModule,
    ],
    declarations: [CustomAutocompleteComponent],
    exports: [CustomAutocompleteComponent]
})
export class HutechAutocompleteModule { }