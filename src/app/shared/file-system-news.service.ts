import { Injectable } from '@angular/core';
import { UrlVariable } from '@util/variable';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class FileSystemNewsService {

    constructor(private _http: HttpClient) {
    }

    public getFileBlob(serverFileName: string): Promise<any> {
        return this._http.get(`${UrlVariable.URL_FILES}/api/files/getFile?fileName=${serverFileName}`)
            .toPromise()
            .then(response => {
                return response;
            })
            .catch(error => {
                console.error('ERROR khi get 1 file', error);
                Promise.reject(error);
            })
    }

    /* 
    lấy file theo idItem và table Name
    */
    public getFiles(idItem: any, tableName: string): Promise<any> {
        return this._http.get(`${UrlVariable.URL_FILES}/api/files/getFiles?idItem=${idItem}&tableName=${tableName}`)
            .toPromise()
            .then(response => {
                return response;
            })
            .catch(error => {
                console.error('ERROR khi get files', error);
                Promise.reject(error);
            })
    }

    /* 
    xóa 1 hay nhiều file
    */
    public deleteFile(fileSystemGuid: any[]): Promise<any> {
        let body = {};
        body['fileSystemGuid'] = fileSystemGuid;
        return this._http.post(`${UrlVariable.URL_FILES}/api/files/deleteFiles`, body)
            .toPromise()
            .catch(error => {
                console.error('ERROR khi delete file', error);
                Promise.reject(error);
            })
    }

    /* 
    @author: Bình
    lấy thông tin 1 file
    */
    public getsByFileSystemGuids(fileSystemGuids: number[]): Promise<any> {
        return this._http.post(`${UrlVariable.URL_FILES}/api/files/gets-by-file-system-guids`, { file_system_guids: fileSystemGuids })
            .toPromise()
            .then(value => value['result'])
            .catch(error => {
                console.error('ERROR khi delete file', error);
                Promise.reject(error);
            })
    }

}
