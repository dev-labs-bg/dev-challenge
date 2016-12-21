import {Component, OnInit, ViewContainerRef} from '@angular/core';

import { AuthService } from './core/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    private viewContainerRef: ViewContainerRef;

    public constructor(
        viewContainerRef: ViewContainerRef,
        private authService: AuthService,
    ) {
        // You need this small hack in order to catch application root view container ref
        this.viewContainerRef = viewContainerRef;
    }

    ngOnInit() {
        this.authService.init();
    }

}
