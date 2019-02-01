import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {AngularFirestore} from '@angular/fire/firestore';

import {User} from '@app/core/models';

/**
 * Service for retrieving user information.
 */
@Injectable({
    providedIn: 'root'
})
export class UserService {

    /**
     * The path to the users collection in Firebase database.
     * @ignore
     */
    private readonly USERS_COLLECTION = 'users';

    /**
     * @ignore
     */
    constructor(private afs: AngularFirestore) {}

    /**
     * Returns an observable of the data for the application user
     * with the given UID. (See {@link User} for more details of the
     * data that is returned).
     *
     * @param {string} uid The UID of the user to fetch the data of
     * @returns A promise containing an observable of the user's data
     */
    public async getUser(uid: string): Promise<Observable<User>> {
        try {
            const userDoc = await this.afs.doc<User>(this.USERS_COLLECTION + '/' + uid);
            return userDoc.valueChanges();
        } catch (e) {
            throw new Error('An error occurred while trying to fetch the user with UID: ' + uid);
        }
    }

}
