import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie'
import { TokenService } from '@components/auth/token.service'
import { UrlVariable, CookieConfig, Version } from '@util/variable'
import { ManageStateService } from '@shared/manage-state.service'
import { Subject } from 'rxjs';


@Injectable()
export class AuthService {

  /* 
  url cho việc chứng thực
  */
  private readonly URL_LOGIN = UrlVariable.URL_LOGIN + '/api/auth';

  public image: string = ''
  public hoTen: string = ''
  public NhanVienID: string = ''
  public email: any

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  public user: Subject<any>;
  constructor(
    private _tokenService: TokenService,
    private _http: HttpClient,
    private _cookieService: CookieService,
    private manageStateService: ManageStateService
  ) {
    this.user = new Subject();
  }

  /* 
  kiểm tra login hay chưa
  */
  public isLoggedIn(): boolean {
    if (
      this._tokenService.isTokenExists()
    ) {
      return false
    } else {
      return true
    }
  }

  /**
   * @author Bình
   * @function Login
   * @param username Email
   * @param password password
   */
  login(
    username: string,
    password: string,
    captcha: string = null
  ): Promise<boolean> {
    return this._http
      .post(`${this.URL_LOGIN}/login`, {
        username: username,
        password: password,
        captcha: captcha,
        app: Version.APP_ID,
        diuu: '123',
      })
      .toPromise()
      .then(res => {

        /* 
        kết quả trả về từ phía server
        */
        const token = res['token']
        const listMenu_active = res['listmenu_active']
        this.hoTen = res['result']['Ho_Ten']
        this.image = res['result']['image']
        this.NhanVienID = res['result']['NhanVienID']

        this._tokenService.setToken(token);

        /* 
        lưu menu vào cookie để phân quyền
        */
        this.manageStateService.saveWithExpired(
          CookieConfig.AUTHEN_COOKIE,
          listMenu_active
        )

        /* 
        lưu image vào cookie
        */
        this.manageStateService.saveWithExpired(
          CookieConfig.IMAGE_COOKIE,
          this.image
        )

        /* 
        lưu mã nhân viên vào cookie
        */
        this.manageStateService.saveWithExpired(
          CookieConfig.NVID_COOKIE,
          this.NhanVienID
        )

        /* 
        lưu họ tên vào cookie
        */
        this.manageStateService.saveWithExpired(
          CookieConfig.NAME_COOKIE,
          this.hoTen
        )

        return true
      })

    // return Observable.of(true).delay(1000).do(val => this.isLoggedIn = true);
  }

  /* 
  @author Bình
  đăng xuất
  */
  logout(): Promise<any> {
    return this._http
      .post(`${this.URL_LOGIN}/logout`, {}, { responseType: 'text' })
      .toPromise()
      .then(() => {
        this._cookieService.removeAll()
        return this._tokenService.clearToken()
      })
  }

  /**
   * @author Bình
   * đổi mật khẩu
   */

  changePass = (value: any): Promise<any> => {
    return this._http
      .post(`${this.URL_LOGIN}/change-password`, value)
      .toPromise()
      .then(res => res)
      .catch(error => {
        //this.logger.LogError(error)
        return Promise.reject(error)
      })
  }




  // -----------------------------------------------------------------------------------------------------------
  register(info): Promise<any> {
    /**
     * Logout phía server chưa có
     */
    return this._http
      .post(`${this.URL_LOGIN}/register`, {
        username: info.username,
        email: info.email
      })
      .toPromise()
      .then(res => res)
  }

  verify(token): Promise<any> {
    /**
     * Logout phía server chưa có
     */
    return this._http
      .post(`${this.URL_LOGIN}/verify-register`, {
        token: token,
      })
      .toPromise()
      .then(res => res)
  }

  setPassOneTime(token, password): Promise<any> {
    /**
     * Logout phía server chưa có
     */
    return this._http
      .post(`${this.URL_LOGIN}/set-pass-one-time`, {
        token: token,
        password: password
      })
      .toPromise()
      .then(res => res)
  }

  /**
   * chuongtv
   * Kiem tra quyen menu dung cho ts
   */
  checkMenuAuthent(menuid: number): boolean {
    const keys = this._cookieService.get(CookieConfig.AUTHEN_COOKIE)
    if ((!keys || keys.length === 0) && +menuid !== -1) {
      return false
    }
    const authen = keys.split(',').find(x => +x === +menuid)
    if (!authen && menuid && +menuid !== -1) {
      return false
    }
    return true
  }


  getEmail(username: string, tokenCapCha: string) {
    return this._http
      .post(`${this.URL_LOGIN}/get-email`, {
        username: username,
        capcha: tokenCapCha,
      })
      .toPromise()
      .then(res => res)
  }

  confrimChangePassword(token: string) {
    return this._http
      .post(`${this.URL_LOGIN}/reset-password`, {
        token: token,
      })
      .toPromise()
      .then(res => res)
  }

  changePassword(newPassword: string, token: string) {
    return this._http
      .post(`${this.URL_LOGIN}/change-password`, {
        newpassword: newPassword,
        token: token,
      })
      .toPromise()
      .then(res => res)
  }
}
