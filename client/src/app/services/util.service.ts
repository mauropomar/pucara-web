import {Injectable} from '@angular/core';

declare var $: any;

@Injectable({
    providedIn: 'root'
})
export class UtilService {

    constructor() {
    }

    showNotification(icon, type, message) {
      //  const type = ['', 'info', 'success', 'warning', 'danger'];
   //     var color = Math.floor((Math.random() * 4) + 1);
        $.notify({
            icon: icon,
            message: message
        }, {
            type: type,
            timer: 1000,
            placement: {
                from: 'top',
                align: 'right'
            }
        });
    }
}
