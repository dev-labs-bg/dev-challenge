/**
 * Show loading (busy) indicators on any promise,
 * or on any Observable's subscription, see:
 * https://github.com/devyumao/angular2-busy
 *
 * Pass your promise or subscription in the [wait] input param.
 *
 * For more options, check out plugin's directive syntax and options:
 * https://github.com/devyumao/angular2-busy#directive-syntax
 *
 * There is one more place where the plugin-logic is present:
 * 1. Imported BusyModule in the `app.module.ts`
 */
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

@Component({
    selector: 'xp-loading-indicator',
    template: `
        <div style="position: relative;">
            <div [ngBusy]="{ busy: wait, message: 'Loading...' }">
                <ng-content></ng-content>
            </div>
        </div>
    `,
    styleUrls: ['../../../node_modules/angular2-busy/build/style/busy.css'],
    // Because we need global CSS support on the top level component
    encapsulation: ViewEncapsulation.None
})
export class LoadingIndicatorComponent {
    @Input() wait: Subscription | Promise<any>;

    constructor() { }

}
