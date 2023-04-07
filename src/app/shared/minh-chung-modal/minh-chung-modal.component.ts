import { Component, ViewChild, Output, EventEmitter, OnChanges, SimpleChanges, Input, ViewContainerRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { FileSystemService } from '@shared/file-system.service';


@Component({
    selector: 'minh-chung-modal',
    templateUrl: './minh-chung-modal.component.html',
    styleUrls: ['./minh-chung-modal.component.css']
})
export class MinhChungModalComponent implements OnChanges {
    private _tableName;
    private _idItem;
    private _duocDanhGia: boolean;
    private _isMine: boolean;
    @Output() minhchung = new EventEmitter();
    @Output() onEmmitViewImage = new EventEmitter();
    @Output() onComplete = new EventEmitter();
    @Output() onDelete = new EventEmitter();
    @Input()
    public set duocDanhGia(value: any) {
        console.log('set duocDanhGia ' + value);
        this._duocDanhGia = value;
    }
    @Input()
    public set isMine(value: any) {
        console.log("isMine")
        console.log(value)
        this._isMine = value;
    }
    option = {
        multiple: false,
        allowType: ['jpeg',
            'png',
            'jpg'
        ],
        auto: true,
        fileView: 'thumb',
        allowDelete: true
    }
    @ViewChild('modal') private modal: ModalDirective;
    @ViewChild('myFileUpload') myFileUpload;
    ngOnChanges(changes: SimpleChanges) {
        this.myFileUpload.triggerChanges();
        console.log('simple change', changes);
        // changes.prop contains the old and the new value...
    }

    constructor(
    ) {
    }

    public show() {
        this.modal.show();
    }
    private save() {
        // this.myFileUpload.upload();
        this.minhchung.emit({ emmitValue: this.myFileUpload });
        this.modal.hide();
    }
    private hide() {
        this.clear_data();
        this.modal.hide();
    }
    private upload(evt) {
        this.onComplete.emit(evt);
    }
    public clear_data() {
        // console.log('set null _idItem, _tableName, picture');
        this.myFileUpload._idItem = null;
        this.myFileUpload._tableName = null;
        this.myFileUpload.picture = undefined;
        // console.log(this.myFileUpload._idItem, this.myFileUpload._tableName, this.myFileUpload.picture)
    }
    public emmitViewImage(e) {
        // console.log('emmitViewImage!', e)
        this.onEmmitViewImage.emit({ picture: e.picture })
    }
    public onDeleteEmit(e) {
        this.onDelete.emit(e);
    }

    private onError(msg) {
        // this.toastr.error(msg)
    }
}