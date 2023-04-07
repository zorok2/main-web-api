import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UiValidateDirective} from "@shared/forms/validation/ui-validate.directive";
import {BootstrapValidatorDirective} from "@shared/forms/validation/bootstrap-validator.directive";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    UiValidateDirective,
    BootstrapValidatorDirective
  ],
  exports: [
    UiValidateDirective,
    BootstrapValidatorDirective
  ]
})
export class SmartadminValidationModule { }
