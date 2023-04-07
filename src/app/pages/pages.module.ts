import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Ng2Webstorage } from 'ngx-webstorage/dist/app'

import { routing } from './pages.routing'
// import { AppTranslationModule } from '../app.translation.module'

import { Pages } from './pages.component'
import { UtilsModule } from '@shared/utils/utils.module'
import { TodoModule } from '@components/todo/todo.module'
import { SharedModule } from '@shared/shared.module'

@NgModule({
  imports: [
    CommonModule,
    // AppTranslationModule,
    UtilsModule,
    Ng2Webstorage.forRoot(),
    routing,
    SharedModule,
    TodoModule,
  ],
  declarations: [Pages],
  providers: [

  ],
})
export class PagesModule { }
