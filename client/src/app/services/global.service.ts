import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GlobalService {
    public urlassets = '../../../';
    public urladmin = './';
    public url = 'http://127.0.0.1:3000/api/';
    public image = '';
    public userId = '';
    public editando = false;
    public title = '';
    public showLoading: boolean = false;
    public titlemodal: string = '';
    public languageId: string = '';

    constructor() {
    }
}
