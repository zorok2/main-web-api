import { Component, ViewChild, Input, EventEmitter, Output } from "@angular/core";
import { DatatableComponent } from "@swimlane/ngx-datatable";
import * as _ from 'lodash';
import { Observable } from "rxjs/Observable";
import { ManageStateService } from "@shared/manage-state.service";

@Component({
    selector: 'custom-ng-datatable',
    templateUrl: './ng-datatable.component.html',
    styleUrls: ['./ng-datatable.component.css'],
})
export class CustomNgDatatableComponent {
    @Input() itemsPerPage = 10;
    @Input() currentPage = 0;
    @Input() hasCheckBox = false;
    @Input() columns: { prop: string, name: string, width: number, hidden: boolean }[] = [];
    @Input() api;
    @Input() total = 0;
    @Input() key = "";
    @Input() hasDetail = false;

    @Output() changePage = new EventEmitter()
    @Output() check = new EventEmitter()
    @Output() detail = new EventEmitter()

    private allColumn = [];
    private loadingIndicator: boolean = false;

    private rows = [];
    private allProp = [];
    private selected = [];

    @ViewChild(DatatableComponent) table: DatatableComponent;

    constructor(private manageStateService: ManageStateService) {
    }

    ngOnInit() {
        this.allProp = this.columns.map(elem => elem.prop);
        this.allColumn = this.columns;
        this.allColumn.forEach((col, index) => {
            col["index"] = index
        })
        this.columns = this.columns.filter(elem => !elem.hidden)
        // this.getWidth();
        this.getColumn();
        this.getData();
    }

    getData() {
        return this.api.then((result) => {
            this.rows = []
            result.forEach((element, index) => {
                this.rows.push(element)
            });
            this.loadingIndicator = true;
        })
    }

    toggle(event: Event, col) {
        event.preventDefault();
        const isChecked = this.isChecked(col);

        if (isChecked) {
            if (this.columns.length < 2) {
                event.stopPropagation();
                return;
            }
            this.columns = this.columns.filter(c => {
                return c.name !== col.name;
            });
        } else {
            this.columns = [...this.columns, col];
        }
        this.manageStateService.save(this.key + '_smarttable', this.columns)

    }

    isChecked(col) {
        return this.columns.find(c => {
            return c.prop === col.prop;
        });
    }


    private calculateAlphaNumber(): number {
        return this.currentPage * this.itemsPerPage;
    }

    /**
     * Populate the table with new data based on the page number
     * @param page The page to select
     */
    setPage(pageInfo) {
        this.currentPage = pageInfo.offset;
        this.changePage.emit(this.currentPage);
    }

    onSelect({ selected }) {
        this.selected.splice(0, this.selected.length);
        this.selected.push(...selected);
        this.check.emit(this.selected)
    }

    onActivate(event) {
        // console.log('Activate Event', event);
    }

    resize(evt) {
        this.saveColumn();
    }

    getColumn() {
        let cookie = this.manageStateService.load(this.key + '_smarttable')
        if (cookie) {
            this.columns = cookie
        }
    }

    saveColumn() {
        this.columns.forEach(col => {
            col.width = Math.round(this.table.recalculateColumns().find(elem => elem.name === col.name).width || 100)
        })
        this.manageStateService.save(this.key + '_smarttable', this.columns)
    }

    goToDetail(row) {
        this.detail.emit(row)
    }

    clearCookie() {
        this.manageStateService.clear(this.key + '_smarttable')
    }
}
