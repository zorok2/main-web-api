import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { HeaderModule } from "@shared/layout/header/header.module";
import { FooterComponent } from "@shared/layout/footer/footer.component";
import { NavigationModule } from "@shared/layout/navigation/navigation.module";
import { RibbonComponent } from "@shared/layout/ribbon/ribbon.component";
import { ShortcutComponent } from "@shared/layout/shortcut/shortcut.component";
import { ToggleActiveDirective } from "@shared/utils/toggle-active.directive";
import { LayoutSwitcherComponent } from "@shared/layout/layout-switcher.component";
import { MainLayoutComponent } from '@shared/layout/app-layouts/main-layout.component';
import { EmptyLayoutComponent } from '@shared/layout/app-layouts/empty-layout.component';
import { RouterModule } from "@angular/router";
import { AuthLayoutComponent } from '@shared/layout/app-layouts/auth-layout.component';
import { TooltipModule, BsDropdownModule } from "ngx-bootstrap";
import { RouteBreadcrumbsComponent } from '@shared/layout/ribbon/route-breadcrumbs.component';
import { UtilsModule } from "@shared/utils/utils.module";

@NgModule({
  imports: [
    CommonModule,
    HeaderModule,
    NavigationModule,
    FormsModule,
    RouterModule,

    UtilsModule,


    TooltipModule,
    BsDropdownModule,
  ],
  declarations: [
    FooterComponent,
    RibbonComponent,
    ShortcutComponent,
    LayoutSwitcherComponent,
    MainLayoutComponent,
    EmptyLayoutComponent,
    AuthLayoutComponent,
    RouteBreadcrumbsComponent,
  ],
  exports: [
    HeaderModule,
    NavigationModule,
    FooterComponent,
    RibbonComponent,
    ShortcutComponent,
    LayoutSwitcherComponent,
  ]
})
export class SmartadminLayoutModule {

}
