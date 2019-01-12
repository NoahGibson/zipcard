import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {AngularFireAuth} from '@angular/fire/auth';
import {User} from 'firebase';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    // The current authentication state, containing the logged in user if applicable
    public readonly authState: Observable<User>;

    // The current authenticated user
    private isAuthenticated: boolean;

    constructor(private afAuth: AngularFireAuth) {
        this.authState = this.afAuth.authState;
        afAuth.authState.subscribe((user) => {
            this.isAuthenticated = user !== null;
        });
    }

    /*
        Signs the user in via email and password.
        Returns a string containing an error message, if any, if there was an issue signing in.
     */
    async signInWithEmail(credentials: {email: string, password: string}): Promise<string> {
        try {
            await this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
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
        } catch (e) {
            return e.message;
        }
    }

    /*
        Returns whether or not the current user is authenticated.
     */
    authenticated(): boolean {
        return this.isAuthenticated;
    }
}
