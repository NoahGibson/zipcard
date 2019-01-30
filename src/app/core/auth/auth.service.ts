import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';

import {AngularFireAuth} from '@angular/fire/auth';
import {User as fbUser} from 'firebase';

import {UserDataService} from '@app/core/services/user-data.service';
import {UserData} from '@app/core/models';

/**
 * Application authentication service, used for purposes such as signing in and out of the
 * application, signing up a user, deleting a user's account, and accessing
 * the currently logged in user.
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
     * BehaviorSubject for the currently logged in user.
     * @ignore
     */
    private _currentUser: BehaviorSubject<UserData> = new BehaviorSubject(null);

    /**
     * The currently logged in application {@link UserData}.
     */
    public readonly currentUser$: Observable<UserData> = this._currentUser.asObservable();

    /**
     * The subscription to the current user
     * @ignore
      */
    private _userSubscription: Subscription;

    /**
     * The UID of the current user
     * @ignore
     */
    private _currentUid: string = null;

    /**
     * @ignore
     */
    constructor(private afAuth: AngularFireAuth,
                private userService: UserDataService) {
        this.init();
    }

    /**
     * Initializes the authentication state and the current user.
     * @ignore
     */
    private init(): void {
        this.authState$.subscribe(async (auth) => {
            if (auth) {
                this._currentUid = auth.uid;
                const userObservable = await this.userService.getUserData(this._currentUid);
                this._userSubscription = userObservable.subscribe((user) => {
                    this._currentUser.next(user);
                });
            } else {
                this._currentUid = null;
                if (this._userSubscription) {
                    this._userSubscription.unsubscribe();
                }
            }
        });
    }

    /**
     * Signs the user in via email and password.
     * Returns a string containing an error message, if any, if there was an issue signing in.
     *
     * @param credentials An object containing the email and password of a user
     * @returns A promise containing an error message, if any
     */
    public async signInWithEmail(credentials: {email: string, password: string}): Promise<string> {
        try {
            await this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
        } catch (e) {
            return e.message;
        }
    }

    /**
     * Signs up a user via email and password, then signs in the user.
     *
     * @param credentials An object containing the email and password of a user
     * @param userAttributes An object containing the first name and last name of a user
     * @returns A promise containing an error message, if any
     */
    public async signUpWithEmail(credentials: {email: string, password: string},
                                 userAttributes: {
                                        firstName: string,
                                        lastName: string}): Promise<string> {
        try {
            await this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);
            const newUser: UserData = {
                uid: this._currentUid,
                firstName: userAttributes.firstName,
                lastName: userAttributes.lastName
            };
            // TODO - handle createUserData error
            await this.userService.createUserData(newUser);
        } catch (e) {
            return e.message;
        }
    }

    /**
     * Signs the current user out of the application.
     *
     * @returns A promise containing an error message, if any
     */
    public async signOut(): Promise<string> {
        try {
            await this.afAuth.auth.signOut();
        } catch (e) {
            return e.message;
        }
    }

    /**
     * Updates the first and last name of the current user.
     *
     * @param {string} firstName The first name of the user
     * @param {string} lastName The last name of the user
     * @returns A promise containing an error message, if any
     */
    public async updateName(firstName: string, lastName: string): Promise<string> {
        try {
            await this.userService.updateUserData(this._currentUid, {firstName: firstName, lastName: lastName});
        } catch (e) {
            return e.message;
        }
    }

    /**
     * Updates the email of an authenticated user.
     *
     * @param {string} newEmail The new email of the user
     * @returns A promise containing an error message, if any
     */
    public async updateEmail(newEmail: string): Promise<string> {
        try {
            await this.afAuth.auth.currentUser.updateEmail(newEmail);
        } catch (e) {
            return e.message;
        }
    }

    /**
     * Updates the password of a user.
     *
     * @param {string} newPassword The new password of the user
     * @returns A promise containing an error message, if any
     */
    public async updatePassword(newPassword: string): Promise<string> {
        try {
            await this.afAuth.auth.currentUser.updatePassword(newPassword);
        } catch (e) {
            return e.message;
        }
    }

    /**
     * Permanently deletes the current user's account and data.
     *
     * @returns A promise containing an error message, if any
     */
    public async deleteAccount(): Promise<string> {
        try {
            await this.userService.deleteUserData(this._currentUid);
            await this.afAuth.auth.currentUser.delete();
        } catch (e) {
            return e.message;
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
