import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


import {
  ModalModule, ButtonsModule, TooltipModule, BsDropdownModule, ProgressbarModule, AlertModule, TabsModule,
  AccordionModule, CarouselModule
} from 'ngx-bootstrap'

import { PopoverModule } from "ngx-popover";

import { SmartadminLayoutModule } from '@shared/layout'

import { I18nModule } from "@shared/i18n/i18n.module";
import { UserModule } from "@shared/user/user.module";
// import {VoiceControlModule} from "./voice-control/voice-control.module";

import { SmartadminWidgetsModule } from "@shared/widgets/smartadmin-widgets.module";

import { UtilsModule } from "@shared/utils/utils.module";
// import {ChatModule} from "./chat/chat.module";
import { StatsModule } from "@shared/stats/stats.module";
import { InlineGraphsModule } from "@shared/graphs/inline/inline-graphs.module";
import { SmartadminFormsLiteModule } from "@shared/forms/smartadmin-forms-lite.module";
import { SmartProgressbarModule } from "@shared/ui/smart-progressbar/smart-progressbar.module";
import { SmartadminFormsModule } from "@shared/forms/smartadmin-forms.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SmartadminFormsModule


  ],
  declarations: [

  ],
  exports: [
    CommonModule, FormsModule, RouterModule,

    ModalModule,
    ButtonsModule,

    AlertModule,
    TabsModule,
    TooltipModule,
    BsDropdownModule,
    ProgressbarModule,


    PopoverModule,

    SmartadminLayoutModule,

    I18nModule,

    UtilsModule,

    SmartadminFormsLiteModule,

    SmartProgressbarModule,

    InlineGraphsModule,

    SmartadminWidgetsModule,

    // ChatModule,

    StatsModule,

    // VoiceControlModule,
    SmartadminFormsModule

  ]
})
export class SmartadminModule { }
