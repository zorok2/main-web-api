import { UrlVariable } from "./variable";
import * as _ from 'lodash';

export class Util {
    /**
    * Decode base64 để download
    */
    static convert(base64) {
        let binary_string = window.atob(base64);
        let len = binary_string.length;
        let bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
    }

    /**
    * @author Bình
    * format đường dẫn upload file
    * @param url_file: url api file
    * @param path: đường dẫn file 
    */
    static getUrlUploadFile(path: string, url_file: string = UrlVariable.URL_FILES): string {
        /* 
        không có đường dẫn
        */
        if (_.isNil(path) || path.trim().length == 0) {
            return '';
        }

        /* 
        không có url_file và không phải chuỗi base64
        */
        if (['http://', 'https://'].every(x => path.indexOf(x) == -1) == true && path.indexOf('data:image') == -1) {
            return url_file + "/" + path;
        }
        return path;
    }
}