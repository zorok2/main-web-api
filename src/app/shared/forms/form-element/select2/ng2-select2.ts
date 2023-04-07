import { NgModule } from '@angular/core';

export { Select2OptionData, Select2TemplateFunction } from '@shared/forms/form-element/select2/ng2-select2.interface';
import { Select2Component } from '@shared/forms/form-element/select2/ng2-select2.component';

export { Select2Component } from '@shared/forms/form-element/select2/ng2-select2.component';

@NgModule({
    declarations: [Select2Component],
    exports: [Select2Component]
})
export class HutechSelect2Module { }