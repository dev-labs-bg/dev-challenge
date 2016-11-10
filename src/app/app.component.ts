import { Component } from '@angular/core';
import {AuthService} from "./services/auth.service";
import {HttpService} from "./services/http.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor(
      private authService: AuthService,
      private httpService: HttpService,
    ) {
      this.init();
    }

    /**
     * Init application and change auth state
     * depending on if user is logged or not
     */
    init() {
        this.httpService.get('get-logged-user').subscribe(
            response => {
                if (response.success) {
                    this.authService.toggleAuthentication(true, response.user, response.loginToken);
                } else {
                    this.authService.toggleAuthentication(false);
                }
            }
        );
    }

}
