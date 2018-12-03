import { Component } from '@angular/core';

import {LinkedIn, LinkedInLoginScopes} from '@ionic-native/linkedin/ngx';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: 'login.page.html',
    styleUrls: ['login.page.scss'],
})
export class LoginPage {

    isLoggedIn  = false;

    scopes: LinkedInLoginScopes[] = ['r_basicprofile'];

    constructor(private router: Router, private linkedin: LinkedIn) {}

    ionViewDidEnter() {
        this.linkedin.hasActiveSession().then((active) => {
            this.isLoggedIn = active;
        });
    }

    login() {
        this.linkedin.login(this.scopes, true)
            .then(() =>  this.isLoggedIn = true)
            .catch(e => console.log('Error logging in', e));
    }

    logout() {
        this.linkedin.logout();
        this.isLoggedIn = false;
    }

}
