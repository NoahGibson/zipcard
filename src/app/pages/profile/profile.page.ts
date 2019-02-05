import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Chooser} from '@ionic-native/chooser/ngx';

import {
    AlertService,
    AuthService,
    CurrentUserService,
    LoadingService,
    User
} from '@app/core';

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
    constructor(private authService: AuthService,
                public currentUserService: CurrentUserService,
                private fb: FormBuilder,
                private chooser: Chooser,
                private alertService: AlertService,
                private loadingService: LoadingService) {
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
        if (this._currentUserSubscription) {
            this._currentUserSubscription.unsubscribe();
        }
    }

    /**
     * Subscribes to the current user.
     * @ignore
     */
    private initializeCurrentUser(): void {
        this._currentUserSubscription = this.currentUserService.currentUser$.subscribe((user) => {
            this._currentUser = user;
        });
    }

    /**
     * Initializes the update name form.
     * @ignore
     */
    private initializeNameForm(): void {
        this.updateNameForm = this.fb.group({
            fullName: [this._currentUser.fullName, Validators.compose([Validators.required])]
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
     * Updates the current user's name from the given new value, checking to make sure the
     * given value is not the same as the original.
     *
     * @returns A promise that evaluates after attempting to update the user's name
     */
    public async updateName(): Promise<void> {
        this.updateNameError = null;
        const data = this.updateNameForm.value;
        if (!data.fullName) {
            this.updateNameError = 'Name is required';
            return;
        }
        if (data.fullName === this._currentUser.fullName) {
            this.updateNameError = 'The provided name is the same';
            return;
        }
        try {
            await this.loadingService.displayLoading('Updating name...');
            await this.currentUserService.updateName(data.fullName);
            await this.loadingService.dismissLoading();
            await this.alertService.presentOkAlert(
                '',
                '',
                'Successfully updated name.'
            );
        } catch (e) {
            await this.loadingService.dismissLoading();
            this.updateNameError = e.message;
        }
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
            this.updateEmailError = 'The provided email is the same';
            return;
        }
        const credentials = {
            email: this._currentUser.email,
            password: data.password
        };
        try {
            await this.loadingService.displayLoading('Updating email...');
            await this.currentUserService.updateEmail(credentials, data.email);
            await this.loadingService.dismissLoading();
            await this.alertService.presentOkAlert(
                '',
                '',
                'Successfully updated email.'
            );
            // TODO - reset form to have an empty password field
        } catch (e) {
            await this.loadingService.dismissLoading();
            this.updateEmailError = e.message;
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
        try {
            await this.loadingService.displayLoading('Updating password...');
            await this.currentUserService.updatePassword(credentials, data.newPassword);
            await this.loadingService.dismissLoading();
            await this.alertService.presentOkAlert(
                '',
                '',
                'Successfully updated password.'
            );
            // TODO - reset form to have all blank fields
        } catch (e) {
            await this.loadingService.dismissLoading();
            this.resetPasswordError = e.message;
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
        try {
            await this.authService.deleteAccount(credentials);
            await this.alertService.presentOkAlert(
                '',
                '',
                'Successfully deleted account.'
            );
        } catch (e) {
            this.deleteAccountError = e.message;
        }
    }

    /**
     * Prompts the user to select their profile photo, and then
     * updates their photo to the selected photo.
     * @ignore
     */
    private async choosePhoto(): Promise<void> {
        try {
            const file = await this.chooser.getFile('image/jpeg');
            await this.loadingService.displayLoading('Updating photo...');
            await this.currentUserService.updatePhoto(file.data);
            await this.loadingService.dismissLoading();
            await this.alertService.presentOkAlert(
                '',
                '',
                'Successfully updated photo. It may take a few seconds for your displayed photo to reflect these changes.'
            );
        } catch (e) {
            await this.loadingService.dismissLoading();
            throw new Error(e.message);
        }
    }

    /**
     * Prompts the user to select their resume, and then
     * updates their resume to the selected resume.
     * @ignore
     */
    private async chooseResume(): Promise<void> {
        try {
            const file = await this.chooser.getFile('application/pdf');
            await this.loadingService.displayLoading('Updating resume...');
            await this.currentUserService.updateResume(file.data);
            await this.loadingService.dismissLoading();
            await this.alertService.presentOkAlert(
                '',
                '',
                'Successfully updated resume. It may take a few seconds for your displayed resume to reflect these changes.'
            );
        } catch (e) {
            await this.loadingService.dismissLoading();
            throw new Error(e.message);
        }
    }

}
