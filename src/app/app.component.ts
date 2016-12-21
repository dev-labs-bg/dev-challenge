import {Component, OnInit, ViewContainerRef} from '@angular/core';

import { AuthService } from './core/auth.service';

@Component({
    selector: 'app-root',
    template: `
        <xp-loading-indicator [wait]="promise">
            <xp-header></xp-header>

            <div class="container padding-top-bottom">
                <router-outlet></router-outlet>

                <xp-footer></xp-footer>
            </div>

            <ng2-toasty [position]="'top-center'"></ng2-toasty>
        </xp-loading-indicator>
    `
})
export class AppComponent implements OnInit {
    private viewContainerRef: ViewContainerRef;
    private promise: Promise<boolean>;

    public constructor(
        viewContainerRef: ViewContainerRef,
        private authService: AuthService,
    ) {
        // You need this small hack in order to catch application root view container ref
        this.viewContainerRef = viewContainerRef;
    }

    ngOnInit() {
        this.promise = this.authService.init();
    }

}
