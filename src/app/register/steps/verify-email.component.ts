import { Component } from '@angular/core';

@Component({
    selector: 'xp-register-verify-email',
    template: `
        <alert type="success">
            <strong>Registration successful!</strong><br />
            Please go to your e-mail and activate your account to continue.
        </alert>
    `
})
export class VerifyEmailComponent {

    constructor() { }

}
