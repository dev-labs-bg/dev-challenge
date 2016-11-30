import { Component, OnInit } from '@angular/core';
import {User} from '../../classes/user';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'xp-experience-block',
  templateUrl: `
    <div class='panel panel-primary'>
        <div class='panel-heading'>Experience</div>
        <div class="panel-body">
            <div class='progress'>
                <div
                    id='progress_bar'
                    class='progress-bar'
                    role='progressbar'
                    aria-valuenow='70'
                    aria-valuemin='0'
                    aria-valuemax='100'>
                    <span class='sr-only'>{{ loggedUser.experience }} / 500</span>
                </div>
            </div>
            <p style='text-align: right;'>{{ loggedUser.experience }} / 500</p>
            <p>You can track your progress here.</p>
            <p>You'd like some extra experience? Try filling out this form
                <a routerLink="/contributions">here</a>
            </p>
        </div>
    </div>
  `,
  styleUrls: []
})
export class ExperienceBlockComponent implements OnInit {
    private loggedUser: User;

    constructor(
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.loggedUser = this.authService.getLoggedUser();
        document.getElementById('progress_bar').style.width = this.getProgress() + '%';
    }

    getProgress() {
        return (this.loggedUser.experience / 500) * 100;
    }

}
