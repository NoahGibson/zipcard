import { Component } from '@angular/core';

import {AuthService} from '@app/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: 'login.page.html',
    styleUrls: ['login.page.scss'],
})
export class LoginPage {

    readonly HOME_URL = '/home';
    readonly LOGIN_URL = '/login';

    constructor(private router: Router, private authService: AuthService) {}

    ionViewWillEnter() {
        if (this.authService.authenticated()) {
            this.router.navigate([this.HOME_URL]);
        }
    }

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
