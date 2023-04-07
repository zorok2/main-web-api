import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SummernoteDirective} from '@shared/forms/editors/summernote.directive'
import {SummernoteAttachDirective} from '@shared/forms/editors/summernote-attach.directive'
import {SummernoteDetachDirective} from '@shared/forms/editors/summernote-detach.directive'
import {MarkdownEditorDirective} from '@shared/forms/editors/markdown-editor.directive'

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SummernoteDirective,
    SummernoteAttachDirective,
    SummernoteDetachDirective,
    MarkdownEditorDirective,
  ],
  exports: [
    SummernoteDirective,
    SummernoteAttachDirective,
    SummernoteDetachDirective,
    MarkdownEditorDirective,
  ]
})
export class SmartadminEditorsModule { }
