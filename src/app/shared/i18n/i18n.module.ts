import {NgModule} from "@angular/core";

import {LanguageSelectorComponent} from "@shared/i18n/language-selector/language-selector.component";
import {I18nPipe} from "@shared/i18n/i18n.pipe";
import {I18nService} from "@shared/i18n/i18n.service";
import {CommonModule} from "@angular/common";
import {BsDropdownModule} from "ngx-bootstrap";

@NgModule({
  imports: [
    CommonModule,
    BsDropdownModule,
  ],
  declarations:[
    LanguageSelectorComponent,
    I18nPipe
  ],
  exports: [LanguageSelectorComponent, I18nPipe],
  providers: [I18nService]

})
export class I18nModule{}
