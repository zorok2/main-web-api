import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable'
// import 'rxjs/add/observable/of'
// import 'rxjs/add/operator/do'
// import 'rxjs/add/operator/delay'
// import 'rxjs/add/operator/toPromise'

@Injectable()
export class FeedbackService {
  constructor(private _http: HttpClient) { }

  public sendFeedback(data: { image; message; idNguoiGui }): Promise<boolean> {
    let formData: FormData = new FormData()
    formData.append('feedback_image', data.image, 'feedback-image.png')
    formData.append('feedback_message', data.message)
    formData.append('id_nguoi_gui', data.idNguoiGui)
    return this._http
      .post('http://localhost:3200/api/feedback/add', formData)
      .toPromise()
      .then(response => {
        return true
      })
      .catch(error => {
        return false
      })
  }
}
