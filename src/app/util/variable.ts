import * as moment from 'moment'
export class UrlVariable {
  //API LOCAL

  // TEST
  public static readonly URL_TODO = 'http://localhost:3000';
  // public static readonly URL_TODO = 'http://apidemo.ttithutech.com/import-excel';
  public static readonly URL_LOGIN = 'http://api.lamgigio.net/core-phan-quyen/api-authentication';
  public static readonly URL_LOG_ERROR = 'http://apidemo.lamgigio.net/log/';

  // public static readonly URL_LOGIN = 'http://api.hutech.edu.vn';
  // public static readonly URL = 'http://api.hutech.edu.vn';

  //API BETA RELEASE TEST
  // public static readonly URL_LOGIN = 'http://apibeta.hutech.edu.vn';
  // public static readonly URL = 'http://apibeta.hutech.edu.vn';

  // public static readonly URL_LOG = 'http://test6.hutech.edu.vn';
  public static readonly URL_LOG = 'http://log.hutech.edu.vn';

  //đường dẫn thu mục lưu file
  public static readonly URL_FILES = 'http://newsapi.lamgigio.net/files';
}

export class Version {
  public static readonly APP_ID = 'MOBILE_HUTECH';
  public static readonly VERSION = "VERSION";
  public static readonly VERSION_ID = "3.2.10";
  public static readonly KEY_CAPTCHA = "test";
}

export class MenuAuthen {
  public static readonly TEST_MENU = 9999999;

}




export class ErrorVariable {
  public static readonly CONNECTION_REFUED = 1321;
}

export class ResponseStatusCode {
  public static readonly CONNECTION_REFUED = 0;
}

export class CkEditorConfig {
  public static readonly CKEDITOR_CONFIG = {
    uiColor: '#F0F3F4',
    height: '400',
    toolbar: [
      { name: 'document', items: ['Source', '-', 'Save', 'NewPage', 'Preview', 'Print', '-', 'Templates', 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo', 'Find', 'Replace', '-', 'SelectAll', '-', 'Scayt', 'Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField', 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'CopyFormatting', 'RemoveFormat', 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl', 'Language', 'Link', 'Unlink', 'Anchor', 'Image', 'Flash', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe', 'Styles', 'Format', 'Font', 'FontSize', 'TextColor', 'BGColor', 'Maximize', 'ShowBlocks', 'About'] }
    ],
    resize_enabled: true,
    filebrowserBrowseUrl: 'http://admin.fhouse.vn/test/ckfinder.html',
    filebrowserUploadUrl: `http://admin.fhouse.vn/test/core/connector/php/connector.php?command=QuickUpload&type=Files`

  };
}


/**
 * Thời gian hết hạn của Cookie
 */
export class CookieConfig {
  /**Thời gian chết của cookie */
  public static readonly EXPIRES = 7;
  /**Tên Object lưu dưới cookie Authen */
  public static readonly AUTHEN_COOKIE = 'Auth-menu';
  public static readonly IMAGE_COOKIE = 'Image-menu';
  public static readonly NVID_COOKIE = 'Nvid-menu';
  public static readonly NAME_COOKIE = 'name-menu';
}


export class ImageVariables {
  // public static readonly IMAGE_DOMAIN = 'http://localhost:3100';

  // test
  public static readonly IMAGE_DOMAIN = 'http://newsapi.lamgigio.net/files';

  // release
  // public static readonly IMAGE_DOMAIN = 'http://api.xemgigio.net/adminnews';

  public static readonly SLIDE_SHOW_RESOLUTION_WIDTH = 1024;
  public static readonly SLIDE_SHOW_RESOLUTION_HEIGHT = 768;
}

export class Paging {
  public static readonly PAGING = [
    { value: 10, text: '10 dòng' },
    { value: 20, text: '20 dòng' },
    { value: 50, text: '50 dòng' },
    { value: 100, text: '100 dòng' },
    { value: 200, text: '200 dòng' }
  ];
}

export class STATUS_DATA {
  static readonly ACTIVE = 'active';
  //static readonly DELETE = 'delete';
  static readonly PENDING = 'pending';
}