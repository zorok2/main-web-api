import { Pipe, PipeTransform } from '@angular/core';
import { Util } from '@util/util';
import { UrlVariable } from '@util/variable';

@Pipe({
  name: 'getUrlUploadFile'
})
export class GetUrlUploadFilePipe implements PipeTransform {

  transform(value: any, url_upload_file: string = UrlVariable.URL_FILES): any {
    return Util.getUrlUploadFile(value, url_upload_file);
  }

}
