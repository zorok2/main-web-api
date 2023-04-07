import { ValidatorFn, AbstractControl } from "@angular/forms";
import * as _ from "lodash";

export function emptyStringValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        return (!control.value || _.isNil(control.value.trim()) || _.isEmpty(control.value.trim()))
            ? { 'emptyString': { value: control.value } } : null;
    };
}

export function isObject() {
    return (control: AbstractControl): { [key: string]: any } => {
        try {
            JSON.parse(control.value);
            return null;
        } catch (error) {
            return { 'notObject': { value: control.value } };
        }
    };
}
