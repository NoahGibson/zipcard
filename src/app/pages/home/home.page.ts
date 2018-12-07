import { Component } from '@angular/core';
import {AuthService, UserService} from '@app/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router, private userService: UserService, private authService: AuthService) {}

  logout() {
      this.authService.logout();
  }

  settings() {
    this.router.navigate(['settings']);
  }

  getFirstName() {
    return this.userService.getUser().firstName;
  }

}
