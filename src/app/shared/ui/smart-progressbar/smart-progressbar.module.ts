import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProgressbarDirective} from "@shared/ui/smart-progressbar/progressbar.directive";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ProgressbarDirective],
  exports: [ProgressbarDirective],
})
export class SmartProgressbarModule { }
