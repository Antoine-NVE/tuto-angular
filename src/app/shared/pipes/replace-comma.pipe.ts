import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'replaceComma',
    standalone: true,
})
export class ReplaceComma implements PipeTransform {
    transform(value: string | null): string {
        if (!!value) {
            return value.replace(',', '.');
        } else {
            return '';
        }
    }
}
