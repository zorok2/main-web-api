import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { SmartadminModule } from '@shared/smartadmin.module'

import { FeedbackComponent } from './feedback.component'

import { FeedbackService } from './feedback.service'
import { ManageStateService } from 'app/shared/manage-state.service'

@NgModule({
  imports: [CommonModule, SmartadminModule],
  declarations: [FeedbackComponent],
  exports: [FeedbackComponent],
  providers: [FeedbackService, ManageStateService],
})
export class FeedbackModule {}
