/**
 * Model for a user's data, i.e. what is stored in the database.
 */
export class UserData {

    /**
     * The user's UID.
     */
    uid: string;

    /**
     * The user's first name.
     */
    firstName: string;

    /**
     * The user's last name.
     */
    lastName: string;

    /**
     * The user's email address.
     */
    email: string;

    /**
     * The URL to the user's profile photo within Firebase's storage.
     */
    photoUrl: string;

    /**
     * The URL to the user's resume within Firebase's storage.
     */
    resumeUrl: string;

}
