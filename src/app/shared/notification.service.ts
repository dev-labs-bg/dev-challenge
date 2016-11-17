import { Injectable } from '@angular/core';

import { ToastyService, ToastyConfig, ToastOptions } from 'ng2-toasty';

@Injectable()
export class NotificationService {

    constructor(
        private toastyService:  ToastyService,
        private toastyConfig: ToastyConfig
    ) {
        this.toastyConfig.theme = 'bootstrap';
    }

    fireSuccess(msg: string, title: string = 'Success!') {
        const toastOptions: ToastOptions = {
            title,
            msg,
            showClose: true,
            timeout: 5000
        };

        this.toastyService.success(toastOptions);
    }

    fireError(msg: string, title: string = 'Error!') {
        const toastOptions: ToastOptions = {
            title,
            msg,
            showClose: true,
            timeout: null
        };

        this.toastyService.error(toastOptions);
    }

}
