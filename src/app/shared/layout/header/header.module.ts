import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {NgModule} from "@angular/core";

import {PopoverModule} from "ngx-popover";

import {CollapseMenuComponent} from "@shared/layout/header/collapse-menu/collapse-menu.component";
import {RecentProjectsComponent} from "@shared/layout/header/recent-projects/recent-projects.component";
import {FullScreenComponent} from "@shared/layout/header/full-screen/full-screen.component";

import {ActivitiesComponent} from "@shared/layout/header/activities/activities.component";
import {ActivitiesMessageComponent} from "@shared/layout/header/activities/activities-message/activities-message.component";
import {ActivitiesNotificationComponent} from "@shared/layout/header/activities/activities-notification/activities-notification.component";
import {ActivitiesTaskComponent} from "@shared/layout/header/activities/activities-task/activities-task.component";
import {HeaderComponent} from "@shared/layout/header/header.component";

import {UtilsModule} from "@shared/utils/utils.module";
import {I18nModule} from "@shared/i18n/i18n.module";
import {UserModule} from "@shared/user/user.module";
// import {VoiceControlModule} from "../../voice-control/voice-control.module";
import {BsDropdownModule} from "ngx-bootstrap";


@NgModule({
  imports: [
    CommonModule,

    FormsModule,

    // VoiceControlModule,

    BsDropdownModule,

    UtilsModule, I18nModule, UserModule, PopoverModule,
  ],
  declarations: [
    ActivitiesMessageComponent,
    ActivitiesNotificationComponent,
    ActivitiesTaskComponent,
    RecentProjectsComponent,
    FullScreenComponent,
    CollapseMenuComponent,
    ActivitiesComponent,
    HeaderComponent,
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule{}
