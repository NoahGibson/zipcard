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
        return this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
    }

    signUp(credentials: {email: string, password: string}) {
        return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);
    }

    logout() {
        this._authState.next(false);
    }

    authenticated() {
        return this._authState.value;
    }
}
