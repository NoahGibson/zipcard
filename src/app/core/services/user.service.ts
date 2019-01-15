import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';

import {AngularFirestore} from '@angular/fire/firestore';

import {AuthService} from '@app/core/auth';
import {User} from '@app/core/models';

@Injectable({
    providedIn: 'root',
})
export class UserService {

    // The subscription to the current user
    private curUserSub: Subscription;

    // The currently logged in user, if applicable
    private _currentUser: BehaviorSubject<User> = new BehaviorSubject(null);
    public readonly currentUser: Observable<User> = this._currentUser.asObservable();

    constructor(private authService: AuthService,
                private afs: AngularFirestore) {
        this.init();
    }

    /*
        Initialize necessary subscriptions to authentication service and to current user.
     */
    private init(): void {
        this.authService.authState.subscribe(async (auth) => {
            if (auth) {
                // If authenticated, get the current user and subscribe to value
                const curUserObs = await this.getUserById(auth.uid);
                this.curUserSub = curUserObs.subscribe((user) => {
                        this._currentUser.next(user);
                    });
            } else {
                // Else unsubscribe from current user if subscription exists
                if (this.curUserSub) {
                    this.curUserSub.unsubscribe();
                }
            }
        });
    }

    /*
        Returns an observable of the user with the given UID,
        if they exist.
     */
    async getUserById(uid: string): Promise<Observable<User>> {
        try {
            const userDoc = await this.afs.doc<User>(`users/${uid}`);
            return userDoc.valueChanges();
        } catch (e) {
            // TODO - don't log error to console
            console.log(e);
        }
    }

    /*
        Creates a new user from the currently logged in user
        using the given attributes.
        Returns an error message, if any.
     */
    async createCurrentUser(firstName: string,
                            lastName: string,
                            photoUrl: string,
                            resumeUrl: string): Promise<string> {
        return null;
    }

    /*
        Updates the current user with the provided new attributes.
        If an attribute is not specified, it will remain the same.
        Returns an error message, if any.
     */
    async updateCurrentUser(firstName: string = this._currentUser.value.firstName,
                            lastName: string = this._currentUser.value.lastName,
                            email: string = this._currentUser.value.email,
                            photoUrl: string = this._currentUser.value.photoUrl,
                            resumeUrl: string = this._currentUser.value.resumeUrl): Promise<string> {
        return null;
    }

    /*
        Permanently deletes the current user.
        Returns an error message, if any.
     */
    async deleteCurrentUser(): Promise<string> {
        return null;
    }

}

