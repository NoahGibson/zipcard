import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {AngularFirestore} from '@angular/fire/firestore';

import {UserData} from '@app/core/models';

/**
 * Service providing various methods for accessing and manipulating user data.
 * Avoid using this service; instead user {@link UserService}.
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
     * Retrieves a {@link UserData} from the database with the given UID,
     * if they exist. Throws an error if unable to fetch data.
     *
     * @param {string} uid The UID of the user to retrieve the data of
     * @returns An observable of the user's data
     */
    public async getUserData(uid: string): Promise<Observable<UserData>> {
        try {
            const userDoc = await this.afs.doc<UserData>(this.USERS_LOC + '/' + uid);
            return userDoc.valueChanges();
        } catch (e) {
            throw new Error('An error occurred while trying to fetch the user data');
        }
    }

    /**
     * Creates a new user in the database from the given {@link UserData}. The
     * UID, first name, and last name of the given user must be set.
     *
     * @param {UserData} userData The user to add to the database
     * @returns A promise that evaluates after attempting to create the user data
     */
    public async createUserData(userData: UserData): Promise<void> {
        if (!userData.uid || !userData.firstName || !userData.lastName) {
            throw new Error('Missing required user attribute(s)');
        }
        // TODO - check to make sure current user doesn't already exist
        try {
            const userDoc = await this.afs.doc<UserData>(this.USERS_LOC + '/' + userData.uid);
            await userDoc.set(userData);
        } catch (e) {
            throw new Error('An error occurred while trying to create the user data');
        }
    }

    /**
     * Updates the {@link UserData} with the given UID with the provided new attributes.
     * If an attribute is not specified, it will remain the same. First name and
     * last name must not be empty if they are provided. The UID of a
     * user cannot be changed.
     *
     * Note: an authenticated user can only update their own information.
     *
     * @param {string} uid The UID of the user to update
     * @param {Partial<UserData>} update The new attributes of the user
     * @returns A promise that evaluates after attempting to update the user data
     */
    public async updateUserData(uid: string, update: Partial<UserData>): Promise<void> {
        if (update.uid) {
            throw new Error('Cannot update the UID of a user');
        }
        if (update.firstName && update.firstName.length === 0) {
            throw new Error('First name must be non empty');
        }
        if (update.lastName && update.lastName.length === 0) {
            throw new Error('Last name must be non empty');
        }
        // TODO - check to make sure user exists
        try {
            const userDoc = await this.afs.doc<UserData>(this.USERS_LOC + '/' + uid);
            await userDoc.update(update);
        } catch (e) {
            throw new Error('An error occurred while trying to update the user data');
        }
    }

    /**
     * Permanently deletes the user from the database with the given UID.
     *
     * Note: this does not delete the user's account, photo, or resume, just
     * their data within the database.
     *
     * @param {string} uid The UID of the user to delete
     * @returns A promise that evaluates after attempting to delete the user data
     */
    public async deleteUserData(uid: string): Promise<void> {
        // TODO - check to make sure user exists
        try {
            const userDoc = await this.afs.doc<UserData>(this.USERS_LOC + '/' + uid);
            await userDoc.delete();
        } catch (e) {
            throw new Error('An error occurred while trying to delete the user data');
        }
    }

}

