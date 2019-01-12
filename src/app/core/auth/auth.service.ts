import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    // The current authentication state (logged in => true; logged out => false)
    private _authState: BehaviorSubject<boolean> = new BehaviorSubject(false);
    public readonly authState: Observable<boolean> = this._authState.asObservable();

    constructor(private afAuth: AngularFireAuth) {
       this.checkActiveSession();
    }

    private checkActiveSession() {
        this._authState.next(false);
    }

    signInWithEmail(credentials: {email: string, password: string}) {
        // try {
        //     await this.linkedin.login(this.scopes, true);
        //     this._authState.next(true);
        //     return true;
        // } catch (e) {
        //     console.log('Error logging in', e);
        //     return false;
        // }
        // this._authState.next(true);
        // return true;
        return this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
    }

    logout() {
        // this.linkedin.logout();
        this._authState.next(false);
    }

    authenticated() {
        return this._authState.value;
    }
}
