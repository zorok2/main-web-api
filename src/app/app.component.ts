import { Component, ViewContainerRef } from '@angular/core'
import * as $ from 'jquery'

import { GlobalState } from './global.state'
// import {
//   BaImageLoaderService,
//   BaThemePreloader,
//   BaThemeSpinner,
// } from './theme/services'
// import { BaThemeConfig } from './theme/theme.config'
// import { layoutPaths } from './theme/theme.constants'

import {
  Router,
  Event as RouterEvent,
  NavigationStart,
  NavigationCancel,
  NavigationError,
  NavigationEnd,
} from '@angular/router'
import { SlimLoadingBarService } from 'ng2-slim-loading-bar'

// import { AngularFireDatabase } from 'angularfire2/database'
// import { AngularFireAuth } from 'angularfire2/auth'
import { Observable } from 'rxjs/Observable'
import { ManageStateService } from '@shared/manage-state.service'
import { Version } from '@util/variable'
import * as _ from 'lodash'
import { AuthService } from '@components/auth/auth.service'

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  template: `
  <div id="container">
    <div class="additional-bg"></div>
    <router-outlet></router-outlet>
    <feedback></feedback>
  </div>
  `,
})
export class AppComponent {
  isMenuCollapsed: boolean = false
  loading: boolean = true
  database
  fbVersion
  fbNotifi

  constructor(
    private _state: GlobalState,
    // private _imageLoader: BaImageLoaderService,
    private manageStateService: ManageStateService,
    // private _spinner: BaThemeSpinner,
    private viewContainerRef: ViewContainerRef,
    // private themeConfig: BaThemeConfig,
    private router: Router,
    // private af: AngularFireDatabase,
    private slimLoader: SlimLoadingBarService,
    private authenService: AuthService
  ) {
    // themeConfig.config()

    this._loadImages()

    this._state.subscribe('menu.isCollapsed', isCollapsed => {
      this.isMenuCollapsed = isCollapsed
    })

    // bắt event khi đang routing để hiện dòng loading nhỏ nhỏ bên trên
    router.events.subscribe(
      (event: RouterEvent) => {
        if (event instanceof NavigationStart) {
          this.slimLoader.start()
        } else if (
          event instanceof NavigationEnd ||
          event instanceof NavigationCancel ||
          event instanceof NavigationError
        ) {
          this.slimLoader.complete()
        }
      },
      error => {
        console.error('Loi khi routing', error)
        this.slimLoader.complete()
      }
    )
    // this._cookieService.put(Version.VERSION, Version.VERSION_ID);

    // Kết nối DB firebase
    // this.database = firebase.database()
    // this.fbVersion = this.database.ref().child('Version')
    // this.fbNotifi = this.database.ref().child('Notifi')

    // Chạy khi vào app và khi value trên firebase thay đổi
    // this.fbNotifi.on('child_changed', snap => {
    //   alert(snap.val())
    // })

    // Chạy khi vào app và khi value trên firebase thay đổi
    // this.fbVersion.on('value', snap => {
    //   // Load version trong cookie
    //   let version = this.manageStateService.load(Version.VERSION)
    //   // Nếu version trong cookie ko có
    //   if (_.isNil(version)) {
    //     // Lưu version lấy đc
    //     this.manageStateService.saveWithExpired(Version.VERSION, snap.val())
    //     return
    //   }
    //
    //   // Nếu version trong app khác version trên firebase
    //   if (version !== snap.val().trim()) {
    //     // refresh !!
    //
    //     alert('Đã có phiên bản mới. Vui lòng nhấn OK để cập nhật!')
    //     this.manageStateService.saveWithExpired(Version.VERSION, snap.val())
    //     this.authenService.logout().then(() => {
    //       this.router.navigate(['/admin/login/login'])
    //     })
    //   }
    // })
  }

  // public ngAfterViewInit(): void {
  //   // hide spinner once all loaders are completed
  //   BaThemePreloader.load().then(values => {
  //     this._spinner.hide()
  //   })
  // }

  private _loadImages(): void {
    // register some loaders
    // BaThemePreloader.registerLoader(
    //   this._imageLoader.load('/assets/img/sky-bg.jpg')
    // )
  }
}
