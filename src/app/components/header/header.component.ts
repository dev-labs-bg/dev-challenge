import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'xp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  title = 'Dev Challenge';

  constructor(
      private authService: AuthService
  ) { }

  ngOnInit() {
  }

  logout() {
      this.authService.logout();
  }

}
