import { ErrorHandler, Injectable, Injector } from '@angular/core'
import { UrlVariable, Version, CookieConfig } from 'app/util/variable'
import { ManageStateService } from 'app/shared/manage-state.service'
import { environment } from '../../environments/environment'
import { HttpClient } from '@angular/common/http';

export class LogHelper {
  public static constructBody() {
    let body: any = {}
    body['diuu'] = 'tuts-manager'
    return body
  }

  public static constructQuery(ho_ten?: any) {
    let query = `?diuu=tuts-manage&`
    return query
  }
}

@Injectable()
export class LogService {
  constructor(
    private http: HttpClient,
    private manageStateService: ManageStateService
  ) { }
  saveLog(error) {
    this.http
      .post(`${UrlVariable.URL_LOG}api/logerror/save`, {
        content: error.message || error,
        user_des: this.manageStateService.load(CookieConfig.NVID_COOKIE),
        app: Version.APP_ID,
      })
      .toPromise()
      .catch(error => {
        console.error(error)
      })
  }
}

@Injectable()
export class MyErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) { }

  handleError(error) {
    // do something with the exception
    console.error(error)
    if (environment.production) {
      const logService = this.injector.get(LogService)
      logService.saveLog(error)
    }
  }
}
