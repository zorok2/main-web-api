import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NgxPaginationModule } from 'ngx-pagination';
import { NgSpinKitModule } from 'ng-spin-kit';
import { ModalModule as Ng2BootStrapModalModule } from 'ngx-bootstrap';
import { DatepickerModule } from 'ngx-bootstrap/datepicker';
import { MyDatePickerModule } from 'mydatepicker';
import { TextMaskModule } from 'angular2-text-mask';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { FileUploadModule } from 'ng2-file-upload';
import { AlertModule, AlertConfig } from 'ngx-bootstrap/alert';
import { Ng2Webstorage } from 'ngx-webstorage';
import { CKEditorModule } from "ng2-ckeditor";
// import { QuillModule } from 'ngx-quill';

// import { NgaModule } from '../theme/nga.module';
import { LoaderComponent } from '@shared/loader/loader.component';
import { PagingComponent } from '@shared/paging/paging.component';
import { Select2InputComponent } from '@shared/select2-input.component';
import { ErrorModalComponent } from '@shared/error-modal/error-modal.component';
import { NumberFormatPipe } from '@shared/number-format.pipe';
import { ProgressBarModal } from '@shared/process-bar-modal/progress-bar-modal.component';
import { FileUploadComponent } from '@shared/file-upload/file-upload.component';
import { FileSystemService } from '@shared/file-system.service';
import { CutTextPipe } from '@shared/pipe/cut-text.pipe';
import { PrintTimePipe } from '@shared/pipe/print_time.pipe';
import { DecodeHTMLPipe } from '@shared/pipe/decode-html.pipe';
import { SafeHtmlPipe } from '@shared/pipe/safeHTML.pipe';
import { PrintHalfTimePipe } from "@shared/pipe/print-half-time.pipe";
import { PrintFullTimePipe } from "@shared/pipe/print-full-time.pipe";
import { DateTimePickerContactsComponent } from "@shared/date-time-picker/date-time-picker.component";
import { Safe2 } from "@shared/pipe/styletrust.pipe";
import { MinhChungModalComponent } from "@shared/minh-chung-modal/minh-chung-modal.component";
import { ImageUploadComponent } from "@shared/image-upload/image-upload.component";
import { ErrorPageComponent } from "@shared/error-page/error-page.component";
import { ImageUploadNewsComponent } from '@shared/image-upload-news/image-upload.component';
import { FileUploadMultiComponent } from '@shared/file-upload-multi/file-upload-multi.component';
import { FileUploadSingleComponent } from '@shared/file-upload-single/file-upload-single.component';
import { NumberPickerComponent } from '@shared/number-picker/number-picker.component';
import { NotFoundComponent } from '@shared/not-found/not-found.component';
import { MegerText } from '@shared/pipe/merge-text.pipe';
import { SmartadminModule } from '@shared/smartadmin.module';


@NgModule({
    imports: [
        CommonModule,
        CKEditorModule,
        NgxPaginationModule,
        NgSpinKitModule,
        Ng2BootStrapModalModule.forRoot(),
        DatepickerModule.forRoot(),
        TextMaskModule,
        ProgressbarModule.forRoot(),
        FileUploadModule,
        AlertModule,
        MyDatePickerModule,
        FormsModule,
        SmartadminModule
    ],
    declarations: [
        Safe2,
        LoaderComponent,
        PagingComponent,
        Select2InputComponent,
        ErrorModalComponent,
        ErrorPageComponent,
        NumberFormatPipe,
        ProgressBarModal,
        FileUploadComponent,
        CutTextPipe,
        DecodeHTMLPipe,
        PrintTimePipe,
        PrintHalfTimePipe,
        SafeHtmlPipe,
        PrintFullTimePipe,
        DateTimePickerContactsComponent,
        MinhChungModalComponent,
        ImageUploadComponent,
        ImageUploadNewsComponent,
        FileUploadMultiComponent,
        FileUploadSingleComponent,
        NumberPickerComponent,
        NotFoundComponent,
        MegerText
    ],
    providers: [AlertConfig, FileSystemService],
    exports: [
        LoaderComponent,
        PagingComponent,
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        NgxPaginationModule,
        Select2InputComponent,
        ErrorModalComponent,
        ErrorPageComponent,
        DatepickerModule,
        TextMaskModule,
        NumberFormatPipe,
        ProgressbarModule,
        ProgressBarModal,
        FileUploadModule,
        FileUploadComponent,
        AlertModule,
        // QuillModule,
        Ng2Webstorage,
        CKEditorModule,
        Ng2BootStrapModalModule,
        CutTextPipe,
        DecodeHTMLPipe,
        PrintTimePipe,
        PrintHalfTimePipe,
        SafeHtmlPipe,
        PrintFullTimePipe,
        Safe2,
        DateTimePickerContactsComponent,
        MinhChungModalComponent,
        ImageUploadComponent,
        ImageUploadNewsComponent,
        FileUploadMultiComponent,
        FileUploadSingleComponent,
        Ng2BootStrapModalModule,
        CutTextPipe,
        DecodeHTMLPipe,
        PrintTimePipe,
        SafeHtmlPipe,
        PrintFullTimePipe,
        NumberPickerComponent,
        NotFoundComponent,
        MegerText,
        SmartadminModule
    ]
})
export class SharedModule {

}
