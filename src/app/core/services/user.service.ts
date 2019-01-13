import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

import {AngularFirestore} from '@angular/fire/firestore';

import {AuthService} from '@app/core/auth';
import {User} from '@app/core/models';

@Injectable({
    providedIn: 'root',
})
export class UserService {

    // Default user definition
    private readonly DEFAULT_USER: User;

    // The currently logged in user, if applicable
    private _currentUser: BehaviorSubject<User> = new BehaviorSubject(this.DEFAULT_USER);
    public readonly currentUser: Observable<User> = this._currentUser.asObservable();

    constructor(private authService: AuthService,
                private afs: AngularFirestore) {
        /*
            Subscribing to authenticated user, grabbing the uid,
            fetching details of that user, then setting current
            user to those details.
         */
        this.authService.authState.subscribe((auth) => {
            this.getUserById(auth.uid)
                .then((user) => {
                    this._currentUser.next(user);
                });
        });
    }

    /*
        Returns an observable of the user with the given UID,
        if they exist.
     */
    async getUserById(uid: string): Promise<User> {
        return null;
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

