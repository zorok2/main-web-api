import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlVariable } from "app/util/variable";


@Injectable()
export class TodoService {
  private url = `${UrlVariable.URL_TODO}/api/todo`;
  constructor(private http: HttpClient) { }


  getList = (): Promise<any> => {
    return this.http.get(`${this.url}/get-list`)
      .toPromise()
      .then(res => {
        return res;
      });
  }

  create = (content): Promise<any> => {
    return this.http.post(`${this.url}/create`, {
      content: content
    })
      .toPromise()
      .then(res => {
        return res;
      });
  }

  update = (todo): Promise<any> => {
    return this.http.post(`${this.url}/update`, {
      id: todo.id,
      content: todo.content,
      checked: todo.checked,
    })
      .toPromise()
      .then(res => {
        return res;
      });
  }

  delete = (id): Promise<any> => {
    return this.http.post(`${this.url}/delete`, {
      id: id
    })
      .toPromise()
      .then(res => {
        return res;
      });
  }
}
