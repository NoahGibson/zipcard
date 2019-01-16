import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {AngularFirestore} from '@angular/fire/firestore';

import {User} from '@app/core/models';

@Injectable({
    providedIn: 'root',
})
export class UserService {

    // The path to the users location in Firebase
    private readonly USERS_LOC = 'users';

    constructor(private afs: AngularFirestore) {}

    /*
        Returns an observable of the user with the given UID,
        if they exist.
     */
    async getUserById(uid: string): Promise<Observable<User>> {
        // TODO - somehow return an error message if one exists
        try {
            const userDoc = await this.afs.doc<User>(this.USERS_LOC + '/' + uid);
            return userDoc.valueChanges();
        } catch (e) {
            // TODO - don't log error to console
            console.log(e);
        }
    }

    /*
        Creates a new user from the given User.
        Returns true if user creation is successful, false otherwise.
        UID, first name, last name, and email are all required to be set
        on the given user; photo url and resume url are optional.
     */
    async createUser(newUser: User): Promise<boolean> {
        if (!newUser.uid || !newUser.firstName || !newUser.lastName || !newUser.email) {
            // TODO - handle error
            console.log('Missing required user attributes');
            return false;
        }
        // TODO - check to make sure current user doesn't already exist
        try {
            const userDoc = await this.afs.doc<User>(this.USERS_LOC + '/' + newUser.uid);
            await userDoc.set(newUser);
            return true;
        } catch (e) {
            // TODO - handle error
            console.log(e);
            return false;
        }
    }

    /*
        Updates the user with the given UID with the provided new attributes.
        If an attribute is not specified, it will remain the same.
        An authenticated user can only update their own information.
        Returns true if user update is successful, false otherwise.
     */
    async updateUser(uid: string,
                     firstName: string = null,
                     lastName: string = null,
                     email: string = null,
                     photoUrl: string = null,
                     resumeUrl: string = null): Promise<boolean> {
        return null;
    }

    /*
        Permanently deletes the user with the given UID.
        Returns true if user deletion is successful, false otherwise.
     */
    async deleteUser(uid: string): Promise<boolean> {
        return null;
    }

}

