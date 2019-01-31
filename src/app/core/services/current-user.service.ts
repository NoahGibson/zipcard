import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';

import {AngularFireAuth} from '@angular/fire/auth';

import {User, Credentials} from '@app/core/models';
import {UserService} from '@app/core/services/user.service';

/**
 * Service for accessing and updating the currently authenticated user.
 */
@Injectable({
    providedIn: 'root'
})
export class CurrentUserService {

    /**
     * BehaviorSubject for the currently logged in user.
     * @ignore
     */
    private _currentUser: BehaviorSubject<User> = new BehaviorSubject(null);

    /**
     * The currently logged in application {@link UserData}.
     */
    public readonly currentUser$: Observable<User> = this._currentUser.asObservable();

    /**
     * The UID of the current user
     * @ignore
     */
    private _currentUid: string = null;

    /**
     * The subscription to the current user
     * @ignore
      */
    private _userSubscription: Subscription;

    /**
     * @ignore
     */
    constructor(private afAuth: AngularFireAuth,
                private userService: UserService) {
        this.init();
    }

    /**
     * Initializes the authentication state.
     * @ignore
     */
    private init(): void {
        this.afAuth.authState.subscribe(async (auth) => {
            if (auth) {
                this._currentUid = auth.uid;
                const userObservable = await this.userService.getUser(this._currentUid);
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
     * Updates the email of the current user. Throws an error if there was an issue
     * updating the user's email.
     *
     * @param {Credentials} credentials The credentials of the current user
     * @param {string} newEmail The new email to use for the user
     * @returns A promise that evaluates after attempting to update the user's email
     */
    public async updateEmail(credentials: Credentials, newEmail: string): Promise<void> {
        try {
            // TODO - use reauthenticateWithCredential instead
            await this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
            await this.afAuth.auth.currentUser.updateEmail(newEmail);
        } catch (e) {
            throw new Error(e.message);
        }
    }

    /**
     * Updates the password of the current user. Throws an error if there was an issue
     * updating the user's password.
     *
     * @param {Credentials} credentials The credentials of the current user
     * @param {string} newPassword The new password to use for the user
     * @returns A promise that evaluates after attempting to update the user's password
     */
    public async updatePassword(credentials: Credentials, newPassword: string): Promise<void> {
        try {
            // TODO - use reauthenticateWithCredential instead
            await this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
            await this.afAuth.auth.currentUser.updatePassword(newPassword);
        } catch (e) {
            throw new Error(e.message);
        }
    }

    /**
     * Updates the full name of the current user. Throws an error if
     * there was an issue updating the user's name.
     *
     * @param {string} newName The new full name of the user
     * @returns A promise that evaluates after attempting to update the user's name
     */
    public async updateName(newName: string): Promise<void> {
        try {
            await this.afAuth.auth.currentUser.updateProfile({
                displayName: newName,
                photoURL: this.afAuth.auth.currentUser.photoURL
            });
        } catch (e) {
            throw new Error(e.message);
        }
    }

    public async updatePhoto(photo): Promise<void> {}

    public async updateResume(resume): Promise<void> {}

}
