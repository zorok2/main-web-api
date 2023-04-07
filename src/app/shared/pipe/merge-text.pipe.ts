import { Pipe, PipeTransform } from '@angular/core';
import { isArray } from 'util';

@Pipe({
    name: 'mergeText'
})
export class MegerText implements PipeTransform {
    transform(data) {
        let object = {
            all_name: [],
            all_id: []
        };

        if (isArray(data.tag)) {
            data.tag.forEach((element) => {
                object.all_id.push(data.tag[element]);
            });
        }
        if (isArray(data.user)) {
            data.user.forEach((element, i) => {
                object.all_name.push(element);
            });

        }

        return object;
    }
}