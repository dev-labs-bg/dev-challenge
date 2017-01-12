import { Component, OnInit } from '@angular/core';
import {User} from '../../classes/user';
import {AuthService} from '../../core/auth.service';

@Component({
    selector: 'xp-experience-block',
    templateUrl: `
        <div class="text-center">
            <h3 class="mb">
                {{ authService.getLoggedUser().first_name }}'s Experience Points
            </h3>
            <progressbar value="{{ getProgress() }}"></progressbar>

            <p class="text-right">
                {{ authService.getLoggedUser().experience }} / {{ maxPoints }} experience points
                <br />
                Apply for <a routerLink="/contributions">bonus experience points</a>.
            </p>
        </div>
    `
})
export class ExperienceBlockComponent implements OnInit {
    private maxPoints: number = 500;

    constructor(
        private authService: AuthService
    ) { }

    ngOnInit() {
        //
    }

    getProgress() {
        return (this.authService.getLoggedUser().experience / this.maxPoints) * 100;
    }

}
