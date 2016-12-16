import { Component, OnInit } from '@angular/core';
import {User} from '../../classes/user';
import {AuthService} from '../../core/auth.service';

@Component({
    selector: 'xp-experience-block',
    templateUrl: `
        <div class="text-center">
            <h3 class="mb">
                {{ loggedUser.first_name }}'s Experience Points
            </h3>
            <progressbar value="{{ getProgress() }}"></progressbar>

            <p class="text-right">
                {{ loggedUser.experience }} / {{ maxPoints }} experience points
                <br />
                Apply for bonus experience <a routerLink="/contributions">here</a>
            </p>
        </div>
    `
})
export class ExperienceBlockComponent implements OnInit {
    private loggedUser: User;
    private maxPoints: number = 500;

    constructor(
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.loggedUser = this.authService.getLoggedUser();
    }

    getProgress() {
        return (this.loggedUser.experience / this.maxPoints) * 100;
    }

}
