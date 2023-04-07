import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, ViewContainerRef } from '@angular/core';
import * as _ from 'lodash';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { UrlVariable, Version, ImageVariables } from '@util/variable';
import { TokenService } from '@components/auth/token.service';
import { FileSystemNewsService } from '@shared/file-system-news.service';
import { NotificationService } from '@shared/utils/notification.service';

/*
 --------------------CHÚ THÍCH---------------------------
 -- allowType: loại file cho phép upload
 -- auto: true(tự động upload khi thêm file)
 -- allowDelete: true(cho phép xóa file)
 -- fileView(***): mặc định cho là list vì thumb ko xài được.
 luôn luôn cho fileView='list'
 -- lockUpload: khóa tác vụ xóa và upload files
*/
export interface FileUploadMultiOption {
  allowedType?: string[];
  auto?: boolean;
  fileView?: string;
  allowDelete?: boolean;
  sizeCheck?: number;
  lockUpload?: boolean;
}

/*
  PARAMS Input() của component:
  - Sử dụng cho upload file
  -- idItem -> id của dòng dữ liệu liên quan tới file
  -- tableName -> tên table của dữ liệu liên quan tới file
  -- uploadPath -> đường dẫn thư mục chứa file
  -- file_system_guid -> id của file cũ (nếu có)

  - Sử dụng cho chép link ngoài
  -- linkFile -> url chép từ địa chỉ của file ngoài
*/
export interface ParamUploadMultiFile {
  idItem?: number;
  tableName?: string;
  uploadPath?: string;
  file_system_guids?: number[];
}

@Component({
  selector: 'file-upload-multi',
  templateUrl: './file-upload-multi.component.html',
  styleUrls: ['./file-upload-multi.component.scss']
})
export class FileUploadMultiComponent implements OnInit {

  /*
    tạo loading
    */
  private loaded = false;

  /*
  cấu hình upload
  */
  private _option: FileUploadMultiOption;

  /*
  thiết lập mặc định option
  */
  private _defaultOption: FileUploadMultiOption = {
    allowedType: [],
    auto: false,
    fileView: 'list',
    allowDelete: true,
    sizeCheck: 0,
    lockUpload: false
  };

  /*
 tự thiết lập cấu hình upload file (thiết lập ngoài component)
 _options không có truyền thuộc tính tương ứng _defaultOption sẽ thay thế bằng thuộc tính của _defaultOption
 */
  @Input()
  public get option() {
    return this._option;
  }

  public set option(value) {
    if (value === undefined) {
      console.error('option khổng thể undefined');
      throw new Error('option khổng thể undefined');
    }

    this._option = value;

    /*
    có 1 thuộc tính trong option ko có thì set thành tham số mặc định
    */
    for (let k in this._defaultOption) {
      if (this._option[k] == undefined || this._option[k] == null) {
        this._option[k] = this._defaultOption[k];
      }
    }
  }

  /*
  dữ liệu thao tác Input() component
  */
  private _params: ParamUploadMultiFile;

  /*
  Output: khi có lỗi upload
  */
  @Output() onError = new EventEmitter();

  /*
  Output: khi upload file thành công
  */
  @Output() onSuccess = new EventEmitter

  /**
   * Output xóa item
   */
  @Output() onDeleteSuccess = new EventEmitter();

  /*
  Ouput:
      Upload File: sử dụng để biết thay đổi ko
  */
  @Output() onChangeFile = new EventEmitter();

  private defaultParamsUpload: ParamUploadMultiFile = {
    idItem: 0,
    tableName: '',
    uploadPath: '',
    file_system_guids: [0]
  }

  @Input()
  public get params() {
    return this._params
  }

  public set params(value: ParamUploadMultiFile) {
    if (value === undefined) {
      console.error('params không được để trống');
      throw new Error('params không được để trống');
    }
    this._params = value;
    for (let k in this.defaultParamsUpload) {
      if (!this._params[k]) {
        this._params[k] = this.defaultParamsUpload[k];
      }
    }
  }

  /*
  thông báo cho phép file nào được sử dụng
  */
  private get messageAllowType() {
    if (this.option.allowedType.length === 0) {
      return '';
    }
    if (this.option.allowedType.length > 0) {
      return this.option.allowedType.join(', ')
    }
  }

  /*
  kết quả trả về
  */
  private _resultUpload = {
    success: [],
    error: []
  }

  @ViewChild('uploadEl') uploadEl: ElementRef;

  /*
  danh sách file đã upload
  */
  private _uploadedFiles: any[];

  /*
   icon theo loại file
   */
  private _fileMapping = {
    'jpeg': 'fa fa-file-image-o fg-darkBlue',
    'png': 'fa fa-file-image-o fg-darkBlue',
    'jpg': 'fa fa-file-image-o fg-darkBlue',
    'rar': 'fa fa-file-archive-o fg-darkCrimson',
    'zip': 'fa fa-file-archive-o fg-darkCrimson',
    '7z': 'fa fa-file-archive-o fg-darkCrimson',
    'xls': 'fa fa-file-excel-o fg-emerald',
    'xlsx': 'fa fa-file-excel-o fg-emerald',
    'pdf': 'fa fa-file-pdf-o fg-darkRed',
    'doc': 'fa fa-file-text-o fg-grayLighter',
    'docx': 'fa fa-file-text-o fg-grayLighter',
    'txt': 'fa fa-file-text-o fg-grayLighter',
    'odt': 'fa fa-file-text-o fg-grayLighter',
    'ppt': 'fa fa-file-powerpoint-o fg-orange',
    'pptx': 'fa fa-file-powerpoint-o fg-orange'
  };


  /*
     api upload
    */
  private _url: string = `${UrlVariable.URL_FILES}/api/files/upload`;

  /*
  đối tượng thiết lập cho module upload
  */
  private _uploader = new FileUploader({});

  /*
  files chuẩn bị upload
  */
  public get files(): FileItem[] {
    return this._uploader.queue;
  }


  /*
  kiểm tra có file nào đang hàng chờ upload file ko
  */
  public get isQueingFile(): boolean {
    if (this.files.length > 0) {
      return true;
    }
    return false;
  }

  constructor(
    private fileSystemService: FileSystemNewsService,
    private _tokenService: TokenService,
    private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.loaded = false;
    this._uploadedFiles = [];
    /*
    thiết lập mặc định nếu như ko tự thiết lập
    */
    if (!this.option) {
      this.option = this._defaultOption;
    }
    this.getFiles().then(value => {
      this.setUp();
    })
  }

  /*
    lấy thông tin file từ sever
    */
  private getFiles(): Promise<any> {
    this.loaded = false;
    this._uploadedFiles = [];
    return this.fileSystemService.getsByFileSystemGuids(this._params.file_system_guids)
      .then(result => {
        if (result) {
          this._uploadedFiles = result;
          this._uploadedFiles.forEach(x => {
            x['cssClassFileIcon'] = this.getCLassFileIcon(x.file_type);
            x['linkFile'] = this.getLinkFile(x);
          })
        }
        this.loaded = true;
      });
  }

  /*
  lấy ra icon theo loại file
  */
  private getCLassFileIcon(fileType: string): string {
    let classFile = this._fileMapping[fileType.toLowerCase()];
    if (!classFile) {
      return 'fa fa-file';
    }
    return classFile;
  }

  private getLinkFile(file): string {
    if (file)
      return ImageVariables.IMAGE_DOMAIN + "/" + file.map_path
    return "";
  }

  /*
  delete file trong hàng đợi
  */
  deleteFileInQue = (file) => {
    this.files.forEach(x => {
      if (x.file.name == file.file.name) {
        x.remove();
      }
    });
  }

  /*
  khởi tạo upload file
  */
  private setUp() {
    this._uploader.setOptions({
      url: this._url,
      removeAfterUpload: true,
      itemAlias: 'files',
      autoUpload: this.option.auto,
      additionalParameter: this.params,
      /*
           gửi giá trị token và app-key
           */
      authToken: 'JWT ' + this._tokenService.getToken(),
      headers: [{
        name: 'app-key',
        value: Version.APP_ID
      }]
    });

    this._uploader.onAfterAddingFile = (fileItem) => {
      let isCheckError = false;
      if (this.option.sizeCheck) {
        if (Math.round(fileItem.file.size) / 1024 / 1024 > this.option.sizeCheck) {
          // Alert.showWarning('Chú ý', `Không được vượt quá ${this.option.sizeCheck} MB`);
          this.notificationService.smallBox({
            title: "Chú ý",
            content: `Không được vượt quá ${this.option.sizeCheck} MB`,
            color: "#3276B1",
            timeout: 2500,
            icon: "fa fa-warning shake animated"
          })
          this.uploadEl.nativeElement.value = '';
          isCheckError = true;
        }
      }

      if (this.option.allowedType.length > 0 && isCheckError == false) {
        let fileType = fileItem.file.name.substr(fileItem.file.name.lastIndexOf('.') + 1, fileItem.file.name.length);
        if (this.option.allowedType.findIndex(x => x.toLowerCase() == fileType.toLowerCase()) < 0) {
          // console.log("lỗi");
          this.notificationService.smallBox({
            title: "Chú ý",
            content: `Không đúng định dạng file upload`,
            color: "#3276B1",
            timeout: 2500,
            icon: "fa fa-warning shake animated"
          })
          this.uploadEl.nativeElement.value = '';
          isCheckError = true;
        }
      }

      fileItem.withCredentials = false;
      this.uploadEl.nativeElement.value = '';
      // console.log(fileItem.file.type.split('/')[1]);

      fileItem['cssClassFileIcon'] = this.getCLassFileIcon(!fileItem.file.type ? fileItem.file.type : fileItem.file.type.split('/')[1]);

      if (isCheckError == true) {
        this.deleteFileInQue(fileItem);
      }

      if (isCheckError == false) {
        this.onChangeFile.emit(fileItem);
      }
    };

  }

  /*
  xóa 1 file đã upload
  */
  private deleteFile(file) {
    this.notificationService.smartMessageBox({
      title: "Có chắc muốn file này không?",
      content: "Dữ liệu sẽ bị xóa vĩnh viễn không thể quay lại",
      buttons: '[No][Yes]'
    }, (ButtonPressed) => {
      if (ButtonPressed === "Yes") {
        let fileSystemGuid = [file.file_system_guid];
        this.fileSystemService.deleteFile(fileSystemGuid)
          .then(() => {
            this.onDeleteSuccess.emit(fileSystemGuid);
            _.remove(this._uploadedFiles, (current) => {
              return current.file_system_guid === file.file_system_guid;
            });
          })
      }
      if (ButtonPressed === "No") {

      }
    });
  }

  /*
  xóa hết tất cả các file đã upload
  */
  private deleteAllFile() {
    if (this._uploadedFiles.length == 0) {
      this.notificationService.smallBox({
        title: "Chú ý",
        content: `Không có file nào để xóa`,
        color: "#3276B1",
        timeout: 2500,
        icon: "fa fa-warning shake animated"
      })
      return;
    }
    this.notificationService.smartMessageBox({
      title: "Có chắc muốn file này không?",
      content: "Dữ liệu sẽ bị xóa vĩnh viễn không thể quay lại",
      buttons: '[No][Yes]'
    }, (ButtonPressed) => {
      if (ButtonPressed === "Yes") {
        let fileSystemGuid = this._uploadedFiles.map(file => file.file_system_guid);
        this.fileSystemService.deleteFile(fileSystemGuid)
          .then(() => {
            this.onDeleteSuccess.emit(fileSystemGuid);
            this._uploadedFiles = [];
          });
      }
      if (ButtonPressed === "No") {

      }
    });
  }

  /*
  hàm upload do component cha gọi
  */
  public upload(): Promise<{ success: { file_id: number, path: string }[], error: { name: string }[] }> {
    /*
    nếu như ko có file nào đợi upload thì trả về kết quả cũ
    */
    this._resultUpload = {
      error: [],
      success: []
    }

    if (this.option.lockUpload == true) {
      return Promise.resolve(this._resultUpload);
    }

    /*
    nếu ko có files nào ở hàng chờ thì trả về rỗng success
    */
    if (this.isQueingFile == false) {
      return Promise.resolve(this._resultUpload);
    }

    this._uploader.uploadAll();

    /*
    upload file thành công
    */
    this._uploader.onSuccessItem = (item: FileItem, response: string, status: number, headers: {
      [headerFieldName: string]: string;
    }) => {
      if (JSON.parse(response).id) {
        this.params.file_system_guids.push(+JSON.parse(response).id);
        this._resultUpload.success.push({ file_id: JSON.parse(response).id, path: ImageVariables.IMAGE_DOMAIN + "/" + JSON.parse(response).path });
        // this.onSuccess.emit({ response: JSON.parse(response), id: this._params.idItem, path: this._params.uploadPath });
      }
    };

    /*
    upload file thất bại
    */
    this._uploader.onErrorItem = (item: FileItem, response: string, status: number, headers: {
      [headerFieldName: string]: string;
    }) => {
      this._resultUpload.error.push({ name: JSON.parse(response).name })
    }

    /*
    sau khi upload hoàn tất trả kết qủa về cho component cha
    */
    return new Promise((resolve, reject) => {
      this._uploader.onCompleteAll = () => {
        this.getFiles();
        resolve(this._resultUpload);
      }
    })
  }

  /*
  tải file bằng cách tạo thẻ a
  */
  downloadFile = (url) => {
    let link = document.createElement("a");
    link.download = "a";
    link.target = '_blank';
    link.href = url;
    document.body.appendChild(link);
    link.click();
  }

}
