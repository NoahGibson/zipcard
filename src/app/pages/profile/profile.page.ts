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
     * Form group for resetting the user's password.
     */
    resetPasswordForm: FormGroup;

    /**
     * Error message, if any, for resetting the user's password.
     */
    resetPasswordError: string;

    /**
     * Form group for deleting the user's account.
     */
    deleteAccountForm: FormGroup;

    /**
     * Error message, if any, for deleting the user's account.
     */
    deleteAccountError: string;

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
        this.initializePasswordForm();
        this.initializeDeleteForm();
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
     * Initializes the reset password form.
     * @ignore
     */
    private initializePasswordForm(): void {
        this.resetPasswordForm = this.fb.group({
            currentPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
            newPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
            confirmNewPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
        });
    }

    /**
     * Initializes the delete account form.
     * @ignore
     */
    private initializeDeleteForm(): void {
        this.deleteAccountForm = this.fb.group({
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

    /**
     * Resets the current user's password to the new value, checking the user's
     * current password for safety.
     *
     * @returns A promise that evaluates after attempting to reset the user's password
     */
    public async resetPassword(): Promise<void> {
        this.resetPasswordError = null;
        const data = this.resetPasswordForm.value;
        if (!data.currentPassword || !data.newPassword || !data.confirmNewPassword) {
            this.resetPasswordError = 'Missing required field';
            return;
        }
        if (data.newPassword !== data.confirmNewPassword) {
            this.resetPasswordError = 'New passwords do not match';
            return;
        }
        if (data.currentPassword === data.newPassword) {
            this.resetPasswordError = 'New password cannot match the old password';
            return;
        }
        const credentials = {
            email: this._currentUser.email,
            password: data.currentPassword
        };
        this.resetPasswordError = await this.authService.signInWithEmail(credentials);
        if (!this.resetPasswordError) {
            this.resetPasswordError = await this.authService.updatePassword(data.newPassword);
            // TODO - reset form to have all blank fields
        }
    }

    /**
     * Permanently deletes the current user's account.
     *
     * @returns A promise that evaluates after attempting to delete the user's account
     */
    public async deleteAccount(): Promise<void> {
        this.deleteAccountError = null;
        const data = this.deleteAccountForm.value;
        if (!data.password) {
            this.deleteAccountError = 'Password is required';
            return;
        }
        const credentials = {
            email: this._currentUser.email,
            password: data.password
        };
        this.deleteAccountError = await this.authService.signInWithEmail(credentials);
        if (!this.deleteAccountError) {
            this.deleteAccountError = await this.authService.deleteAccount();
        }
    }

}
