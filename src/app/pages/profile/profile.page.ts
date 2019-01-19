import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';

import {AuthService, User, UserService} from '@app/core';

/**
 * A user's profile page, where they can edit their information.
 */
@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss']
})
export class ProfilePage {

    /**
     * Form group for updating the user's name.
     */
    updateNameForm: FormGroup;

    /**
     * Error message, if any, for updating the user's name.
     */
    updateNameError: string;

    /**
     * Form group for updating the user's email.
     */
    updateEmailForm: FormGroup;

    /**
     * Error message, if any, for updating the user's email.
     */
    updateEmailError: string;

    /**
     * The currently authenticated user.
     * @ignore
     */
    private _currentUser: User;

    /**
     * The subscription to the currently authenticated user.
     * @ignore
     */
    private _currentUserSubscription: Subscription;

    /**
     * @ignore
     */
    constructor(public authService: AuthService,
                private fb: FormBuilder) {
        this.initializeCurrentUser();
        this.initializeNameForm();
        this.initializeEmailForm();
    }

    /**
     * Ionic lifecycle hook that executes before destroying the page, used here to
     * unsubscribe from the current user.
     * @ignore
     */
    private ionViewWillLeave(): void {
        this._currentUserSubscription.unsubscribe();
    }

    /**
     * Subscribes to the current user.
     * @ignore
     */
    private initializeCurrentUser(): void {
        this._currentUserSubscription = this.authService.currentUser$.subscribe((user) => {
            this._currentUser = user;
        });
    }

    /**
     * Initializes the update name form.
     * @ignore
     */
    private initializeNameForm(): void {
        this.updateNameForm = this.fb.group({
            firstName: [this._currentUser.firstName, Validators.compose([Validators.required])],
            lastName: [this._currentUser.lastName, Validators.compose([Validators.required])]
        });
    }

    /**
     * Initializes the update email form.
     * @ignore
     */
    private initializeEmailForm(): void {
        this.updateEmailForm = this.fb.group({
            email: [this._currentUser.email, Validators.compose([Validators.required, Validators.email])],
            password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
        });
    }

    /**
     * Updates the current user's name from the given new values, checking to make sure the
     * given values are not the same as the original.
     *
     * @returns A promise that evaluates after attempting to update the user's name
     */
    public async updateName(): Promise<void> {
        this.updateNameError = null;
        const data = this.updateNameForm.value;
        if (!data.firstName || !data.lastName) {
            this.updateNameError = 'First and Last Name are required';
            return;
        }
        if (data.firstName === this._currentUser.firstName && data.lastName === this._currentUser.lastName) {
            this.updateNameError = 'First and Last Name are the same';
            return;
        }
        this.updateNameError = await this.authService.updateName(data.firstName, data.lastName);
    }

    /**
     * Updates the current user's email address from the new given value, checking the entered
     * password for safety.
     *
     * @returns A promise that evaluates after attempting to update the user's email
     */
    public async updateEmail(): Promise<void> {
        this.updateEmailError = null;
        const data = this.updateEmailForm.value;
        if (!data.email) {
            this.updateEmailError = 'Email is required';
            return;
        }
        if (data.email === this._currentUser.email) {
            this.updateEmailError = 'Email is the same';
            return;
        }
        const credentials = {
            email: this._currentUser.email,
            password: data.password
        };
        this.updateEmailError = await this.authService.signInWithEmail(credentials);
        if (!this.updateEmailError && data.email !== this._currentUser.email) {
            this.updateEmailError = await this.authService.updateEmail(data.email);
            // TODO - reset form to have an empty password field
        }
    }
}
