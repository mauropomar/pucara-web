import {Pipe, PipeTransform} from '@angular/core';
import {GlobalService} from "../services/global.service";

@Pipe({
    name: 'noimageuser'
})
export class NoimageuserPipe implements PipeTransform {

    constructor(private global: GlobalService) {
    }

    transform(value: string): string {
        if (value == null || value.indexOf('empty') > -1 || value.indexOf('null') > -1 || value.indexOf('undefined') > -1) {
            return this.global.urlassets + 'assets/img/noimage.png'
        }
        return value;
    }

}
