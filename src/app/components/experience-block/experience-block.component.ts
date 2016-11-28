import { Component, OnInit } from '@angular/core';
import {User} from '../../classes/user';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'xp-experience-block',
  templateUrl: `
    <div class="panel panel-primary">
        <div class="panel-heading">Experience</div>
        <div class="panel-body">
            <p>{{ loggedUser.experience }} / 450</p>
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
    }

}
