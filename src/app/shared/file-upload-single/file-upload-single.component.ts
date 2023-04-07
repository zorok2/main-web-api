import { Component, Input, Output, OnChanges, OnInit, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FileUploader, FileItem } from 'ng2-file-upload';
import * as moment from 'moment';
import * as _ from 'lodash';

import { UrlVariable, Version, ImageVariables } from '@util/variable';
import { FileSystemService } from '@shared/file-system.service';
import { TokenService } from '@components/auth/token.service';
import { NotificationService } from '@shared/utils/notification.service';

/* 
 --------------------CHÚ THÍCH---------------------------
 -- allowType: loại file cho phép upload
 -- auto: true(tự động upload khi thêm file)
 -- allowDelete: true(cho phép xóa file)
 -- fileView(***): mặc định cho là list vì thumb ko xài được. 
 luôn luôn cho fileView='list'
 -- choices:number[]: 
    --- gồm 3 chức năng:
        1 -> upload file từ máy tính
        2 -> chép link ngoài
        3 -> crawl tin (chưa làm)

    --- chú thích:
     ---- TH1: ghi [1] hay [2] -> chỉ hiển thị 1 chức năng
     ---- TH2: [1,2]  -> cả 2 chức năng hiện theo lựa chọn của radio button

-- activeChoice: dùng cho loại nhiều chức năng (choice có 2 phần tử). active chức năng mình muốn sử dụng

-- thumb:boolean -> true: hiện thẻ img, ngược lại hiện icon (hiện tại chỉ dùng cho chép link)
*/
export interface FileUploadSingleOption {
    auto?: boolean;
    fileView?: string;
    allowDelete?: boolean;
    choices: number[];
    activeChoice?: number;
    thumb?: boolean;
    allowedType?: string[];
    sizeCheck?: number;
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
export interface ParamUploadSingleFile {
    idItem?: number;
    tableName?: string;
    uploadPath?: string;
    file_system_guid?: number;
    linkFile?: string;
    allow_delete_old?: boolean;
}

@Component({
    selector: 'file-upload-single',
    templateUrl: './file-upload-single.component.html',
    styleUrls: ['./file-upload-single.scss']
})
export class FileUploadSingleComponent implements OnInit {

    /*---------------------------------- DÙNG CHUNG --------------------------------------/* 
    radio button
    1 -> upload file từ máy tính
    2 -> chép link ngoài
    */
    private _btn = {
        '1': { checked: false, header: 'Upload file' },
        '2': { checked: false, header: 'Chép link' },
        '3': { checked: false, header: 'Chép và upload file' }
    };

    /* 
    tạo loading
    */
    private loaded = false;


    /* 
    cờ check nếu thay đổi chép link thì hiện hình link
    */
    private copLink = false;

    /* 
    cấu hình upload
    */
    private _option: FileUploadSingleOption;

    /* 
    thiết lập mặc định option
    */
    private _defaultOption: FileUploadSingleOption = {
        allowedType: [],
        auto: false,
        fileView: 'list',
        allowDelete: true,
        choices: [1],
        activeChoice: 1,
        thumb: false,
        sizeCheck: 0
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

        for (let k in this._defaultOption) {
            if (this._option[k] == null || this._option[k] == undefined) {
                this._option[k] = this._defaultOption[k];
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
    dữ liệu thao tác Input() component
    */
    private _params: ParamUploadSingleFile;

    private defaultParamsUpload: ParamUploadSingleFile = {
        idItem: 0,
        tableName: '',
        uploadPath: '',
        file_system_guid: 0,
        allow_delete_old: true,
        linkFile: ''
    }

    /* 
    gán file đã upload rồi
    */
    public createUploadFiled = (file_system_guid: number, map_path: string) => {
        this._uploadedFile.file_system_guid = file_system_guid;
        this._uploadedFile.map_path = map_path;
    }


    @Input()
    public get params() {
        return this._params
    }

    public set params(value: ParamUploadSingleFile) {
        // console.log(value);
        if (value === undefined) {
            console.error('params không được để trống');
            throw new Error('params không được để trống');
        }
        if (this.option.choices.some(x => x == 1)) {
            if (!value.tableName || !value.uploadPath) {
                console.error('Không được bỏ trống tableName, uploadPath nếu là upload file');
                throw new Error('Không được bỏ trống tableName, uploadPath nếu là upload file');
            };
        }
        this._params = value;
        for (let k in this.defaultParamsUpload) {
            if (this._params[k] == null || this._params[k] == undefined) {
                this._params[k] = this.defaultParamsUpload[k];
            }
        }
        if (this._params.linkFile && this._params.file_system_guid) {
            this._uploadedFile.file_system_guid = this._params.file_system_guid || -1;
            this._uploadedFile.map_path = this._params.linkFile || '';
        }
    }

    /* 
    check xem là chép upload hay chép link ngoài
    */
    public get isActiveUploadFile() {
        if (!this.option.activeChoice)
            return false;
        if (this.option.activeChoice == 1)
            return true;
    }

    public get isActiveCopyLinkFile() {
        if (!this.option.activeChoice)
            return false;
        if (this.option.activeChoice == 2)
            return true;
    }


    /**
     * hiện khi file upload ko có mà người dùng chưa xoá trong bảng
     */
    private is_da_bi_xoa = false;

    /*---------------------------------- END DÙNG CHUNG ----------------------------------*/

    /**
     * --------------------------------- CẤU HÌNH UPLOAD ----------------------------------
     */

    /* 
    Output: khi có lỗi upload
    */
    @Output() onError = new EventEmitter();

    /* 
    Output: khi upload file thành công    
    */
    @Output() onSuccess = new EventEmitter

    /**
     * Ouput: khi xóa item thành công
     */
    @Output() onDeleteSuccess = new EventEmitter();

    /* 
    Ouput: 
        Chép link: two way binding link file
        Upload File: sử dụng để biết thay đổi ko
    */
    @Output() onChangeFile = new EventEmitter();


    /**
     * Output thay đổi chức năng
     */
    @Output() onChangeFeature = new EventEmitter();

    @ViewChild('uploadEl') uploadEl: ElementRef;

    /* 
    danh sách file đã upload
    */
    private _uploadedFile: {
        file_system_guid: number,
        map_path: string
    } = {
            file_system_guid: -1,
            map_path: ''
        };

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

    /**
    * hiện hình img (chép link)
    */
    private get imgUploadLink() {
        return this.params.linkFile;
    }

    /**
     * --------------------------------- END CẤU HÌNH UPLOAD ----------------------------------
     */

    constructor(private fileSystemService: FileSystemService,
        private _tokenService: TokenService,
        private notificationService: NotificationService
    ) {
    }

    /* 
    Kiểm tra choices?
        -> không có báo lỗi
        
    */
    ngOnInit() {
        this.loaded = false;
        /* 
        thiết lập mặc định nếu như ko tự thiết lập
        */
        if (!this.option) {
            this.option = this._defaultOption;
        }

        this.checkChoice();

        if (this._option.thumb == false && this._params.file_system_guid > 0) {
            this.fileSystemService.getsByFileSystemGuids([this._params.file_system_guid])
                .then(value => {
                    if (value && value.length > 0) {
                        this._uploadedFile = value[0];
                    } else {
                        this.is_da_bi_xoa = true;
                    }
                })
        }

    }
    /* 
    - hàm upload được component cha gọi 
    (hỏi anh Ngọc kỹ)
    --> nếu là chức năng chép link ngoài -> thực hiện upload -> xóa file đã upload
    
    --> nếu là chức năng upload -> thực hiện upload -> link ngoài sẽ là đường dẫn chứa file đã upload

    */
    upload = (): Promise<{ file_id: number, path: string }> => {
        // console.log(this.option.activeChoice);
        if (this.isActiveUploadFile) {
            // console.log("link file");            
            return this.uploadFile();
        }
        if (this.isActiveCopyLinkFile) {
            // console.log("link ngoài");
            // console.log(this.params.linkFile);
            /* 
            xóa file upload cũ lấy link url ngoài
            */
            // console.log(this.params.file_system_guid);
            // console.log(this.params.allow_delete_old);

            if (+this.params.file_system_guid > 0 && this.params.allow_delete_old == true) {
                return this.deleteFile({ file_system_guid: this.params.file_system_guid })
                    .then(value => {
                        this.params.file_system_guid = -1;
                        return Promise.resolve(this.checkReturnValueCopyLink());
                    })
            } else {
                return Promise.resolve(this.checkReturnValueCopyLink());
            }
        }
    }

    /* 
    Xử lý chép link tra ve cho components cha
    */
    checkReturnValueCopyLink = (): { file_id: number, path: string } => {
        /*
        nếu như không tồn tại link chép thì trả về file_system_guid=0, path='' 
         */
        if (!this.params.linkFile) {
            this.params.file_system_guid = 0;
            this.params.linkFile = '';
            return { file_id: 0, path: '' };
        }

        /*
        nếu như tồn tại link chép nhưng chuỗi trim ===0 thì trả về file_system_guid=0, path='' 
         */
        if (this.params.linkFile && this.params.linkFile.trim().length == 0) {
            this.params.file_system_guid = 0;
            this.params.linkFile = '';
            return { file_id: 0, path: '' };
        }

        /* 
        tồn tại link chép thì file_system_guid=-1 và path = link người dùng chép
        */
        if (this.params.linkFile && this.params.linkFile.trim().length > 0) {
            this.params.file_system_guid = -1;
            return { file_id: -1, path: this.params.linkFile.trim() };
        }
    }

    /* 
    Upload file từ máy tính
    {
        id: id của dòng dữ liệu liên quan tới file
        response: thông tin từ server trả về
        path: đường dẫn chứa file

        Luồng xử lý:
         -> kiểm tra xem có image_id_old (hình cũ) không?
            -> nếu có thì gọi api xóa hình cũ trước
                -> insert hình mới
            -> ko có insert hình mới bt
    }
    */
    private uploadFile = (): Promise<any> => {

        /**
         * ko có file chuẩn bị upload kiểm tra?
         *  -> nếu có file cũ thì trả về thông tin file cũ
         *  -> nếu ko có file cũ trả về rỗng
         */
        if (this._uploader.queue.length == 0) {
            if (!this._uploadedFile)
                return Promise.resolve({ file_id: 0, path: '' });
            else {
                if (this._uploadedFile.file_system_guid == -1) {
                    return Promise.resolve({ file_id: 0, path: '' });
                }
                return Promise.resolve({ file_id: this._uploadedFile.file_system_guid, path: this._uploadedFile.map_path })
            }
        }
        return new Promise((resolve, reject) => {
            // console.log(this.params.allow_delete_old);
            this._uploader.uploadItem(this._uploader.queue[0]);

            /* 
            upload thành công
            */
            this._uploader.onSuccessItem = (item: FileItem, response: string, status: number, headers: {
                [headerFieldName: string]: string;
            }) => {

                this.params.file_system_guid = JSON.parse(response).id;
                this.params.linkFile = JSON.parse(response).path;
                this._uploadedFile = {
                    map_path: JSON.parse(response).path,
                    file_system_guid: JSON.parse(response).id
                }
                if (this._option.thumb == false) {
                    this.fileSystemService.getsByFileSystemGuids([this._params.file_system_guid])
                        .then(value => {
                            if (value && value.length > 0) {
                                this._uploadedFile = value[0];
                            }
                            if (JSON.parse(response).id) {
                                this.params.linkFile = ImageVariables.IMAGE_DOMAIN + "/" + JSON.parse(response).path;
                                resolve({ file_id: JSON.parse(response).id, path: ImageVariables.IMAGE_DOMAIN + "/" + JSON.parse(response).path });
                            };
                        })
                } else {
                    if (JSON.parse(response).id) {
                        this.params.linkFile = ImageVariables.IMAGE_DOMAIN + "/" + JSON.parse(response).path;
                        resolve({ file_id: JSON.parse(response).id, path: ImageVariables.IMAGE_DOMAIN + "/" + JSON.parse(response).path });
                    };
                }
            }

            /* 
            upload thất bại
            */
            this._uploader.onErrorItem = (item: FileItem, response: string, status: number, headers: {
                [headerFieldName: string]: string;
            }) => {
                reject({ name: JSON.parse(response).name })
            };

        });
    }

    /* 
    files chuẩn bị upload
    */
    public get files(): FileItem[] {
        return this._uploader.queue;
    }

    /* 
    lấy ra icon theo loại file
    */
    private getCLassFileIcon(fileType: string): string {
        if (!fileType) {
            return '';
        }
        let classFile = this._fileMapping[fileType.toLowerCase()];
        if (!classFile) {
            return 'fa fa-file';
        }
        return classFile;
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
    khởi tạo trình upload    
    */
    private setUp() {
        /* 
        thiết lập cho module upload
        */
        this._uploader.setOptions({
            url: this._url,
            removeAfterUpload: true,
            itemAlias: 'files',
            autoUpload: this.option.auto,
            additionalParameter: this._params,
            /* 
            gửi giá trị token và app-key
            */
            authToken: 'JWT ' + this._tokenService.getToken(),
            headers: [{
                name: 'app-key',
                value: Version.APP_ID
            }]
        });

        this._uploader.onBeforeUploadItem = (fileItem) => {
        }

        this._uploader.onAfterAddingFile = (fileItem) => {
            let isCheckError = false;
            if (this.option.sizeCheck) {
                if (Math.round(fileItem.file.size) / 1024 / 1024 > this.option.sizeCheck) {
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
            // this.uploadEl.nativeElement.value = '';
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
    public deleteFile(file): Promise<any> {
        /* 
        xóa file
        */
        if (this.isActiveUploadFile) {
            this.notificationService.smartMessageBox({
                title: "Có chắc muốn file này không?",
                content: "Dữ liệu sẽ bị xóa vĩnh viễn không thể quay lại",
                buttons: '[Hủy][Xóa]'
            }, (ButtonPressed) => {
                if (ButtonPressed === "Xóa") {
                    if (!file)
                        return
                    if (file.file_system_guid > 0 && this.params.allow_delete_old == true) {
                        // console.log("xóa file");
                        let fileSystemGuid = [file.file_system_guid];
                        return this.fileSystemService.deleteFile(fileSystemGuid)
                            .then(() => {
                                this._uploadedFile = null;
                                this.params.linkFile = '';
                                this.onDeleteSuccess.emit(file.file_system_guid);
                            })
                    }
                    // console.log("k xóa file");
                    this._uploadedFile = null;
                    this.params.linkFile = '';
                    this.onDeleteSuccess.emit(file.file_system_guid);
                }
                if (ButtonPressed === "Hủy") {

                }
            });
            return;
        }

        /* 
        xóa file nếu là chép link
        */
        if (this.isActiveCopyLinkFile) {
            if (!file)
                return
            if (file.file_system_guid) {
                let fileSystemGuid = [file.file_system_guid];
                return this.fileSystemService.deleteFile(fileSystemGuid)
                    .then(() => {
                        this.onDeleteSuccess.emit(file.file_system_guid);
                        this._uploadedFile = null;
                    })
            }
            return Promise.resolve();
        }
    }

    /* 
   xét lựa chọn 
        -- [1] -> hiện giao diện upload file từ máy tính (_btnUploadMayTinh=true)
        -- [2] -> hiện giao diện chép link ngoài (_btnLink=true)

       - nhiều lựa chọn với length==2. (return 2)
        - [1,2] hay [2,1] -> hiện radio button (nếu activeChoice=1 -> _btn có thuộc tính tương ứng = true)
   */
    private checkChoice() {
        // console.log(this.keysToggleBtn);
        // console.log("check choice");
        /**
         * kiểm tra xem có trong choices không?
         *      ko có -> xóa thuộc tính
         */
        if (this.option.choices.length > 0) {
            this.keysToggleBtn.forEach(x => {
                // console.log(x);
                // console.log(this._btn[x].checked);
                let index = this.option.choices.findIndex(k => +x == +k);
                // console.log(index);
                if (index < 0) {
                    // console.log(x);
                    delete this._btn[x];
                }
            })
        }

        // console.log("xét active choice");
        /* 
        nếu có 1 lựa chọn thì activechoice là phần tử thứ 1
        */
        if (this.option.choices.length == 1) {
            this.option.activeChoice = this.option.choices[0];
        }

        // console.log(this.params.file_system_guid);
        if (+this.params.file_system_guid) {
            if (+this.params.file_system_guid > 0) {
                this._btn['1'].checked = true;
                this.option.activeChoice = 1;
            }
            if (+this.params.file_system_guid == -1) {
                // console.log("lua chon chuc năng 2");
                this._btn['2'].checked = true;
                this.option.activeChoice = 2;
            }
        } else {
            // console.log("xét button toggle")
            /* 
            cho btn=true khi = activeChoice
            */
            this.keysToggleBtn.forEach(x => {
                if (+x == this.option.activeChoice) {
                    this._btn[x].checked = true;
                }
            });
        }

        // console.log("xét idItem, tableName, uploadPath");
        /* 
        kiểm tra có idItem và tableName
        */
        if (this.isActiveUploadFile) {
            // console.log("bắt lỗi")
            // console.log(this.idItem, this.tableName, this.uploadPath);
            if (!this._params.idItem || !this._params.tableName || !this._params.uploadPath) {
                // console.log("có lỗi");
                console.error('Phải khai báo idItem, tableName, uploadPath');
            }
        }

        if (this._btn['1'])
            if (this._btn['1'].checked == true) {
                // console.log("lua chon 1");
                /* 
                nếu có id item và tên bảng thao tác -> lấy ra file đã upload
                */
                this.loaded = true;
                this.setUp();
            }
        if (this._btn['2'])
            if (this._btn['2'].checked == true) {
                // console.log("lua chon 2");
                this.loaded = true;
            }
    }

    /* 
    lấy ra thuộc tính dối tượng btn toggle (_btn)
    */
    private get keysToggleBtn() {
        return Object.keys(this._btn);
    }

    /* 
        1 btn toggle=true -> những cái khác false
    */
    private ChangeStatusToggleBtn = (key) => {
        // console.log(key);
        this.option.activeChoice = +key;
        this.onChangeFeature.emit(+key);
        this._btn[key].checked = true;
        this.keysToggleBtn.forEach(x => {
            if (x != key) {
                this._btn[x].checked = false;
            }
        })
        if (this.isActiveUploadFile == true) {
            this.copLink = false;
            this.setUp();
        }
    }

    /**
     * upload two way binding (dành cho chép link file)
     */
    private inputLinkFile(value: string) {
        this.copLink = true;
        this.params.linkFile = value;
        this.onChangeFile.emit(this.params.linkFile);
    }

}