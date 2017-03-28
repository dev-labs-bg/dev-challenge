import { Component, OnInit } from '@angular/core';
import {User} from '../../classes/user';
import {AuthService} from '../../core/auth.service';

@Component({
    selector: 'xp-experience-block',
    templateUrl: './experience-block.component.html',
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
