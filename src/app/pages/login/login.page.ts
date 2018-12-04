import { Component } from '@angular/core';

import {AuthService} from '@app/core';

@Component({
    selector: 'app-login',
    templateUrl: 'login.page.html',
    styleUrls: ['login.page.scss'],
})
export class LoginPage {

    constructor(public authService: AuthService) {}

    login() {
        this.authService.login();
    }

    logout() {
        this.authService.logout();
    }

    isAuthenticated() {
        return this.authService.authenticated();
    }
}
