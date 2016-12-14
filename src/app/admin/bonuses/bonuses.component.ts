import {Component, OnInit} from '@angular/core';

import {ContributorsService} from '../../contributions/contributors.service';

@Component({
  selector: 'xp-bonuses',
  template: `
    <h1>Submitted contributions</h1>
    <div *ngFor="let user of contributorsService.repository.getData();"
        class="panel panel-primary">
        <div class="panel-heading">{{ user.getName() }}</div>
        <div class="panel-body">
            <div *ngIf="user.attributes.stack_overflow_account">
                <h4>Stack overflow account:</h4>
                <p>
                    <a href="{{ user.attributes.stack_overflow_account }}" target="_blank">
                        Click here to view
                    </a>
                </p>
                <xp-bonus-form
                    bonusType="stack_overflow_account"
                    [user]="user">
                </xp-bonus-form>
            </div>
            <div *ngIf="user.attributes.public_activity">
                <h4>Public activity</h4>
                <pre class="line-break-pre">{{ user.attributes.public_activity }}</pre>
                <xp-bonus-form
                    bonusType="public_activity"
                    [user]="user">
                </xp-bonus-form>
            </div>
            <div *ngIf="user.attributes.side_project">
                <h4>Side project</h4>
                <pre class="line-break-pre">{{ user.attributes.side_project }}</pre>
                <xp-bonus-form
                    bonusType="side_project"
                    [user]="user">
                </xp-bonus-form>
            </div>
            <div *ngIf="user.attributes.open_source_contributions">
                <h4>Open Source Contributions</h4>
                <pre class="line-break-pre">{{ user.attributes.open_source_contributions }}</pre>
                <xp-bonus-form
                    bonusType="open_source_contributions"
                    [user]="user">
                </xp-bonus-form>
            </div>
        </div>
    </div>
  `,
  styles: []
})
export class BonusesComponent implements OnInit {

    constructor(
        private contributorsService: ContributorsService,
    ) { }

    ngOnInit() {
        this.contributorsService.setup();
    }
}
