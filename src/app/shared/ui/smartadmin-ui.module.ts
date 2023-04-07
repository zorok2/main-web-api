import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SmartProgressbarModule} from "@shared/ui/smart-progressbar/smart-progressbar.module";
import {TreeViewModule} from "@shared/ui/tree-view/tree-view.module";
import {JqueryUiModule} from "@shared/ui/jquery-ui/jquery-ui.module";
import {NestableListModule} from "@shared/ui/nestable-list/nestable-list.module";

@NgModule({
  imports: [CommonModule],

  exports: [SmartProgressbarModule, JqueryUiModule, NestableListModule, TreeViewModule],
})
export class SmartadminUiModule{}
