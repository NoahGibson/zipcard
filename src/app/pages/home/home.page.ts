import {Component} from '@angular/core';

import {AuthService, UserService} from '@app/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

    constructor(public userService: UserService,
                private authService: AuthService) {}

    logout() {
        this.authService.logout();
    }

}
