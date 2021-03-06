import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';

import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireStorage} from '@angular/fire/storage';

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
     * The currently logged in application {@link User}.
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
     * The path to the users collection in Firebase database.
     * @ignore
     */
    private readonly USERS_COLLECTION = 'users';

    /**
     * @ignore
     */
    constructor(private afAuth: AngularFireAuth,
                private database: AngularFirestore,
                private storage: AngularFireStorage,
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
                    if (!user.photoUrl) {
                        user.photoUrl = 'assets/images/default_profile_photo.png';
                    }
                    this._currentUser.next(user);
                });
            } else {
                this._currentUser.next(null);
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
            const userDoc = await this.database.doc<User>(this.USERS_COLLECTION + '/' + this._currentUid);
            await this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
            const authPromise = this.afAuth.auth.currentUser.updateEmail(newEmail);
            const databasePromise = userDoc.update({email: newEmail});
            await authPromise;
            await databasePromise;
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
            const userDoc = await this.database.doc<User>(this.USERS_COLLECTION + '/' + this._currentUid);
            await userDoc.update({fullName: newName});
        } catch (e) {
            throw new Error(e.message);
        }
    }

    /**
     * Updates the user's photo to the given photo in storage. Throws an error if
     * there was an issue updating the user's photo.
     *
     * @param {Uint8Array} photo The byte data for the user's new photo
     * @returns A promise that evaluates after attempting to update the user's photo
     */
    public async updatePhoto(photo: Uint8Array): Promise<void> {
        try {
            const storageRef = await this.storage.ref('users/' + this._currentUid + '/photo/profile_photo.jpeg');
            await storageRef.put(photo, {contentType: 'image/jpeg'});
        } catch (e) {
            throw new Error(e.message);
        }
    }

    /**
     * Updates the user's resume to the given resume in storage. Throws an error
     * if there was an issue updating the user's resume.
     *
     * @param {Uint8Array} resume The byte data for the user's new resume
     * @returns A promise that evaluates after attempting to update the user's resume
     */
    public async updateResume(resume: Uint8Array): Promise<void> {
        try {
            const storageRef = await this.storage.ref('users/' + this._currentUid + '/resume/resume.pdf');
            await storageRef.put(resume, {contentType: 'application/pdf'});
        } catch (e) {
            throw new Error(e.message);
        }
    }

}
