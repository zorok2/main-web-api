import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { JsonApiService } from './api/json-api.service'
import { LayoutService } from 'app/shared/layout/layout.service'
import { UserService } from 'app/shared/user/user.service'
// import { VoiceControlService } from 'app/shared/voice-control/voice-control.service'
import { SoundService } from "app/shared/sound/sound.service";



import { throwIfAlreadyLoaded } from './guards/module-import-guard';
// import {VoiceRecognitionService} from "app/shared/voice-control/voice-recognition.service";
import { TabsModule, ProgressbarModule, TooltipModule, BsDropdownModule, AlertModule } from "ngx-bootstrap";

@NgModule({
  imports: [
    CommonModule,
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    AlertModule.forRoot(),
    TabsModule.forRoot(),
  ],
  exports: [
    HttpClientModule
  ],
  declarations: [],
  providers: [
    JsonApiService,
    LayoutService,
    UserService,
    // VoiceControlService,
    // VoiceRecognitionService,
    SoundService,
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
