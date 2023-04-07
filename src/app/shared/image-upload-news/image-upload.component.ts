/**
 * Code đã được chỉnh sửa để bớt hại não ,
 * Bản hại não nằm trong thư mục file-upload
 */
import { FileUploader, FileItem } from 'ng2-file-upload';
import * as moment from 'moment';
import * as _ from 'lodash';

import { UrlVariable, ImageVariables, Version } from '@util/variable';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Component, OnChanges, OnInit, Output, EventEmitter, Input, ViewChild, ElementRef, ViewContainerRef } from '@angular/core';
import { TokenService } from '@components/auth/token.service';
import { FileSystemNewsService } from '@shared/file-system-news.service';
import { NotificationService } from '@shared/utils/notification.service';


export interface FileUploadOption {
  multiple?: boolean;
  allowType?: string[];
  auto?: boolean;
  fileView?: string;
  allowDelete?: boolean;
}

@Component({
  selector: 'my-image-upload-news',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./baPictureUploader.scss'],
})
export class ImageUploadNewsComponent implements OnChanges, OnInit {
  @Output() onError = new EventEmitter();
  @ViewChild('uploadEl') uploadEl: ElementRef;
  public readonly PERMISSION = {
    READ_ONLY: 'READ_ONLY',
    EDIT_ONLY: 'EDIT_ONLY',
  };
  private isInit = false;
  private _option: FileUploadOption;
  private _permission: string = this.PERMISSION.READ_ONLY; // NOTE: _permission biến xác định quyền, READ_ONLY, EDIT_ONLY
  private _uploadedFiles = [];
  private _defaultOption: FileUploadOption = {
    multiple: false,
    auto: false,
    fileView: 'list',
    allowDelete: true,
  };
  private _additionalParameter = {
    idItem: null,
    tableName: null,
    uploadPath: '',
    updateDate: moment().format(),
    userUpdate: 'dmk',
    categoryBy: 'year',
  };
  private _url: string = UrlVariable.URL_FILES;
  private _apiUrl = UrlVariable.URL_FILES;
  public _uploader = new FileUploader({});

  // Mảng lưu hình
  public uploadedImage = [];
  // Nếu isEdit = true => user có sửa hình ảnh.
  public isEdit = false;

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
  public set imgUrl(value: string) {
    this.uploadedImage = [];
    this.uploadedImage.push(this.sanitizer.bypassSecurityTrustUrl(value))
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
  public get permission() {
    return this._permission;
  }

  public set permission(value) {
    this._permission = value || this.PERMISSION.READ_ONLY;
  }
  private token;
  constructor(
    private _tokenService: TokenService,
    private fileSystemService: FileSystemNewsService,
    private sanitizer: DomSanitizer,
    private notificationserivce: NotificationService) {
    this.token = 'JWT ' + this._tokenService.getToken();
  }

  ngOnInit() {
    if (!this.option) {
      this.option = this._defaultOption;
    }

    if (this.idItem && this.tableName) {
      this.fileSystemService
        .getFiles(this.idItem, this.tableName)
        .then(result => (this._uploadedFiles = result));
    }

    this.setUp();
  }

  ngOnChanges(changes) {
    if (this.permission && this.permission === this.PERMISSION.READ_ONLY) {
      return;
    }
    if (this.isInit === false) {
      this.isInit = true;
      return;
    }
  }

  public upload(): Promise<any> {
    return new Promise((res, rej) => {
      // Có lỗi khi upload
      this._uploader.onSuccessItem = (
        item: FileItem,
        response: string,
        status: number,
        headers: { [headerFieldName: string]: string }
      ) => {
        if (JSON.parse(response).id) {
          res(JSON.parse(response))
        } else {
          rej(response)
        }
      };
      console.log(this._uploader.queue)
      this._additionalParameter.updateDate = moment().format();
      // Upload file đầu tiên . Upload all ko chạy đc nhiều lần
      this._uploader.uploadItem(this._uploader.queue[0]);
    })
  }

  public get files(): FileItem[] {
    return this._uploader.queue;
  }


  private setUp() {
    this._uploader.setOptions({
      url: this._url,
      itemAlias: 'files',
      allowedFileType: ['image'],
      autoUpload: this.option.auto,
      additionalParameter: this._additionalParameter,
      removeAfterUpload: false,
      authToken: this.token,
      headers: [{
        name: 'app-key',
        value: Version.APP_ID
      }]
    });


    // this._uploader.onBeforeUploadItem = fileItem => {
    //   this._uploader.clearQueue()
    // };

    // File không hợp lệ
    this._uploader.onWhenAddingFileFailed = fileItem => {
      this.notificationserivce.error("Chỉ nhận file hình ảnh")
    }

    // Sau khi upload hình
    this._uploader.onAfterAddingFile = fileItem => {
      if (this._uploader.queue.length > 1) {
        this._uploader.queue.splice(0, 1); // clear old file & replace it with the new one
      }
      this.isEdit = false;
      fileItem.withCredentials = false;
      this.uploadEl.nativeElement.value = '';
      // Tạo blob
      let imgUrl = window.URL.createObjectURL(fileItem._file)
      // Tạo biến Image check độ phân giải
      let image = new Image();
      image.src = imgUrl;
      image.onload = () => {
        // Check độ phân giải hình
        // if (image.naturalHeight != ImageVariables.SLIDE_SHOW_RESOLUTION_HEIGHT || image.naturalWidth != ImageVariables.SLIDE_SHOW_RESOLUTION_WIDTH) {
        //   this.toastr.error(`Hình không hợp lệ , vui lòng chọn hình có độ phân giải ${ImageVariables.SLIDE_SHOW_RESOLUTION_WIDTH} x ${ImageVariables.SLIDE_SHOW_RESOLUTION_HEIGHT}`)
        //   this._uploader.removeFromQueue(fileItem);
        // } else {
        this.isEdit = true;
        // Độ phân giải ok => show hình ra view
        this.uploadedImage = [];
        // Chuyển url thành safeUrl để show
        this.uploadedImage.push(this.sanitizer.bypassSecurityTrustUrl(imgUrl))
        // }
      }
    };

    // Có lỗi khi upload
    this._uploader.onErrorItem = (
      item: FileItem,
      response: string,
      status: number,
      headers: { [headerFieldName: string]: string }
    ) => {
      this.notificationserivce.error('Có lỗi khi upload file')
      console.error('Có lỗi khi upload file', item, response, status, headers);
      let error = JSON.parse(response);
      this.onError.emit({ item: item, error: error, headers: headers });
    };
  }


  // Xóa file
  public deleteFile(fileSystemGuid): Promise<any> {
    return this.fileSystemService.deleteFile(fileSystemGuid)
  }


  // private deleteAllFile() {
  //   let fileSystemGuid = this._uploadedFiles.map(file => file.file_system_guid);
  //   this.fileSystemService.deleteFile(fileSystemGuid).then(() => {
  //     this._uploadedFiles = [];
  //   });
  // }
}
