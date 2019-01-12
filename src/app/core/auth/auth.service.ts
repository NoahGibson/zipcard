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

    /*
        Checks if there is already an active session.
     */
    private checkActiveSession() {
        // TODO - check for active session
        this._authState.next(false);
    }

    /*
        Signs the user in via email and password.
        Returns a string containing an error message, if any, if there was an issue signing in.
     */
    async signInWithEmail(credentials: {email: string, password: string}): Promise<string> {
        try {
            await this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
            this._authState.next(true);
        } catch (e) {
            return e.message;
        }
    }

    /*
        Signs up the user via email and password, then signs in the user.
        Returns a string containing an error message, if any, if there was an issue signing up.
     */
    async signUpWithEmail(credentials: {email: string, password: string}): Promise<string> {
        try {
            await this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);
            // TODO - add new user
            this._authState.next(true);
        } catch (e) {
            return e.message;
        }
    }

    /*
        Logs the current user out, a.k.a. de-authenticates the current session.
     */
    async logout(): Promise<string> {
        try {
            await this.afAuth.auth.signOut();
            this._authState.next(false);
        } catch (e) {
            return e.message;
        }
    }

    /*
        Returns whether or not the current user is authenticated.
     */
    authenticated(): boolean {
        return this._authState.value;
    }
}
