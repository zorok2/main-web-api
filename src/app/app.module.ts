import { NgModule, ApplicationRef, ErrorHandler } from '@angular/core'
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule, Router } from '@angular/router'
import { GestureConfig } from '@angular/material'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar'
import { CookieModule } from 'ngx-cookie'
import { ModalModule } from 'ngx-bootstrap/modal'
// import { CommonModule } from '@angular/common'

import { ManageStateService } from '@shared/manage-state.service'
import { FileSystemNewsService } from '@shared/file-system-news.service'
import { AuthService } from '@components/auth/auth.service'
import { TokenService } from '@components/auth/token.service'

import { AuthGuard } from '@guards/auth.guard'
import { ResetPasswordGuard } from '@guards/reset-password.guard'

import { PagesModule } from '@pages/pages.module'
import { CoreModule } from '@core/core.module'
import { SmartadminLayoutModule } from '@shared/layout/layout.module'
import { FeedbackModule } from '@components/feedback/feedback.module'

import { LogService, MyErrorHandler } from '@util/logHelper'

// import { AngularFireModule } from 'angularfire2'
// import { AngularFireDatabaseModule } from 'angularfire2/database'
// import { AngularFireAuthModule } from 'angularfire2/auth'

import { APP_RESOLVER_PROVIDERS } from './app.resolver'
import { AppState, InternalStateType } from './app.service'
import { GlobalState } from './global.state'
import { routing } from './app.routing'
import { AppComponent } from './app.component'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientCustom } from '@components/auth/custom-http-client';

// import { NewsManageSettingService } from 'app/components/news-manage-setting/shared/news-manage-setting.service'

const APP_PROVIDERS = [...APP_RESOLVER_PROVIDERS, AppState, GlobalState]

export type StoreType = {
  state: InternalStateType
  restoreInputValues: () => void
  disposeOldHosts: () => void
}

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [
    // CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    SmartadminLayoutModule,
    FeedbackModule,
    PagesModule,
    // AngularFireModule.initializeApp(firebaseConfig),
    // AngularFireDatabaseModule,
    // AngularFireAuthModule,
    // NgaModule.forRoot(),
    NgbModule.forRoot(),
    SlimLoadingBarModule.forRoot(),
    CookieModule.forRoot(),
    ModalModule.forRoot(),
    routing,
  ],

  providers: [
    // expose our Services and Providers into Angular's dependency injection
    // ENV_PROVIDERS,
    APP_PROVIDERS,
    ManageStateService,
    TokenService,
    AuthGuard,
    ResetPasswordGuard,
    AuthService,
    LogService,
    { provide: ErrorHandler, useClass: MyErrorHandler },
    { provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpClientCustom,
      multi: true
    },
    // NewsManageSettingService,
    FileSystemNewsService,
  ],
})
export class AppModule {
  constructor(public appRef: ApplicationRef, public appState: AppState) { }
}
