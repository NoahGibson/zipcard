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

    updateNameForm: FormGroup;
    updateNameError: string;

    updateEmailForm: FormGroup;
    updateEmailError: string;

    private _currentUser: User;
    private _currentUserSubscription: Subscription;

    constructor(public authService: AuthService,
                private fb: FormBuilder) {
        this._currentUserSubscription = this.authService.currentUser$.subscribe((user) => {
            this._currentUser = user;
        });

        this.updateNameForm = fb.group({
            firstName: [this._currentUser.firstName, Validators.compose([Validators.required])],
            lastName: [this._currentUser.lastName, Validators.compose([Validators.required])]
        });
        this.updateEmailForm = fb.group({
            email: [this._currentUser.email, Validators.compose([Validators.required, Validators.email])]
        });

    }

    private ionViewWillLeave() {
        this._currentUserSubscription.unsubscribe();
    }


    public async updateName(): Promise<void> {
        const data = this.updateNameForm.value;
        if (!data.firstName || !data.lastName) {
            return;
        }
        if (data.firstName !== this._currentUser.firstName || data.lastName !== this._currentUser.lastName) {
            this.updateNameError = await this.authService.updateName(data.firstName, data.lastName);
        }
    }

    public async updateEmail(): Promise<void> {
        const data = this.updateEmailForm.value;
        if (!data.email) {
            return;
        }
        if (data.email !== this._currentUser.email) {
            this.updateEmailError = await this.authService.updateEmail(data.email);
        }
    }
}
