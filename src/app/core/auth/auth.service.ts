import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';

import {AngularFireAuth} from '@angular/fire/auth';
import {User as fbUser} from 'firebase';

import {UserService} from '@app/core/services/user.service';
import {User} from '@app/core/models';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    // The current authentication state
    /*
        NOTE: Google's API's automatically manage user sessions; the default
        behavior is for sessions to persist indefinitely.
     */
    public readonly authState$: Observable<fbUser> = this.afAuth.authState;

    // The currently logged in user, if applicable
    private _currentUser: BehaviorSubject<User> = new BehaviorSubject(null);
    public readonly currentUser$: Observable<User> = this._currentUser.asObservable();

    // The subscription to the current user
    private _userSubscription: Subscription;

    // The UID of the current user
    private _currentUid: string = null;

    constructor(private afAuth: AngularFireAuth,
                private userService: UserService) {
        this.init();
    }

    /*
        Initializes the authentication state and the current user
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
    async signUpWithEmail(credentials: {email: string, password: string},
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
        return this._currentUid !== null;
    }
}
