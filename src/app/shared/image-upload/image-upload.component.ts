import { Component, Input, Output, OnChanges, OnInit, EventEmitter, ViewChild, ElementRef, Renderer, ViewContainerRef } from '@angular/core';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { TokenService } from '@components/auth/token.service';
import * as moment from 'moment';
import * as _ from 'lodash';

import { UrlVariable, Version } from '@util/variable';
import { FileSystemService } from '@shared/file-system.service';
import { NotificationService } from '@shared/utils/notification.service';

export interface FileUploadOption {
    multiple?: boolean;
    allowType?: string[];
    auto?: boolean;
    fileView?: string;
    allowDelete?: boolean;
}



@Component({
    selector: 'my-image-upload',
    templateUrl: './image-upload.component.html',
    styleUrls: ['./baPictureUploader.scss']
})
export class ImageUploadComponent implements OnChanges, OnInit {
    @Output() onError = new EventEmitter();
    @Output() onComplete = new EventEmitter();
    @Output() onViewImage = new EventEmitter();
    @Output() onDelete = new EventEmitter();
    @ViewChild('uploadEl') uploadEl: ElementRef;
    @ViewChild('displayImg') displayImg: ElementRef;

    private imageLoaded = true;
    public uploadInProgress: boolean;
    private _isMine: boolean = false;
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
        multiple: false,
        allowType: null,
        auto: true,
        fileView: 'list',
        allowDelete: true,
    };
    private _additionalParameter = {
        idItem: null,
        tableName: null,
        uploadPath: '',
        updateDate: moment().format(),
        userUpdate: 'dman'
    }
    private _url: string = UrlVariable.URL_FILES;
    public _uploader = new FileUploader({});
    private _duocDanhGia: boolean;

    @Input()
    public set isMine(value) {
        this._isMine = value;
    }

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
        console.log('set idItem ' + value);
        this._additionalParameter.idItem = value;
    }

    @Input()
    public get userUpdate() {
        return this._additionalParameter.userUpdate;
    }

    public set userUpdate(value) {
        this._additionalParameter.userUpdate = value;
    }
    private token;
    constructor(
        private fileSystemService: FileSystemService,
        private _tokenService: TokenService,
        private renderer: Renderer,
        private notificationserivce: NotificationService
    ) {
        this.token = 'JWT ' + this._tokenService.getToken();
    }

    @Input()
    public set duocDanhGia(value: any) {
        console.log('set duocDanhGia ' + value);
        this._duocDanhGia = value;
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
            console.log(`get files của idItem = ${this.idItem}`);
            this.triggerChanges(this.idItem, this.tableName);
        }
    }

    public upload(idItem, tableName): void {
        // this._additionalParameter.tableName = tableName;
        // this._additionalParameter.idItem = idItem;
        this._additionalParameter.updateDate = moment().format();
        console.log(`additionalParameter truoc khi upload ${JSON.stringify(this._additionalParameter)}`);
        this._uploader.uploadAll();
    }

    public get files(): FileItem[] {
        return this._uploader.queue;
    }

    public triggerChanges(idItem, tableName) {
        this.idItem = idItem;
        this.tableName = tableName;
        this.fileSystemService.getFiles(this.idItem, this.tableName)
            .then(result => {
                this._uploadedFiles = result;
                this._uploadedFiles.forEach(_file => {
                    _file['linkFile'] = `${UrlVariable.URL_FILES}/api/files/getFile?fileName=${_file.file_system_guid}`;
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
            maxFileSize: 3 * 1024 * 1024,// 3MB
            allowedFileType: this.option.allowType,
            autoUpload: this.option.auto,
            additionalParameter: this._additionalParameter,
            authToken: this.token,
            headers: [{ name: 'app-key', value: Version.APP_ID }]
        })

        this._uploader.onWhenAddingFileFailed = (fileItem) => {
            if (+fileItem.size > 3145728) {
                this.onError.emit("File quá lớn")
                this.uploadEl.nativeElement.value = '';
            }
        }

        this._uploader.onBeforeUploadItem = (fileItem) => {
            // console.log('before upload');
            // console.log(fileItem);
            // console.log(this._additionalParameter);
            this.uploadInProgress = true;
        }

        this._uploader.onAfterAddingFile = (fileItem) => {
            this.imageLoaded = false;
            fileItem.withCredentials = false;
            this.uploadEl.nativeElement.value = '';
            // console.log(fileItem.file.type.split('/')[1]);

            fileItem['cssClassFileIcon'] = this.getCLassFileIcon(fileItem.file.type.split('/')[1]);
            // dùng để đọc file thành url
            let reader = new FileReader();
            reader.addEventListener('load', (event: Event) => {
                let result = (<any>event.target).result;
                fileItem['_thumbUrl'] = result;
            }, false);
            reader.readAsDataURL(fileItem._file);
        };

        this._uploader.onErrorItem = (item: FileItem, response: string, status: number, headers: { [headerFieldName: string]: string }) => {
            // console.error('Có lỗi khi upload file', item, response, status, headers);
            let error = JSON.parse(response);
            this.onError.emit(error.error);
        }

        this._uploader.onSuccessItem = (item: FileItem, response: string, status: number, headers: { [headerFieldName: string]: string }) => {
            if (this._option.auto) {
                this._uploadedFiles = [];
                // this.triggerChanges(this.idItem, this.tableName);
                // setTimeout(function () {
                // }, 500);
            }
            this.uploadInProgress = false;
            this.getMinhChung(this.idItem, this.tableName)
            this.onComplete.emit(this.idItem);
        }
        // this._uploader.onCompleteAll = () => {
        //     console.log("DKM")
        //     if (this._option.auto) {
        //         this._uploadedFiles = [];
        //         // this.triggerChanges(this.idItem, this.tableName);
        //         // setTimeout(function () {
        //         // }, 500);
        //     }
        //     this.uploadInProgress = false;
        //     this.getMinhChung(this.idItem, this.tableName)
        //     this.onComplete.emit(this.idItem);
        // }
    }

    private deleteFile(file) {
        let fileSystemGuid = [file.file_system_guid];
        this.fileSystemService.deleteFile(fileSystemGuid)
            .then(() => {
                _.remove(this._uploadedFiles, (current) => {
                    return current.file_system_guid === file.file_system_guid;
                });
            })
    }

    private deleteAllFile() {
        let fileSystemGuid = this._uploadedFiles.map(file => file.file_system_guid);
        this.fileSystemService.deleteFile(fileSystemGuid)
            .then(() => {
                this._uploadedFiles = [];
            });
    }
    public picture;

    public getMinhChung(cau_hoi_id, phieu_danh_gia_id) {
        this.fileSystemService.getFileMinhChung(cau_hoi_id, phieu_danh_gia_id)
            .then(data => {
                // console.log('lấy minh chứng với:', cau_hoi_id, phieu_danh_gia_id)
                // console.log('data', data);
                // if (typeof data !== 'undefined') {
                // this.picture = UrlVariable.URL_FILES + '/minhchung' + data.map_path;
                this.picture = data.result ? UrlVariable.URL_FILES + '/' + data.result : undefined;
                this.pictureHidden = false;
                // } else {
                // this.pictureHidden = true;
                // }
                this.uploadInProgress = false;
                // console.log(this.picture);
                // console.log(this._uploader.queue[0])
            }).catch(error => {
                console.log('eror get minh chung:', error);
            });
    }
    private pictureHidden = false;

    removePicture() {
        this.notificationserivce.smartMessageBox({
            title: "Chú ý",
            content: "Bạn có chắc muốn xóa minh chứng này?",
            buttons: "[Hủy][Xóa]"
        }, (ButtonPressed) => {
            if (ButtonPressed === "Xóa") {
                this.fileSystemService.deleteMinhChung(this.idItem, this.tableName)
                    .then((result) => {
                        this.pictureHidden = true;
                        this.picture = undefined;
                        // console.log(result)
                        this.onDelete.emit(this.idItem)
                    })
                    .catch((error) => {
                        this.onError.emit(error)
                        // Alert.showAuthen(error, '');
                    })
            }
            if (ButtonPressed === "Hủy") {
                console.log("Xem lại")
            }
        });

    }
    // test modal overlay

    imageOnLoad() {
        this.imageLoaded = true;
    }

    openGallery() {
        this.onViewImage.emit({ picture: this.picture });
    }

    bringFileSelector(): boolean {
        this.renderer.invokeElementMethod(this.uploadEl.nativeElement, 'click');
        return false;
    }
}
