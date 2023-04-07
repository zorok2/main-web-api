import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SmartadminLayoutModule } from '@shared/layout/layout.module';
import { D3MapComponent } from '@shared/graphs/d3/d3-map.component';



@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [D3MapComponent],
  exports: [D3MapComponent],
})
export class D3Module { }
