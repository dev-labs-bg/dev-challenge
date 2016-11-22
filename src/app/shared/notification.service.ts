/**
 * Use the Toasty Angular 2 plugin for displaying alerts and messages.
 * https://github.com/akserg/ng2-toasty
 *
 * Without knowing how to encapsulate as much logic as possible,
 * there are a few places the plugin-logic is present:
 *
 *  1. Imported plugin styles in angular-cli.json
 *  2. Added <ng2-toasty></ng2-toasty> tag in the `app.component.html`
 *  3. Imported ToastyModule.forRoot() in the `app.module.ts`
 */
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
