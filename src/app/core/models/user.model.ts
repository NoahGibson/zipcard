/*
    Model for a user of the app, containing their unique identifier,
    name, and locations of their photo and resume.
 */
export class User {
    uid: string;
    firstName: string;
    lastName: string;
    email: string;
    photoUrl: string;
    resumeUrl: string;
}
