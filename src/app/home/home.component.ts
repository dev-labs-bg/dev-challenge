import { Component, OnInit } from '@angular/core';

import { AuthService } from '../core/auth.service';

@Component({
    selector: 'xp-home',
    template: `
        <div class="jumbotron">
            <h1>Hello World!</h1>
            <p>
                Предизвикай себе си!
                <br />Инвестирай ~2 седмици и ни докажи, че си мотивиран
                да се развиваш, да учиш и да твориш, колкото сме и ние.</p>
            <p *ngIf="! authService.isLoggedIn()">
                <button routerLink="/register" class="btn btn-primary btn-lg">
                    Регистрирай се
                </button>
                <button routerLink="/login" class="btn btn-link btn-lg">
                    ... или влез
                </button>
            </p>
            <p *ngIf="authService.isLoggedIn()">
                <button routerLink="/dashboard" class="btn btn-primary btn-lg">
                    Към задачите!
                </button>
            </p>
        </div>

        <xp-rules></xp-rules>
    `,
    styles: []
})
export class HomeComponent implements OnInit {

    constructor(private authService: AuthService) { }

    ngOnInit() {
    }

}
