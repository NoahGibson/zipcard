import {Component} from '@angular/core';

import {AuthService, ResumeService, UserService} from '@app/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

    private currentUser;

    constructor(public authService: AuthService,
                private userService: UserService) {
        this.authService.currentUser$.subscribe((user) => {
            this.currentUser = user;
        });
    }

    deleteUser() {
        this.userService.deleteUser(this.currentUser.uid);
    }

}
