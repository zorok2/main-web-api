import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryComponent } from '@shared/ui/gallery/gallery.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [GalleryComponent],
  exports: [GalleryComponent],
})
export class SmartadminGalleryModule { }
