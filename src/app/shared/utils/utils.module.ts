import {NgModule} from "@angular/core";
import {MomentPipe} from "@shared/utils/moment.pipe";
import {TimeDirective} from "@shared/utils/time.directive";
import { FieldFilterPipe } from '@shared/utils/field-filter.pipe';
import {BodyService} from "@shared/utils/body.service";
import {NotificationService} from "@shared/utils/notification.service";
import {ToggleActiveDirective} from "@shared/utils/toggle-active.directive";

@NgModule({
  declarations: [ToggleActiveDirective, MomentPipe, TimeDirective, FieldFilterPipe],
  exports: [ToggleActiveDirective, MomentPipe, TimeDirective, FieldFilterPipe],
  providers: [BodyService, NotificationService]
})
export class UtilsModule{
  static forRoot(){
    return {
      ngModule: UtilsModule,
      providers: [BodyService, NotificationService]
    }
  }
}
