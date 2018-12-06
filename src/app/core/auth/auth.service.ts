import {Injectable} from '@angular/core';
import {LinkedIn, LinkedInLoginScopes} from '@ionic-native/linkedin/ngx';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    scopes: LinkedInLoginScopes[] = ['r_basicprofile'];

    authState = new BehaviorSubject(false);

    constructor(private router: Router, private linkedin: LinkedIn) {
        this.linkedin.hasActiveSession().then((active) => {
            this.authState.next(active);
        });
    }

    login() {
        this.linkedin.login(this.scopes, true)
            .then(() => {
                this.authState.next(true);
            })
            .catch(e => console.log('Error logging in', e));
    }

    logout() {
        this.linkedin.logout();
        this.authState.next(false);
    }

    authenticated() {
        return this.authState.value;
    }
}
