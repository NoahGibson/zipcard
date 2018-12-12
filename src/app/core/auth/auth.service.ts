import {Injectable} from '@angular/core';
import {LinkedIn, LinkedInLoginScopes} from '@ionic-native/linkedin/ngx';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    // What information to request from LinkedIn
    private scopes: LinkedInLoginScopes[] = ['r_basicprofile'];

    // The current authentication state (logged in => true; logged out => false)
    private _authState: BehaviorSubject<boolean> = new BehaviorSubject(false);
    public readonly authState: Observable<boolean> = this._authState.asObservable();

    constructor(private linkedin: LinkedIn) {
       this.checkActiveSession();
    }

    private checkActiveSession() {
        this.linkedin.hasActiveSession().then((active) => {
            this._authState.next(active);
        });
    }

    async login(): Promise<boolean> {
        try {
            await this.linkedin.login(this.scopes, true);
            this._authState.next(true);
            return true;
        } catch (e) {
            console.log('Error logging in', e);
            return false;
        }
    }

    logout() {
        this.linkedin.logout();
        this._authState.next(false);
    }

    authenticated() {
        return this._authState.value;
    }
}
