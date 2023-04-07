/**
* module
*/
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { BsModalRef, BsModalService } from 'ngx-bootstrap';

import * as _ from 'lodash';
import { TodoService } from '../shared/todo.service';
import { Todo } from '../shared';

/**
* model và service
*/

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  private _isLoaded = false;
  private content: string = "";

  private list: Todo[];
  constructor(
    private router: Router,
    private service: TodoService,
    private fb: FormBuilder,
    private modalService: BsModalService
  ) {
    // 
  }

  /*
  dữ liệu trả về
  */
  ngOnInit() {
    this._isLoaded = false;
    this.getList().then(value => {
      this.list = value
      this._isLoaded = true
      return value;
    });
  }

  private edit(id) {
    let elem = this.list.find(e => e.id == id)
    elem.edit = !elem.edit
  }

  private check(id) {
    let elem = this.list.find(e => e.id == id)
    elem.checked = !elem.checked
    return this.service.update(elem)
  }

  private create(): Promise<void> {
    if (!this.content.trim()) {
      return;
    }
    return this.service.create(this.content).then((result) => {
      this.list.push(new Todo({
        id: result.id,
        content: this.content,
        trang_thai: 0,
        time_create: new Date()
      }))
      this.content = ""
    })
  }

  private update(todo): Promise<void> {
    if (!todo.content.trim()) {
      return;
    }
    todo.edit = false;
    return this.service.update(todo)
  }

  private delete(id): Promise<void> {
    _.remove(this.list, (elem) => elem.id == id)
    return this.service.delete(id)
  }

  /**
 * gọi hàm lấy dữ liệu từ api
 */
  private getList(): Promise<any[]> {
    return this.service.getList()
  }
}
