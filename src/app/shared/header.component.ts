import { Component, OnInit } from '@angular/core';

import { AuthService } from '../core/auth.service';

@Component({
    selector: 'xp-header',
    template: `
        <nav class="navbar navbar-default">
            <div class="container">

                <div class="navbar-header">
                    <h1 class="no-margin">
                        <a class="navbar-brand" routerLink="/">
                            DevChallenge
                        </a>
                    </h1>

                    <button
                        type="button"
                        class="navbar-toggle collapsed"
                        (click)="toggleMobileNav()"
                        aria-expanded="false">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                </div>

                <div class="collapse navbar-collapse" [class.in]="showMobileNav">
                    <ul class="nav navbar-nav">
                        <li
                            *ngIf="authService.getLoggedUser()"
                            routerLinkActive="active">
                            <a routerLink="/dashboard">Dashboard</a>
                        </li>
                        <li
                            *ngIf="authService.getLoggedUser() &&
                            authService.getLoggedUser().isAdmin()"
                            routerLinkActive="active">
                            <a routerLink="/admin">Admin</a>
                        </li>
                        <li
                            *ngIf="!authService.isAuthenticated()"
                            routerLinkActive="active">
                            <a routerLink="/login">Login</a>
                        </li>
                        <li
                            *ngIf="!authService.isAuthenticated()"
                            routerLinkActive="active">
                            <a routerLink="/register">Register</a>
                        </li>
                    </ul>

                    <ul class="nav navbar-nav navbar-right">
                        <li *ngIf="authService.isAuthenticated()">
                            <a href="javascript:;" (click)="logout()">Logout</a>
                        </li>
                    </ul>
                </div>

            </div>
        </nav>
    `
})
export class HeaderComponent implements OnInit {
    private showMobileNav: boolean = false;

    constructor(
            private authService: AuthService
    ) { }

    ngOnInit() {
    }

    logout() {
        this.authService.logout();
    }

    toggleMobileNav() {
        this.showMobileNav = ! this.showMobileNav;
    }

}
