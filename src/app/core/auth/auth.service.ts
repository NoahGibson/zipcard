import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    // What information to request from LinkedIn
    // private scopes: LinkedInLoginScopes[] = ['r_basicprofile'];

    // The current authentication state (logged in => true; logged out => false)
    private _authState: BehaviorSubject<boolean> = new BehaviorSubject(false);
    public readonly authState: Observable<boolean> = this._authState.asObservable();

    constructor() {
       this.checkActiveSession();
    }

    private checkActiveSession() {
        // this.linkedin.hasActiveSession().then((active) => {
        //     this._authState.next(active);
        // });
        this._authState.next(false);
    }

    async login(): Promise<boolean> {
        // try {
        //     await this.linkedin.login(this.scopes, true);
        //     this._authState.next(true);
        //     return true;
        // } catch (e) {
        //     console.log('Error logging in', e);
        //     return false;
        // }
        this._authState.next(true);
        return true;
    }

    logout() {
        // this.linkedin.logout();
        this._authState.next(false);
    }

    authenticated() {
        return this._authState.value;
    }
}
