import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { AuthService } from '../core/auth.service';
import { UserService } from '../shared/user.service';
import { User } from '../classes/user';

import { NotificationService } from '../shared/notification.service';

@Component({
    selector: 'xp-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
    form: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private userService: UserService,
        private notificationService: NotificationService,
    ) { }

    ngOnInit() {
        let user = this.authService.getLoggedUser();

        this.form = this.formBuilder.group({
            'first_name': [user.first_name, Validators.required],
            'last_name': [user.last_name],
            'city': [user.attributes.city],
            'university': [user.attributes.university],
            'year_of_study': [user.attributes.year_of_study],
            'date_of_birth': [parseInt(user.attributes.date_of_birth.substr(0,4))]
        });
    }

    /**
     * Settings form submit
     *
     * @returns {Subscription}
     */
    handleSubmit() {
        return this.userService.editSettings(this.form.value).subscribe(
            response => {
                this.authService.setLoggedUser(User.newInstance(response.data));
                this.notificationService.fireSuccess('Settings saved!');
            }
        );
    }

}
