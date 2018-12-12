import {Injectable} from '@angular/core';
import {LinkedIn, LinkedInLoginScopes} from '@ionic-native/linkedin/ngx';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    // What information to request from LinkedIn
    private scopes: LinkedInLoginScopes[] = ['r_basicprofile'];

    // The current authentication state (logged in => true; logged out => false)
    authState: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor(private linkedin: LinkedIn) {
       this.checkActiveSession();
    }

    private checkActiveSession() {
        this.linkedin.hasActiveSession().then((active) => {
            this.authState.next(active);
        });
    }

    async login(): Promise<boolean> {
        try {
            await this.linkedin.login(this.scopes, true);
            this.authState.next(true);
            return true;
        } catch (e) {
            console.log('Error logging in', e);
            return false;
        }
    }

    logout() {
        this.linkedin.logout();
        this.authState.next(false);
    }

    authenticated() {
        return this.authState.value;
    }
}
