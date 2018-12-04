import {Injectable} from '@angular/core';
import {LinkedIn, LinkedInLoginScopes} from '@ionic-native/linkedin/ngx';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    scopes: LinkedInLoginScopes[] = ['r_basicprofile'];

    private isLoggedIn = false;

    constructor(private linkedin: LinkedIn) {
        this.linkedin.hasActiveSession().then((active) => {
            this.isLoggedIn = active;
        });
    }

    login() {
        this.linkedin.login(this.scopes, true)
            .then(() => this.isLoggedIn = true)
            .catch(e => console.log('Error logging in', e));
    }

    logout() {
        this.linkedin.logout();
        this.isLoggedIn = false;
    }

    authenticated() {
        return this.isLoggedIn;
    }
}
