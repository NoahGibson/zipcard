import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {User as fbUser} from 'firebase';

import {Credentials, User} from '@app/core/models';

/**
 * Application authentication service, used for purposes such as signing in and out of the
 * application and signing up a user.
 */
@Injectable({
    providedIn: 'root',
})
export class AuthService {

    /*
        NOTE: Google's API's automatically manage user sessions; the default
        behavior is for sessions to persist indefinitely.
     */
    /**
     * The current authentication state of the application, containing the
     * currently authenticated [Firebase user]{@link https://firebase.google.com/docs/reference/js/firebase.User}.
     */
    public readonly authState$: Observable<fbUser> = this.afAuth.authState;

    /**
     * The UID of the current user
     * @ignore
     */
    private _currentUid: string = null;

    /**
     * The path to the users collection in Firebase database.
     * @ignore
     */
    private readonly USERS_COLLECTION = 'users';

    /**
     * @ignore
     */
    constructor(private afAuth: AngularFireAuth,
                private database: AngularFirestore) {
        this.init();
    }

    /**
     * Initializes the authentication state.
     * @ignore
     */
    private init(): void {
        this.authState$.subscribe(async (auth) => {
            if (auth) {
                this._currentUid = auth.uid;
            } else {
                this._currentUid = null;
            }
        });
    }

    /**
     * Signs the user in via email and password. Throws an error if
     * there was an issue signing the user in.
     *
     * @param credentials An object containing the email and password of a user
     * @returns A promise that evaluates after attempting to sign in the user
     */
    public async signInWithEmail(credentials: Credentials): Promise<void> {
        try {
            await this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
        } catch (e) {
            throw new Error(e.message);
        }
    }

    /**
     * Signs up a user via email and password, then signs in the user. Throws an error if
     * there was an issue creating the user's account.
     *
     * @param credentials An object containing the email and password of a user
     * @param fullName The full name of the user
     * @returns A promise that evaluates after attempting to sign up the new user
     */
    public async signUpWithEmail(credentials: Credentials, fullName: string): Promise<void> {
        try {
            await this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);
            const userDoc = await this.database.doc<User>(this.USERS_COLLECTION + '/' + this._currentUid);
            const newUser: User = {
                uid: this._currentUid,
                fullName: fullName,
                email: credentials.email,
                photoUrl: null,
                resumeUrl: null
            };
            await userDoc.set(newUser);
        } catch (e) {
            throw new Error(e.message);
        }
    }

    /**
     * Signs the current user out of the application. Throws an error if
     * there was an issue signing the user out.
     *
     * @returns A promise that evaluates after attempting to sign out the user
     */
    public async signOut(): Promise<void> {
        try {
            await this.afAuth.auth.signOut();
        } catch (e) {
            throw new Error(e.message);
        }
    }

    /**
     * Permanently deletes the current user's account and data. Throws an error if
     * there was an issue deleting the user's account
     *
     * @returns A promise that evaluates after attempting to delete the user's account
     */
    public async deleteAccount(credentials: Credentials): Promise<void> {
        try {
            await this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
            await this.afAuth.auth.currentUser.delete();
        } catch (e) {
            throw new Error(e.message);
        }
    }

    /**
     * Returns whether or not the current user is authenticated.
     *
     * @returns True if a user is currently authenticated; false otherwise
     */
    public authenticated(): boolean {
        return this._currentUid !== null;
    }

}
