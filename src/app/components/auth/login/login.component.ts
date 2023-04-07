import { Component, ViewChild } from '@angular/core'
import {
  FormGroup,
  AbstractControl,
  FormBuilder,
  Validators,
} from '@angular/forms'
import { Router } from '@angular/router'

import { Version } from '@util/variable'
import { AuthService } from '@components/auth/auth.service'

import { ManageStateService } from '@shared/manage-state.service'
import { RecaptchaComponent } from 'ng-recaptcha'

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @ViewChild('recaptcha') recaptcha: RecaptchaComponent
  private loginForm

  /* 
  
  */
  private _isRunning = false
  public error: any;

  private version = Version.VERSION_ID;

  private SoLanDangNhapSai: number = 0

  private _Captcha: boolean = true;
  private _TokenCatCha: string

  private thisYear: number = new Date().getFullYear()

  constructor(
    private authService: AuthService,
    private router: Router,
    private manageStateService: ManageStateService
  ) {
  }

  public onSubmit(form): void {
    /* 
    kiểm tra rỗng thì báo lỗi
    */
    if (
      !form.value.username ||
      !form.value.password ||
      form.value.username.trim() === '' ||
      form.value.password.trim() === ''
    ) {
      this.error = {}
      this.error.html = `Tài khoản hoặc mật khẩu không được để trống`
      return
    }

    this._isRunning = !this._isRunning
    this.authService
      .login(form.value.username, form.value.password, this._TokenCatCha)
      .then(
        () => {

          /*  
          đăng nhập thành công
          */
          if (this.authService.isLoggedIn()) {

            /* 
            đăng nhập thành công thì điều hướng vô 1 url nào đó xác định hay vô dashboard (nếu ko có url nào xác định)
            */
            const redirect = this.authService.redirectUrl
              ? this.authService.redirectUrl
              : '/admin/dashboard'
            // Redirect the user
            this._isRunning = !this._isRunning
            this.router.navigate([redirect])
          }
        },

        /* 
        đăng nhập lỗi
        */
        error => {
          this._isRunning = !this._isRunning;
          
          this.error = error.error;

          /* 
          400 -> sai pass
          401 -> tài khoản bị khoá hoặc không có quyền sử dụng app
          403 -> không có quyền
          405 -> đăng nhập sai quá nhiều
          500 -> service bị lỗi
          */
          switch (+this.error.code) {
            case 403:
            case 401:
              this.SoLanDangNhapSai += 1
              break
            case 400:
            case 406:
            case 405:
              this.SoLanDangNhapSai = this.error.SoLanDangNhapSai
              break
            default:
              this.SoLanDangNhapSai += 1
              break
          }

          // BEGIN recaptcha
          /* 
          nếu thoả điều kiện hơn hay = 5 lần thì reset capcha
          */
          if (this.recaptcha && this.SoLanDangNhapSai >= 5) {
            this.recaptcha.reset()
          }

          /* 
          reset lại 1 số thông tin
          */
          this._TokenCatCha = undefined

          /* 
          hiện cacha
          */
          this._Captcha = true
          // END recaptcha
        }
      )
  }

  /* 
  nhận token capcha khi trả lời đúng
  */
  resolved(event) {
    /* 
    nhận token capcha
    */
    this._TokenCatCha = event
    this._Captcha = false
  }

}
