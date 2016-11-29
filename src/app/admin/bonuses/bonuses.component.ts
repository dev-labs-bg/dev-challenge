import { Component, OnInit } from '@angular/core';

import { User } from '../../classes/user';
import { UserService} from '../../shared/user.service';

@Component({
  selector: 'xp-bonuses',
  template: `
    <p>
      {{ userService.repository.getData() }}
    </p>
  `,
  styles: []
})
export class BonusesComponent implements OnInit {

    constructor(
        private userService: UserService
    ) { }

    ngOnInit() {
        this.userService.setup();
    }

}
