import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DropzoneDirective} from "@shared/forms/dropzone/dropzone.directive";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DropzoneDirective],
  exports: [DropzoneDirective],
})
export class DropzoneModule { }
