import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { NgSpinKitModule } from 'ng-spin-kit'
import { AlertModule } from 'ngx-bootstrap'

import { SharedModule } from '@shared/shared.module'

import { LoginComponent } from '@components/auth/login/login.component'
import {
  RecaptchaModule,
  RECAPTCHA_SETTINGS,
  RECAPTCHA_LANGUAGE,
  RecaptchaSettings,
} from 'ng-recaptcha'
import { CommonModule } from '@angular/common'
import { Version } from '@util/variable'

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    NgSpinKitModule,
    RecaptchaModule.forRoot(),
    AlertModule.forRoot(),
  ],
  declarations: [
    LoginComponent,
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: { siteKey: Version.KEY_CAPTCHA },
    },
    {
      provide: RECAPTCHA_LANGUAGE,
      useValue: 'vi', // use VIET NAME language
    },
  ],
})
export class LoginModule { }
