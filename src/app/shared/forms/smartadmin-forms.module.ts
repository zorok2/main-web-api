

import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { CommonModule } from "@angular/common";
import { SmartadminInputModule } from "@shared/forms/input/smartadmin-input.module";
import { SmartadminValidationModule } from "@shared/forms/validation/smartadmin-validation.module";
import { DropzoneModule } from "@shared/forms/dropzone/dropzone.module";
import { SmartadminWizardsModule } from "@shared/forms/wizards/smartadmin-wizards.module";
import { BaCheckbox } from "@shared/forms/form-element/baCheckbox";
import { HutechSelect2Module } from "@shared/forms/form-element/select2/ng2-select2";
import { HutechAutocompleteModule } from "./form-element/ng-autocomplete/ng-autocomplete.module";
import { HutechNgSelectModule } from "./form-element/ng-select/ng-select.module";

@NgModule({

  imports: [FormsModule, CommonModule, HutechSelect2Module,
    HutechNgSelectModule,
    HutechAutocompleteModule],
  declarations: [
    BaCheckbox
  ],
  exports: [

    SmartadminInputModule,

    SmartadminValidationModule,

    DropzoneModule,
    SmartadminWizardsModule,
    BaCheckbox,
    HutechSelect2Module,
    HutechNgSelectModule,
    HutechAutocompleteModule
  ]

})
export class SmartadminFormsModule { }
