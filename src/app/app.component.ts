import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './loginmanager/services';
import { User } from './loginmanager/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Proyecto XML';
  currentUser: User;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }


}
