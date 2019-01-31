/**
 * Class representing login credentials.
 */
export class Credentials {

    /**
     * The email of the user.
     */
    public email: string;

    /**
     * The password of the user.
     */
    public password: string;

    /**
     * Creates a new Credentials object with the specified values.
     */
    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }

}
