import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {StatsComponent} from "@shared/stats/stats.component";
import {InlineGraphsModule} from "@shared/graphs/inline/inline-graphs.module";

@NgModule({
  imports: [CommonModule, InlineGraphsModule],
  declarations: [StatsComponent],
  exports: [StatsComponent],
})
export class StatsModule {}
