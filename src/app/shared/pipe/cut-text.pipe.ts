import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'cutText'
})
export class CutTextPipe implements PipeTransform {
    transform(text: string, length: number = 100) {
        if (text) {
            if (text.length < length) {
                return text;
            }
            return text.slice(0, length) + '...';
        }
    }
}