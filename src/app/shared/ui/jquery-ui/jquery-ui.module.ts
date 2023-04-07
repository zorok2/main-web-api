import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {JquiDialogLauncher} from "@shared/ui/jquery-ui/jqui-dialog/jqui-dialog-launcher.directive";
import {JquiAccordion} from "@shared/ui/jquery-ui/jqui-accordion.directive";
import {JquiMenu} from "@shared/ui/jquery-ui/jqui-menu.directive";
import {JquiAutocomplete} from "@shared/ui/jquery-ui/jqui-autocomplete.directive";
import {JquiProgressbar} from "@shared/ui/jquery-ui/jqui-progressbar.directive";
import {JquiSpinner} from "@shared/ui/jquery-ui/jqui-spinner.directive";
import {JquiSlider} from "@shared/ui/jquery-ui/jqui-slider.directive";
import {JquiTabs} from "@shared/ui/jquery-ui/jqui-tabs.directive";
import {JquiDialog} from "@shared/ui/jquery-ui/jqui-dialog/jqui-dialog.directive";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    JquiDialog,
    JquiDialogLauncher,
    JquiAccordion,
    JquiMenu,
    JquiAutocomplete,
    JquiProgressbar,
    JquiSpinner,
    JquiSlider,
    JquiTabs,
  ],
  exports: [
    JquiDialog,
    JquiDialogLauncher,
    JquiAccordion,
    JquiMenu,
    JquiAutocomplete,
    JquiProgressbar,
    JquiSpinner,
    JquiSlider,
    JquiTabs,
  ]
})
export class JqueryUiModule {
}
