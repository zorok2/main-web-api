import { Pipe, PipeTransform } from '@angular/core';
import * as S from 'string'

@Pipe({
    name: 'decodeHTML'
})
export class DecodeHTMLPipe implements PipeTransform {
    transform(text: string) {
        if (text) {
            return text = S(text).stripTags().decodeHTMLEntities().s
        }
    }
}