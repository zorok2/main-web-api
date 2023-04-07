import { Component, OnInit } from '@angular/core';
import {languages} from '@shared/i18n/languages.model'
import {I18nService} from "@shared/i18n/i18n.service";

@Component({
  selector: 'sa-language-selector',
  templateUrl: './language-selector.component.html',
})
export class LanguageSelectorComponent implements OnInit {

  public languages: Array<any>;
  public currentLanguage: any;

  constructor(private i18n: I18nService) {
  }

  ngOnInit() {
    this.languages = languages;
    this.currentLanguage = this.i18n.currentLanguage;
  }

  setLanguage(language){
    this.currentLanguage = language;
    this.i18n.setLanguage(language)
  }

}
