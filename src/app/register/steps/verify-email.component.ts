import { Component, Input } from '@angular/core';

@Component({
    selector: 'xp-register-verify-email',
    template: `
        <alert type="success">
            <p><strong>Registration successful!</strong></p>
            <p>Please go to your e-mail and activate your account to continue.</p>
            <p *ngIf="isPopularEmailProvider()">
                <a
                    class="btn btn-primary"
                    href="http://{{ domains[domains.indexOf(provider)] }}"
                    target="_blank">
                    Open {{ domains[domains.indexOf(provider)] }}
                </a>
            </p>
        </alert>
    `
})
export class VerifyEmailComponent {
    @Input() email: string;
    provider: string;
    domains: any = ['yahoo.com', 'gmail.com', 'google.com', 'hotmail.com', 'me.com', 'aol.com', 'mac.com', 'live.com', 'comcast.com', 'googlemail.com', 'msn.com', 'hotmail.co.uk', 'yahoo.co.uk', 'facebook.com', 'verizon.net', 'att.net', 'gmz.com', 'mail.com', 'abv.bg'];

    constructor() { }

    /**
     * Check if email is a popular one
     *
     * @returns bool
     */
    isPopularEmailProvider() {
        this.provider = this.email.substr(this.email.indexOf('@') + 1, this.email.length);

        return (this.domains.indexOf(this.provider) !== -1);
    }
}
