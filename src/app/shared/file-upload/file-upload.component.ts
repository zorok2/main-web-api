import { Component, Input, Output, OnChanges, OnInit, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FileUploader, FileItem } from 'ng2-file-upload';
import * as moment from 'moment';
import * as _ from 'lodash';

import { UrlVariable } from '@util/variable';
import { FileSystemService } from '@shared/file-system.service';

export interface FileUploadOption {
    multiple?: boolean;
    allowType?: string[];
    auto?: boolean;
    fileView?: string;
    allowDelete?: boolean;
}



@Component({
    selector: 'my-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./baPictureUploader.scss']
})
export class FileUploadComponent {
    @Output() onError = new EventEmitter();
    @ViewChild('uploadEl') uploadEl: ElementRef;
    private _option: FileUploadOption;
    private _uploadedFiles = [];
    private _fileMapping = {
        'jpeg': 'fa fa-file-image-o',
        'png': 'fa fa-file-image-o',
        'jpg': 'fa fa-file-image-o',
        'rar': 'fa fa-file-archive-o',
        'zip': 'fa fa-file-archive-o',
        '7z': 'fa fa-file-archive-o',
        'xls': 'fa fa-file-excel-o',
        'xlsx': 'fa fa-file-excel-o',
        'pdf': 'fa fa-file-pdf-o',
        'doc': 'fa fa-file-text-o',
        'docx': 'fa fa-file-text-o',
        'txt': 'fa fa-file-text-o',
        'odt': 'fa fa-file-text-o',
        'ppt': 'fa fa-file-powerpoint-o',
        'pptx': 'fa fa-file-powerpoint-o'
    }
    private _defaultOption: FileUploadOption = {
        multiple: true,
        allowType: null,
        auto: false,
        fileView: 'list',
        allowDelete: true
    };
    private _additionalParameter = {
        idItem: null,
        tableName: null,
        uploadPath: '',
        updateDate: moment().format(),
        userUpdate: 'dman'
    }
    private _url: string = UrlVariable.URL_FILES;
    private _uploader = new FileUploader({});

    @Input()
    public get option() {
        return this._option;
    }

    public set option(value) {
        if (value === undefined) {
            throw new Error('option khổng thể undefined');
        }
        this._option = value;
        for (let k in this._defaultOption) {
            if (!this._option[k]) {
                this._option[k] = this._defaultOption[k];
            }
        }
    }

    @Input()
    public get uploadPath(): string {
        return this._additionalParameter.uploadPath;
    }

    public set uploadPath(value: string) {
        this._additionalParameter.uploadPath = value;
    }

    @Input()
    public get tableName(): string {
        return this._additionalParameter.tableName;
    }

    public set tableName(value: string) {
        this._additionalParameter.tableName = value;
    }

    @Input()
    public get idItem(): any {
        return this._additionalParameter.idItem;
    }

    public set idItem(value: any) {
        this._additionalParameter.idItem = value;
    }

    @Input()
    public get userUpdate() {
        return this._additionalParameter.userUpdate;
    }

    public set userUpdate(value) {
        this._additionalParameter.userUpdate = value;
    }

    constructor(private fileSystemService: FileSystemService) {
    }

    ngOnInit() {
        if (!this.option) {
            this.option = this._defaultOption;
        }

        if (this.idItem && this.tableName) {
            this.fileSystemService.getFiles(this.idItem, this.tableName)
                .then(result => this._uploadedFiles = result);
        }

        this.setUp();
    }

    ngOnChanges(changes) {
        if (this.idItem && this.tableName) {
            this.triggerChanges();
        }
    }

    public upload(): void {
        this._additionalParameter.updateDate = moment().format();
        this._uploader.uploadAll();
    }

    public get files(): FileItem[] {
        return this._uploader.queue;
    }

    public triggerChanges() {
        this.fileSystemService.getFiles(this.idItem, this.tableName)
            .then(result => {
                this._uploadedFiles = result;
                this._uploadedFiles.forEach(_file => {
                    _file['linkFile'] = `${UrlVariable.URL_LOGIN}/api/files/getFile?fileName=${_file.file_system_guid}`;
                    _file['cssClassFileIcon'] = this.getCLassFileIcon(_file.file_type);
                })
            });
    }

    private getCLassFileIcon(fileType: string): string {
        let classFile = this._fileMapping[fileType];
        if (!classFile) {
            return 'fa fa-file';
        }
        return classFile;
    }

    private setUp() {
        this._uploader.setOptions({
            url: this._url,
            removeAfterUpload: true,
            itemAlias: 'files',
            allowedFileType: this.option.allowType,
            autoUpload: this.option.auto,
            additionalParameter: this._additionalParameter
        })

        this._uploader.onBeforeUploadItem = (fileItem) => {
        }

        this._uploader.onAfterAddingFile = (fileItem) => {
            fileItem.withCredentials = false;
            this.uploadEl.nativeElement.value = '';
            fileItem['cssClassFileIcon'] = this.getCLassFileIcon(fileItem.file.type.split('/')[1]);
            // dùng để đọc file thành url
            // let reader = new FileReader();
            // reader.addEventListener('load', (event: Event) => {
            //     let result = (<any>event.target).result;
            //     fileItem['_thumbUrl'] = result;
            // }, false);
            // reader.readAsDataURL(fileItem._file);
        };

        this._uploader.onErrorItem = (item: FileItem, response: string, status: number, headers: { [headerFieldName: string]: string }) => {
            console.error('Có lỗi khi upload file', item, response, status, headers);
            let error = JSON.parse(response);
            this.onError.emit({ item: item, error: error, headers: headers });
        }

        this._uploader.onCompleteAll = () => {
            if (this._option.auto) {
                this.triggerChanges();
            }
        }
    }

    private deleteFile(file) {
        let fileSystemGuid = [file.file_system_guid];
        // this.fileSystemService.deleteFile(fileSystemGuid)
        //     .then(() => {
        //         _.remove(this._uploadedFiles, (current) => {
        //             return current.file_system_guid === file.file_system_guid;
        //         });
        //     })
    }

    private deleteAllFile() {
        // let fileSystemGuid = this._uploadedFiles.map(file => file.file_system_guid);
        // this.fileSystemService.deleteFile(fileSystemGuid)
        //     .then(() => {
        //         this._uploadedFiles = [];
        //     });
    }

}