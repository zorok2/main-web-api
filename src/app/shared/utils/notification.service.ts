import { Injectable } from '@angular/core'
import { Router } from '@angular/router';

declare var $: any

@Injectable()
export class NotificationService {
  constructor(
    private router: Router
  ) { }

  smallBox(data, cb?) {
    $.smallBox(data, cb)
  }

  bigBox(data, cb?) {
    $.bigBox(data, cb)
  }

  smartMessageBox(data, cb?) {
    $.SmartMessageBox(data, cb)
  }


  errorAPIMessageBox() {
    $.SmartMessageBox({
      title: "Hiện tại không kết nối được tới server",
      content: "Xin hãy kiểm tra thiết bị có kết nối internet hay không. Nếu có internet mà lỗi này vẫn hiện xin hãy báo lại với chúng tôi",
      buttons: '[Quay về Trang chủ]'
    }, (ButtonPressed) => {
      this.router.navigate(['/admin/']);
    })
  }

  error(_content) {
    this.bigBox({
      title: "Lỗi",
      content: _content,
      icon: 'fa fa-warning shake animated',
      color: "#C46A69",
      timeout: 6000
    })
  }
  warning(_content) {
    this.bigBox({
      title: "Cảnh báo",
      content: _content,
      icon: 'fa fa-shield shake animated',
      color: "#C79121",
      timeout: 6000
    })
  }

  success(_content) {
    this.smallBox({
      title: "Thành công",
      content: _content,
      color: '#296191',
      timeout: 2000,
    })
  }

  info(_title, _content) {
    this.smallBox({
      title: _title,
      content: _content,
      color: '#e50d0b',
      timeout: 4000,
      // icon: 'fa fa-warning shake animated',
    })
  }
}
