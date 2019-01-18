import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';

import {AngularFireAuth} from '@angular/fire/auth';
import {User as fbUser} from 'firebase';

import {UserService} from '@app/core/services/user.service';
import {User} from '@app/core/models';

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
    private _currentUser: BehaviorSubject<User> = new BehaviorSubject(null);

    /**
     * The currently logged in application {@link User}.
     */
    public readonly currentUser$: Observable<User> = this._currentUser.asObservable();

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
                private userService: UserService) {
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
                const userObservable = await this.userService.getUserById(this._currentUid);
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
     * @param userAttributes An object containing the first name, last name, email,
     *      photo url, and resume url of a user
     * @returns A promise containing an error message, if any
     */
    public async signUpWithEmail(credentials: {email: string, password: string},
                          userAttributes: {
                                firstName: string,
                                lastName: string,
                                email: string,
                                photoUrl: string,
                                resumeUrl: string}): Promise<string> {
        try {
            await this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);
            const newUser: User = {
                uid: this._currentUid,
                firstName: userAttributes.firstName,
                lastName: userAttributes.lastName,
                email: userAttributes.email,
                photoUrl: userAttributes.photoUrl,
                resumeUrl: userAttributes.resumeUrl
            };
            // TODO - handle createUser error
            await this.userService.createUser(newUser);
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
     * Permanently deletes the current user's account and data.
     *
     * @returns A promise containing an error message, if any
     */
    public async deleteAccount(): Promise<string> {
        try {
            await this.afAuth.auth.currentUser.delete();
            await this.userService.deleteUser(this._currentUid);
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
