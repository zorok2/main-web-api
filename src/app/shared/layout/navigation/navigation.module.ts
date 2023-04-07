import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { I18nModule } from '@shared/i18n/i18n.module'
import { BigBreadcrumbsComponent } from '@shared/layout/navigation/big-breadcrumbs.component'
import { MinifyMenuComponent } from '@shared/layout/navigation/minify-menu.component'
import { NavigationComponent } from '@shared/layout/navigation/navigation.component'
import { SmartMenuDirective } from '@shared/layout/navigation/smart-menu.directive'
import { UserModule } from '@shared/user/user.module'
// import {ChatModule} from "../../chat/chat.module";

import { AuthDirective } from '@components/auth/auth.directive'

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    I18nModule,
    UserModule,
    // ChatModule
  ],
  declarations: [
    BigBreadcrumbsComponent,
    MinifyMenuComponent,
    NavigationComponent,
    SmartMenuDirective,
    AuthDirective,
  ],
  exports: [
    BigBreadcrumbsComponent,
    MinifyMenuComponent,
    NavigationComponent,
    SmartMenuDirective,
    AuthDirective
  ],
})
export class NavigationModule { }
