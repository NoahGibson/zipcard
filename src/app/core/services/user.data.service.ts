import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {AngularFirestore} from '@angular/fire/firestore';

import {User} from '@app/core/models';

/**
 * Service providing various methods for accessing and manipulating user data.
 *
 * Note: this service only interacts with user information stored within the database;
 * any methods within this service do not touch the authentication credentials of
 * a user, nor does it affect the files stored on the server associated with the
 * user. Manipulating these other aspects should be handled via their respective
 * services.
 */
@Injectable({
    providedIn: 'root',
})
export class UserDataService {

    /**
     * The path to the users location in Firebase database.
     * @ignore
     */
    private readonly USERS_LOC = 'users';

    /**
     * @ignore
     */
    constructor(private afs: AngularFirestore) {}

    /**
     * Retrieves a {@link User} from the database with the given UID,
     * if they exist.
     *
     * @param {string} uid The UID of the user to retrieve the data of
     * @returns An observable of the user's data
     */
    public async getUserDataByID(uid: string): Promise<Observable<User>> {
        // TODO - somehow return an error message if one exists
        try {
            const userDoc = await this.afs.doc<User>(this.USERS_LOC + '/' + uid);
            return userDoc.valueChanges();
        } catch (e) {
            // TODO - don't log error to console
            console.log(e);
        }
    }

    /**
     * Creates a new user in the database from the given {@link User}. The
     * UID, first name, last name, and email properties of the given user must
     * be set; photo url and resume url are optional.
     *
     * @param {User} newUser The user to add to the database
     * @returns A promise containing true if the user was successfully added;
     *      false otherwise
     */
    public async createUserData(newUser: User): Promise<boolean> {
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

    /**
     * Updates the {@link User} with the given UID with the provided new attributes.
     * If an attribute is not specified, it will remain the same. First name,
     * last name, and email must not be empty if they are provided. The UID of a
     * user cannot be changed.
     *
     * Note: an authenticated user can only update their own information.
     *
     * Note: in order to update a user's email, call AuthService.updateEmail instead.
     *
     * Note: in order to update a user's password, call AuthService.updatePassword.
     *
     * @param {string} uid The UID of the user to update
     * @param {Partial<User>} update The new attributes of the user
     * @returns A promise containing true if the user was successfully updated;
     *      false otherwise
     */
    public async updateUserData(uid: string, update: Partial<User>): Promise<boolean> {
        if (update.uid) {
            // TODO - handle error
            console.log('Cannot update the UID of a user.');
            return false;
        }
        if (update.email && update.email.length === 0) {
            // TODO - handle error
            console.log('Email must be non empty.');
            return false;
        }
        if (update.firstName && update.firstName.length === 0) {
            // TODO - handle error
            console.log('First name must be non empty.');
            return false;
        }
        if (update.lastName && update.lastName.length === 0) {
            // TODO - handle error
            console.log('Last name must be non empty.');
            return false;
        }
        try {
            const userDoc = await this.afs.doc<User>(this.USERS_LOC + '/' + uid);
            await userDoc.update(update);
            return true;
        } catch (e) {
            // TODO - handle error
            console.log(e);
            return false;
        }
    }

    /**
     * Permanently deletes the user from the database with the given UID.
     *
     * Note: this does not delete the user's account, just their data.
     *
     * @param {string} uid The UID of the user to delete
     * @returns A promise containing true if the user was successfully deleted;
     *      false otherwise
     */
    public async deleteUserData(uid: string): Promise<boolean> {
        // TODO - check to make sure user exists
        try {
            const userDoc = await this.afs.doc<User>(this.USERS_LOC + '/' + uid);
            await userDoc.delete();
            // TODO - delete user's resume and photo
            return true;
        } catch (e) {
            // TODO - handle error
            console.log(e);
            return false;
        }
    }

}

